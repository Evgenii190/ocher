import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import "../_app/globals.css";
import localFont from "next/font/local";
import { routing } from "@/i18n/routing";
import { CartProvider } from "@/shared/cart/cart-context";
import { PageBackground } from "@/shared/components/page-background";
import { cn } from "@/shared/lib/utils";
import Footer from "@/widgets/footer/root";
import Header from "@/widgets/header/root";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

const ttLakes = localFont({
  src: [
    {
      path: "../../shared/fonts/tt-lakes/semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../shared/fonts/tt-lakes/bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-tt-lakes",
  display: "swap",
});

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("site.title"),
    description: t("site.description"),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={cn("antialiased", inter.variable, ttLakes.variable)}
    >
      <body>
        <NextIntlClientProvider messages={messages}>
          <CartProvider>
            <PageBackground>
              <Header />
              {children}
              <Footer />
            </PageBackground>
          </CartProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
