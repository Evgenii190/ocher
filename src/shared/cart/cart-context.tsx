"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const STORAGE_KEY = "cart:v2";
const LEGACY_STORAGE_KEY = "cart:v1";

export type CartItemSpec = {
  label: string;
  value: string;
};

type CartStoredItem = {
  id: string;
  slug: string;
  quantity: number;
};

export type CartItem = {
  id: string;
  slug: string;
  title: string;
  availability: "inStock" | "onOrder";
  price: number | null;
  discountPercent: number;
  image: string | null;
  specs: CartItemSpec[];
  quantity: number;
};

export type CartItemInput = Pick<CartItem, "id" | "slug">;

export type CartTotals = {
  subtotal: number;
  discountTotal: number;
  total: number;
  hasOnRequest: boolean;
};

type CartContextValue = {
  items: CartItem[];
  isLoading: boolean;
  totalCount: number;
  totals: CartTotals;
  addItem: (item: CartItemInput, quantity?: number) => void;
  getQuantity: (id: string) => number;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  removeItem: (id: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

type CartProductsResponse = {
  products?: Omit<CartItem, "quantity">[];
};

function normalizeStorageItem(value: unknown): CartStoredItem | null {
  if (typeof value !== "object" || value === null) {
    return null;
  }

  const item = value as Partial<CartStoredItem>;
  if (typeof item.id !== "string" || item.id.length === 0) {
    return null;
  }

  return {
    id: item.id,
    slug:
      typeof item.slug === "string" && item.slug.length > 0
        ? item.slug
        : item.id,
    quantity: Math.max(1, Math.floor(Number(item.quantity) || 1)),
  };
}

function parseStoredItems(raw: string | null): CartStoredItem[] | null {
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.flatMap((item) => {
      const normalized = normalizeStorageItem(item);
      return normalized ? [normalized] : [];
    });
  } catch {
    return [];
  }
}

function readStorage(): CartStoredItem[] {
  try {
    return (
      parseStoredItems(localStorage.getItem(STORAGE_KEY)) ??
      parseStoredItems(localStorage.getItem(LEGACY_STORAGE_KEY)) ??
      []
    );
  } catch {
    return [];
  }
}

function discounted(price: number, discountPercent: number): number {
  if (discountPercent <= 0) {
    return price;
  }
  return Math.round(price * (1 - discountPercent / 100));
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [storedItems, setStoredItems] = useState<CartStoredItem[]>([]);
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setStoredItems(readStorage());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(storedItems));
      localStorage.removeItem(LEGACY_STORAGE_KEY);
    } catch {
      // localStorage недоступен (приватный режим / квота) — игнорируем
    }
  }, [storedItems, hydrated]);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    if (storedItems.length === 0) {
      setItems([]);
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();
    setIsLoading(true);

    async function loadProducts() {
      try {
        const response = await fetch("/api/cart-products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: storedItems.map(({ id, slug }) => ({ id, slug })),
          }),
          signal: controller.signal,
        });
        const data = (await response.json()) as CartProductsResponse;
        const productById = new Map(
          (data.products ?? []).map((product) => [product.id, product]),
        );

        if (!controller.signal.aborted) {
          setItems(
            storedItems.flatMap((entry) => {
              const product = productById.get(entry.id);
              return product ? [{ ...product, quantity: entry.quantity }] : [];
            }),
          );
        }
      } catch {
        if (!controller.signal.aborted) {
          setItems([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    void loadProducts();

    return () => controller.abort();
  }, [storedItems, hydrated]);

  const addItem = useCallback((item: CartItemInput, quantity = 1) => {
    setStoredItems((current) => {
      const existing = current.find((entry) => entry.id === item.id);
      if (existing) {
        return current.map((entry) =>
          entry.id === item.id
            ? { ...entry, quantity: entry.quantity + quantity }
            : entry,
        );
      }
      return [...current, { ...item, quantity }];
    });
  }, []);

  const increment = useCallback((id: string) => {
    setStoredItems((current) =>
      current.map((entry) =>
        entry.id === id ? { ...entry, quantity: entry.quantity + 1 } : entry,
      ),
    );
  }, []);

  const decrement = useCallback((id: string) => {
    setStoredItems((current) =>
      current.flatMap((entry) => {
        if (entry.id !== id) {
          return [entry];
        }
        if (entry.quantity <= 1) {
          return [];
        }
        return [{ ...entry, quantity: entry.quantity - 1 }];
      }),
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setStoredItems((current) => current.filter((entry) => entry.id !== id));
  }, []);

  const clear = useCallback(() => {
    setStoredItems([]);
  }, []);

  const totalCount = useMemo(
    () => storedItems.reduce((sum, entry) => sum + entry.quantity, 0),
    [storedItems],
  );

  const getQuantity = useCallback(
    (id: string) => storedItems.find((entry) => entry.id === id)?.quantity ?? 0,
    [storedItems],
  );

  const totals = useMemo<CartTotals>(() => {
    let subtotal = 0;
    let total = 0;
    let hasOnRequest = false;

    for (const entry of items) {
      if (entry.price === null) {
        hasOnRequest = true;
        continue;
      }
      subtotal += entry.price * entry.quantity;
      total += discounted(entry.price, entry.discountPercent) * entry.quantity;
    }

    return {
      subtotal,
      discountTotal: subtotal - total,
      total,
      hasOnRequest,
    };
  }, [items]);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      isLoading,
      totalCount,
      totals,
      addItem,
      getQuantity,
      increment,
      decrement,
      removeItem,
      clear,
    }),
    [
      items,
      isLoading,
      totalCount,
      totals,
      addItem,
      getQuantity,
      increment,
      decrement,
      removeItem,
      clear,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart должен использоваться внутри CartProvider");
  }
  return context;
}
