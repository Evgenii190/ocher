import type { CollectionConfig } from "payload";

export const Orders: CollectionConfig = {
  slug: "orders",
  labels: {
    singular: "Заказ",
    plural: "Заказы",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "phone", "total", "status", "createdAt"],
    group: "Магазин",
  },
  access: {
    // Заказ оформляется публично из корзины.
    create: () => true,
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "Имя",
      required: true,
    },
    {
      name: "phone",
      type: "text",
      label: "Телефон",
      required: true,
    },
    {
      name: "address",
      type: "text",
      label: "Адрес",
    },
    {
      name: "comment",
      type: "textarea",
      label: "Комментарий",
    },
    {
      name: "paymentMethod",
      type: "select",
      label: "Способ оплаты",
      required: true,
      options: [
        { label: "Банковской картой в офисе", value: "cardOffice" },
        { label: "Наличными в магазине", value: "cashStore" },
      ],
    },
    {
      name: "status",
      type: "select",
      label: "Статус",
      defaultValue: "new",
      admin: {
        position: "sidebar",
      },
      options: [
        { label: "Новый", value: "new" },
        { label: "В обработке", value: "processing" },
        { label: "Выполнен", value: "done" },
        { label: "Отменён", value: "cancelled" },
      ],
    },
    {
      name: "items",
      type: "array",
      label: "Состав заказа",
      fields: [
        { name: "productId", type: "text", label: "ID товара" },
        { name: "title", type: "text", label: "Название", required: true },
        { name: "price", type: "number", label: "Цена, ₽" },
        {
          name: "discountPercent",
          type: "number",
          label: "Скидка, %",
          defaultValue: 0,
        },
        {
          name: "quantity",
          type: "number",
          label: "Количество",
          required: true,
          defaultValue: 1,
        },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "subtotal", type: "number", label: "Сумма без скидки, ₽" },
        { name: "discountTotal", type: "number", label: "Скидка, ₽" },
        { name: "total", type: "number", label: "Итого, ₽" },
      ],
    },
  ],
};
