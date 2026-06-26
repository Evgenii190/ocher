import type { GlobalConfig } from "payload";
import { localizedArrayText, localizedText } from "@/collections/fields/localized";
import { requestEducationDisclosureRevalidation } from "@/shared/lib/request-education-disclosure-revalidation";

export const EducationDisclosure: GlobalConfig = {
  slug: "education-disclosure",
  label: "Сведения об образовательной организации",
  admin: {
    group: "Страницы",
  },
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  hooks: {
    afterChange: [
      () => {
        void requestEducationDisclosureRevalidation();
      },
    ],
  },
  fields: [
    localizedText({
      name: "pageTitle",
      label: "Заголовок страницы",
      defaultValue: "Сведения об образовательной организации",
      required: true,
    }),
    {
      name: "entries",
      type: "array",
      label: "Таблица",
      labels: {
        singular: "Элемент",
        plural: "Элементы таблицы",
      },
      admin: {
        description:
          "Секции и строки таблицы. Для типа «Ссылка» и «Кнопки» красное оформление и скачивание появляются только при прикреплённом файле.",
        initCollapsed: true,
      },
      fields: [
        {
          name: "kind",
          type: "select",
          label: "Тип",
          required: true,
          defaultValue: "row",
          options: [
            { label: "Секция", value: "section" },
            { label: "Строка", value: "row" },
          ],
        },
        localizedArrayText({
          name: "sectionTitle",
          label: "Заголовок секции",
          admin: {
            condition: (_, siblingData) => siblingData?.kind === "section",
          },
        }),
        {
          name: "titleStyle",
          type: "select",
          label: "Стиль заголовка секции",
          defaultValue: "default",
          options: [
            { label: "Обычный", value: "default" },
            { label: "Компактный", value: "compact" },
          ],
          admin: {
            condition: (_, siblingData) => siblingData?.kind === "section",
          },
        },
        localizedArrayText({
          name: "code",
          label: "Код",
          admin: {
            condition: (_, siblingData) => siblingData?.kind === "row",
          },
        }),
        localizedArrayText({
          name: "name",
          label: "Наименование",
          admin: {
            condition: (_, siblingData) => siblingData?.kind === "row",
          },
        }),
        {
          name: "infoType",
          type: "select",
          label: "Формат информации",
          defaultValue: "text",
          options: [
            { label: "Текст", value: "text" },
            { label: "Текст / ссылка на файл", value: "link" },
            { label: "Кнопки документов", value: "buttons" },
          ],
          admin: {
            condition: (_, siblingData) => siblingData?.kind === "row",
          },
        },
        {
          name: "lines",
          type: "array",
          label: "Строки информации",
          labels: {
            singular: "Строка",
            plural: "Строки",
          },
          admin: {
            condition: (_, siblingData) =>
              siblingData?.kind === "row" &&
              (siblingData?.infoType === "text" ||
                siblingData?.infoType === "link"),
          },
          fields: [
            localizedArrayText({
              name: "text",
              required: true,
            }),
          ],
        },
        {
          name: "file",
          type: "upload",
          relationTo: "documents",
          label: "Файл",
          admin: {
            condition: (_, siblingData) =>
              siblingData?.kind === "row" && siblingData?.infoType === "link",
            description:
              "Если файл прикреплён, текст отображается красной ссылкой со скачиванием.",
          },
        },
        {
          name: "buttons",
          type: "array",
          label: "Элементы",
          labels: {
            singular: "Элемент",
            plural: "Элементы",
          },
          admin: {
            condition: (_, siblingData) =>
              siblingData?.kind === "row" &&
              siblingData?.infoType === "buttons",
            description:
              "Без файла элемент показывается обычным текстом. С файлом — кнопкой для скачивания.",
          },
          fields: [
            localizedArrayText({
              name: "label",
              label: "Подпись",
              required: true,
            }),
            {
              name: "variant",
              type: "select",
              label: "Стиль кнопки",
              defaultValue: "outline",
              options: [
                { label: "Заливка", value: "filled" },
                { label: "Обводка", value: "outline" },
              ],
            },
            {
              name: "file",
              type: "upload",
              relationTo: "documents",
              label: "Файл",
            },
          ],
        },
      ],
    },
  ],
};
