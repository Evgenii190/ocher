import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { zhEnMap } from "./zh-en-map.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const messagesDir = join(__dirname, "..", "messages");

const staticCategories = {
  oilfield: {
    title: "Нефтепромысловое оборудование",
    subcategories: {
      "pump-rods": "Штанги насосные",
      "polished-rods": "Штоки полированные",
      "rod-couplings": "Муфты штанг насосных и штоков полированных",
      centralizers: "Центраторы",
      "rod-rotators": "Штанговращатели ШВР",
      "wellhead-seals": "Сальники устьевые",
      "polished-rod-clamps": "Зажимы полированных штоков",
      "auto-couplers": "Автосцепы",
      "hinged-pump-rods": "Штанги насосные шарнирные",
      "tubing-couplings": "Муфты для насосно-компрессорных труб",
      "cable-protectors": "Кожухи защиты кабеля (протекторы)",
    },
  },
  metalwork: {
    title: "Металлоконструкции",
    subcategories: {
      piles: "Сваи",
      "building-structures": "Металлоконструкции зданий и сооружений",
      "foundation-structures":
        "Металлоконструкции ростверков, балок, фундаментов",
      tanks: "Емкости и резервуары",
      "pipeline-supports": "Опоры трубопровода",
      "road-supports": "Опоры для строительства и реконструкции автодорог",
      "sewer-wells": "Колодцы канализационные различного назначения",
      "cooling-towers": "Градирни",
    },
  },
  construction: {
    title: "Строительные конструкции",
    subcategories: {
      "wedge-lock": "Замок клиновой",
      "tie-screw": "Винт стяжной для опалубки",
      "end-anchor": "Анкер торцевой",
      "three-wing-nut": "Гайка стяжная трёхрожковая",
      univilka: "Унивилка",
      "two-level-brace": "Подкос двухуровневый",
      "rack-lock": "Замок реечный выравнивающий",
      "corner-panel": "Щит угловой распалубочный",
      "zero-corner": "Угол нулевой",
      "mounting-grip": "Захват монтажный",
      "leveling-beam": "Балка выравнивающая",
      tripod: "Тренога",
      prop: "Стойка",
      "scaffold-pn6": "Подмости ПН-6",
    },
  },
  calibrated: {
    title: "Калиброванный прокат",
    subcategories: {
      "round-calibrated": "Круглый калиброванный прокат",
    },
  },
};

const ru = {
  common: {
    home: "Главная",
    logoAlt: "Логотип",
    omzAlt: "ОМЗ",
    readMore: "Подробнее",
    readMoreAboutWorkshop: "Подробнее о цехе",
    goToCatalog: "Перейти в каталог",
    call: "Позвонить",
    all: "все",
    loading: "Загрузка…",
    showMore: "Показать ещё",
    download: "Скачать",
    clear: "Очистить",
    from: "от",
    to: "до",
    parameter: "Параметр",
    document: "Документ",
    noImage: "Нет изображения",
    factoryAlt: "Фабрика",
    videoProductionAlt: "Видео о производстве",
    aria: {
      breadcrumbs: "Хлебные крошки",
      mainNav: "Основная навигация",
      call: "Позвонить",
      writeEmail: "Написать на почту",
      search: "Искать",
      close: "Закрыть",
      openMenu: "Открыть меню",
      closeMenu: "Закрыть меню",
      prevSlide: "Предыдущий слайд",
      nextSlide: "Следующий слайд",
      slideNav: "Навигация по слайдам",
      prevPhoto: "Предыдущее фото",
      nextPhoto: "Следующее фото",
      photoN: "Фото {n}",
      removeFromCart: "Удалить из корзины",
      decreaseQty: "Уменьшить количество",
      increaseQty: "Увеличить количество",
      attachResume: "Прикрепить резюме",
      removeFile: "Удалить файл",
    },
    plural: {
      product:
        "{count, plural, one {# товар} few {# товара} many {# товаров} other {# товаров}}",
      productInCart:
        "{count, plural, one {# товар} few {# товара} many {# товаров} other {# товаров}} в корзине",
    },
    units: { mm: "мм", cm: "см", m: "м", kg: "кг", t: "т" },
    availability: { inStock: "В наличии", onOrder: "Под заказ" },
    availabilityLabel: "Наличие",
    article: "Артикул:",
    priceOnRequest: "Цена по запросу",
    priceOnRequestUpper: "ЦЕНА ПО ЗАПРОСУ",
    cost: "Стоимость",
    addToCart: "В корзину",
    workingHoursShort: "г. Пермь · Пн–Пт 9:00–18:00",
  },
  nav: {
    company: { label: "Компания", ariaLabel: "Раздел «Компания»" },
    products: { label: "Продукция", ariaLabel: "Раздел «Продукция»" },
    production: { label: "Производство", ariaLabel: "Раздел «Производство»" },
    services: { label: "Услуги", ariaLabel: "Раздел «Услуги»" },
    news: "Новости",
    contacts: "Контакты",
    catalogParts: "Каталог комплектующих",
    goToCatalog: "Перейти в каталог",
    companySections: {
      about: { title: "О компании", href: "/about" },
      history: "История",
      certificates: "Сертификаты",
      partners: "Партнерам",
      vacancies: "Вакансии",
      procurement: {
        title: "Закупки",
        href: "/procurement",
      },
      safetyHotline: "Горячая линия безопасности",
      education: "Сведения об образовательной организации",
      laborProtection: "Охрана труда",
    },
    productionLinks: {
      oilfield: "Цех нефтепромыслового оборудования",
      metal: "Цех металлоконструкций",
      building: "Цех строительных конструкций",
    },
    servicesLinks: {
      pumpRodsRepair: "Ремонт насосных штанг",
      laserCutting: "Лазерная резка металла",
      calibratedRound: "Производство круга калиброванного",
      laboratoryTesting: "Лабораторные испытания",
      designDocumentation: "Разработка конструктивной документации",
      delivery: "Доставка",
    },
    megaMenu: {
      company: "Компания",
      production: "Производство",
      services: "Услуги",
    },
    mobileMenu: {
      title: "Меню навигации",
      searchTitle: "Поиск оборудования",
      searchSubtitle: "Найти продукцию и услуги",
      cart: "Корзина",
      cartEmpty: "Пока пусто",
      cartItems: "Товаров: {count}",
      cartAria: "Корзина, товаров: {count}",
      cartAriaEmpty: "Корзина",
      languageTitle: "Язык сайта",
    },
    cartAria: "Корзина, товаров: {count}",
    cartAriaEmpty: "Корзина",
  },
  footer: {
    site: "Сайт",
    catalog: "Каталог товаров",
    contacts: "Контакты",
    email: "Почта",
    emailHint: "Пишите письма, скидывайте свои проекты рады будем ответить вам",
    workingHours: "Часы работы",
    social: "Пишите нам в соц сетях",
    commercial: "Для коммерческих предложеиний",
    copyright: "Все права защищены © 2025. при копировании обязательна ссылка на сайт Ocher.ru",
    privacy: "Политика конфиденциальности",
    terms: "Пользовательское соглашение",
    links: {
      about: "О компании",
      certificates: "Сертификаты",
      history: "История",
      partners: "Партнеры",
      procurement: "Закупки",
      vacancies: "Вакансии",
      elevator: "Опалубка лифтовых шахт",
      wall: "Опалубка стеновая",
      floor: "Опалубка перекрытий",
      clamps: "Хомуты",
      screw: "Винт стяжной",
      parts: "Комплектующие к опалубке",
    },
    socialLabels: {
      telegram: "Telegram",
      whatsapp: "WhatsApp",
      gmail: "Gmail",
    },
  },
  search: {
    placeholder: "Поиск",
    placeholderExtended: "Поиск оборудования, услуг...",
    placeholderEquipment: "Поиск оборудования",
    title: "Поиск по сайту",
    description: "Введите запрос для поиска по сайту",
    hints: {
      startTyping: "Начните вводить в поле выше, чтобы увидеть варианты",
      popular: "Часто ищут",
      sections: "Разделы сайта",
    },
    popularQueries: {
      wallFormwork: "Опалубка стеновая",
      clamps: "Хомуты",
      tieScrew: "Винт стяжной",
      parts: "Комплектующие",
    },
    siteSections: {
      catalog: "Каталог продукции",
      certificates: "Сертификаты",
      history: "История компании",
      vacancies: "Вакансии",
    },
  },
  home: {
    hero: {
      bgAlt: "Главное фоновое изображение",
      titleMobileLine1: "Очёрский",
      titleMobileLine2: "машино-",
      titleMobileLine3: "строительный",
      titleDesktop: "машиностроительный",
      titleSuffix: "завод",
      tagline: "Строим будущее, сохраняя традиции",
    },
    about: {
      title: "О заводе",
    },
    factoryFacts: {
      title: "ОМЗ в цифрах и фактах",
      prev: "Предыдущий факт",
      next: "Следующий факт",
      items: {
        area: {
          title: "45 000 КВ.М.",
          description: "Суммарная площадь производственных цехов",
        },
        staff: {
          title: "> 800 ЧЕЛ.",
          description: "Штат сотрудников предприятия",
        },
        countries: {
          title: "8 СТРАН",
          description: "География поставок продукции",
        },
        directions: {
          title: "4 НАПРАВЛЕНИЯ",
          description: "Ключевые производственные направления",
        },
      },
    },
    factorySlider: {
      prev: "Предыдущий цех",
      next: "Следующий цех",
      nav: "Навигация по цехам",
      workshops: {
        oilfield: {
          title: "Цех нефтепромыслового оборудования",
          alt: "Цех нефтепромыслового оборудования",
        },
        metal: {
          title: "Цех металлоконструкций",
          alt: "Цех металлоконструкций",
        },
        building: {
          title: "Цех строительных конструкций",
          alt: "Цех строительных конструкций",
        },
      },
    },
    catalog: {
      titleLine1: "каталог",
      titleLine2: "продукции",
      scrollBack: "Прокрутить категории назад",
      scrollForward: "Прокрутить категории вперёд",
      prevSubcategory: "Предыдущая подкатегория",
      nextSubcategory: "Следующая подкатегория",
    },
    partners: {
      title: "наши партнёры",
      prev: "Предыдущий партнёр",
      next: "Следующий партнёр",
    },
    pressCenter: {
      title: "Новости",
      allNews: "все новости",
    },
    deliveryGeography: {
      title: "география поставок",
      mapAria: "Карта стран поставок ОМЗ",
      regionsTitle: "Страны и регионы присутствия ОМЗ",
      countriesPanelAria: "Страны поставок",
      countriesHeading: "СТРАНЫ ПОСТАВОК",
      stats: {
        countries: [
          "СТРАНЫ",
          "ПОСТАВОК",
        ],
        regions: [
          "РЕГИОНЫ",
          "ПРИСУТСТВИЯ",
        ],
        customers: [
          "ПРОМЫШЛЕННЫЕ",
          "ЗАКАЗЧИКИ",
        ],
      },
      description: {
        line1: "ОМЗ поставляет оборудование и комплектующие для промышленных предприятий",
        line2: "в России и за рубежом, обеспечивая стабильные поставки и техническую поддержку.",
      },
      countries: {
        russia: "Россия",
        kazakhstan: "Казахстан",
        belarus: "Беларусь",
        india: "Индия",
        brazil: "Бразилия",
        argentina: "Аргентина",
        venezuela: "Венесуэла",
        usa: "США",
      },
    },
  },
  catalog: {
    title: "Каталог",
    titleFull: "каталог продукции",
    emptySeed: "Каталог пока пуст. Запустите наполнение данными командой npm run seed",
    notFoundSearch: "По вашему запросу ничего не найдено",
    notFoundFilters: "По выбранным фильтрам ничего не найдено",
    allCatalog: "Весь каталог",
    selectCategory: "Выберите категорию",
    selectAll: "Выбрать все",
    deselectAll: "Снять все",
    goTo: "Перейти",
    characteristics: "Характеристики",
    resetFilters: "Сбросить фильтры",
    sort: {
      label: "Сортировка",
      popularity: "По популярности",
      titleAsc: "По алфавиту (А–Я)",
      titleDesc: "По алфавиту (Я–А)",
      priceAsc: "Сначала дешёвые",
      priceDesc: "Сначала дорогие",
    },
    pagination: {
      showMore: "Показать ещё",
      aria: "Пагинация каталога",
      prev: "Предыдущая страница",
      next: "Следующая страница",
    },
    product: {
      tabs: {
        specs: "Характеристики",
        description: "Описание",
        docs: "Документация",
      },
      specsEmpty: "Характеристики не указаны.",
      descriptionEmpty: "Описание товара пока не добавлено.",
      documents: {
        fallback: "Сертификаты и техническая документация доступны в разделе сертификатов или по запросу у менеджера.",
        goToCertificates: "Перейти к сертификатам",
      },
      promo: {
        lifetime: "Пожизненный срок службы",
        lifetimeLink: "на все Комплектующие",
        buyParts: "купите Комплектующие",
        salesOffice: "в офисе продаж",
        questions: "Возникли вопросы ?",
        consult: "проконсультируем",
      },
      goToCatalogAria: "{title} — перейти в каталог",
    },
    categoryCard: {
      goToCatalog: "Перейти в каталог",
    },
  },
  cart: {
    breadcrumb: "Корзина",
    title: "корзина",
    titleOrderCompleted: "заказ оформлен",
    eyebrowCheckout: "оформление заказа",
    eyebrowDone: "готово",
    updating: "Обновляем товары",
    discount: "Сумма скидки",
    total: "Итого:",
    onRequestNote: "Некоторые товары — по запросу. Их стоимость менеджер сообщит при подтверждении заказа.",
    empty: {
      eyebrow: "пока пусто",
      title: "в корзине нет товаров",
      description: "Выберите оборудование в каталоге — добавьте позиции и оформите заказ онлайн или с помощью менеджера",
      perks: {
        warranty: "Гарантия на комплектующие",
        delivery: "Доставка по всей России",
        manager: "Помощь менеджера при заказе",
      },
    },
    checkout: {
      contactTitle: "Введите контактные данные",
      name: "Имя",
      namePlaceholder: "Ваше имя",
      phone: "Телефон",
      phonePlaceholder: "+7 (___) ___-__-__",
      address: "Адрес доставки",
      addressPlaceholder: "Адрес доставки",
      comment: "Комментарий к заказу",
      commentPlaceholder: "Комментарий к заказу",
      paymentTitle: "Выберите способ оплаты",
      payment: {
        cardOffice: "Банковской картой в офисе",
        cashStore: "Наличными в магазине",
      },
      submit: "Оформить заказ",
      submitting: "Оформляем…",
      emptyCart: "Корзина пуста",
    },
    success: {
      eyebrow: "спасибо за заказ",
      title: "заказ оформлен",
      description: "Ваш заказ принят. Менеджер свяжется с вами для подтверждения и уточнения деталей.",
    },
  },
  products: {
    breadcrumb: "Продукция",
    intro: "АО «Очерский машиностроительный завод» специализируется на выпуске оборудования и комплектующих для ключевых отраслей промышленности в сфере нефтепромыслового оборудования и металлоконструкций. Завод обеспечивает доставку продукции по всей России, странам СНГ и дальнему зарубежью, предлагая решения, которые соответствуют международным стандартам качества.",
    outro: "Очерский машиностроительный завод выпускает продукцию по стандартам ГОСТ. Вся продукция проходит многократную проверку качества. Каждое изделие способствует повышению эффективности и безопасности на производственных площадках.",
    sections: {
      oilfield: {
        title: "Нефтепромысловое оборудование",
        lead: "ОМЗ предоставляет комплексные решения в области производства оборудования для добычи нефти:",
        items: [
          "Штанги насосные и муфты: основа для надёжной работы насосного оборудования;",
          "Центраторы и автосцепы: гарантируют правильную сборку и функционирование всех компонентов;",
          "Сальники и штанговращатели: эффективно защищают и управляют движением штанг.",
        ],
      },
      metalwork: {
        title: "Металлоконструкции",
        lead: "Производим металлоконструкции, которые находят применение в самых разнообразных областях:",
        items: [
          "Конструкции для зданий и сооружений: от небольших элементов до крупномасштабных проектов;",
          "Опоры и каркасы для трубопроводов: необходимы для обеспечения безопасности и долговечности инфраструктуры;",
          "Опоры для строительства и реконструкции участков автомобильных дорог;",
          "Ёмкости и резервуары.",
        ],
      },
      formwork: {
        title: "Комплектующие для опалубки",
        lead: "Комплектующие для опалубки, производимые АО «Очерский машиностроительный завод», отвечают высоким стандартам качества и долговечности.",
        items: [
          "Анкеры торцевые и винты стяжные: создают крепкое соединение между элементами опалубки, повышая надёжность всей системы;",
          "Трёхрожковые гайки, клиновые и реечные замки: усиливают сцепление конструкционных компонентов, обеспечивая их стабильность и надёжность во время использования;",
          "Угловые щиты и усиленные унивилки для стоек: увеличивают устойчивость и прочность опалубочных конструкций, способствуя их долгосрочной эксплуатации;",
          "Подкосы двухуровневые и углы распалубочные;",
          "Нулевой угол и балка выравнивающая.",
        ],
      },
    },
  },
  about: {
    breadcrumb: "О компании",
    hero: {
      title: "О КОМПАНИИ ОМЗ",
      tagline: "АО «Очёрский машиностроительный завод» — более двух с половиной веков промышленной истории и современные технологии производства",
      bgAlt: "Фоновое изображение страницы «О компании»",
    },
    intro: {
      imageAlt: "Производственные мощности АО «ОМЗ»",
      leadBefore: "АО «Очёрский машиностроительный завод»",
      leadAfter: " — одно из старейших промышленных предприятий Западного Урала, специализирующийся на внешнеэкономической деятельности торговых, строительных и нефтепромысловых организаций. Развиваем возможности малого, среднего и крупного бизнеса с помощью бесперебойного производства металлоконструкций, нефтепромыслового оборудования и комплектующих.",
      column2: "Специалисты Очёрского машиностроительного завода всегда готовы к изучению и решению задач любой сложности. Внимательно отслеживают инновационные разработки и прогнозируют возможные риски при эксплуатации металлоконструкций и нефтепромыслового оборудования. Создают рациональную, с точки зрения материальных затрат, концепцию на осуществление метрологического надзора за использованием и состоянием оборудования, снижая расходы за счёт информационно-измерительных комплексов, эталонов и автоматизированной техники для проведения испытаний, химических, металлографических и механических анализов продукции и сырья с соблюдение метрологических норм, нормативных документов и правил для обеспечения требуемой точности и единства, с соответствием отраслевым стандартам: ГОСТ, API 11B, ТУ.",
      column3: "Целостный организм, сплотивший тысячи зарубежных и российских специалистов. Команда аналитиков, инженеров, аудиторов, системных администраторов, технологов, механиков, конструкторов, сертифицированных руководителей проектов и юристов, обладающих фундаментальными знаниями в области машиностроения, законодательства, высшей математики, аналитики, физики и инженерного дела.",
    },
    fullCycle: {
      title: "Производственное предприятие полного цикла",
      paragraph: "АО «Очёрский машиностроительный завод» — одно из старейших промышленных предприятий Западного Урала. Завод объединяет собственные производственные мощности, инженерную экспертизу и контроль качества для выпуска продукции, востребованной в нефтегазовой отрасли, строительстве и промышленности.\n\nОМЗ производит оборудование и комплектующие для предприятий, которым важны надёжность, соответствие стандартам, стабильные поставки и возможность изготовления изделий под конкретные технические требования.",
      imageAlt: "Производственная линия цеха нефтепромыслового оборудования",
    },
    capabilities: {
      title: "Производственные возможности",
      subtitle: "Современное оборудование для точного и стабильного производства",
    },
  },
  vacancies: {
    breadcrumb: "Вакансии",
    title: "Актуальные вакансии",
    salary: "зарплата",
    salaryFrom: "от",
    apply: "откликнуться",
    noCategories:
      "По выбранному направлению пока нет открытых категорий вакансий.",
    noInCategory: "В этой категории пока нет открытых вакансий.",
    categoryAria: "{title} — перейти к вакансиям",
    vacancyAria: "{title} — перейти к вакансии",
    typeNav: {
      scrollBack: "Прокрутить типы вакансий назад",
      scrollForward: "Прокрутить типы вакансий вперёд",
    },
    detail: {
      salary: "Зарплата: {value}",
      schedule: "График: {value}",
      experience: "Опыт: {value}",
      location: "Место: {value}",
    },
    application: {
      title: "Отклик на вакансию",
      vacancy: "Вакансия",
      category: "Категория",
      namePlaceholder: "Ф.И.О",
      phonePlaceholder: "Телефон",
      aboutPlaceholder:
        "Напишите несколько слов о себе, расскажите о своём опыте",
      resumeHint:
        "Если у Вас есть резюме, пожалуйста, прикрепите его к отклику.",
      resumeMaxSize: "Размер не более 5 МБ",
      chooseFile: "Выберите файл",
      consentPrefix: "Я согласен(на) на передачу и",
      consentProcessing: "обработку персональных данных",
      consentMiddle: "в соответствии с",
      consentPolicy: "Политикой конфиденциальности",
      submit: "отправить отклик",
      submitting: "отправка…",
      imageAlt: "Сотрудник ОМЗ за работой",
    },
  },
  news: {
    breadcrumb: "Новости",
    title: "Новости",
    allNews: "все новости",
    emptyCategory: "В выбранной категории пока нет опубликованных новостей.",
    categoryNav: {
      scrollBack: "Прокрутить категории назад",
      scrollForward: "Прокрутить категории вперёд",
    },
    carousel: {
      prev: "Предыдущая новость",
      next: "Следующая новость",
    },
  },
  services: {
    breadcrumb: "Услуги",
    delivery: {
      breadcrumb: "Доставка",
      title: "доставка осуществляется транспортом ОМЗ",
      truckAlt: "Грузовик с логотипом ОМЗ",
      paragraphs: {
        p1: {
          part1: "Изготовленную на заводе продукцию покупатель ",
          part2:
            "может получить как железнодорожным транспортом, так и автомобильным.",
          part3:
            " Основную долю продукции АО «ОМЗ» отгружает ж/д транспортом: ",
          part4: "полувагоны, платформы и контейнера",
          part5: " (от 3 тн. до 20 тн. в зависимости от объема заказа).",
        },
        p2: {
          part1: "Отгрузка ж/д транспортом осуществляется с узловой станции,",
          part2: " которая находится на расстоянии 23 км от г. Очёр. ",
          part3:
            "На станции у АО «ОМЗ» есть своя ветка с погрузочно — разгрузочной площадкой и козловым краном,",
          part4: " грузоподъемностью 10 тн.",
        },
      },
      notice: {
        part1:
          "Для отгрузки потребителю готовой продукции, не подходящей под стандартные схемы, ",
        part2:
          "АО «ОМЗ» готово разработать и согласовать необходимый пакет документов с управлением железной дороги.",
      },
    },
  },
  production: {
    breadcrumb: "Производство",
    equipmentTitle: "Парк оборудования",
    heroStats: {
      nav: "Навигация по показателям",
      prev: "Предыдущий показатель",
      next: "Следующий показатель",
      metal: {
        area: { title: "13 425 КВ.М.", description: "Общая площадь цехов" },
        capacity: {
          title: "900 ТОНН/МЕС",
          description: "Производственная мощность цеха",
        },
        crane: {
          title: "8 КРАНОВ",
          description: "Мостовые краны до 10 тонн",
        },
      },
      oilfield: {
        pipes: {
          title: "1 МЛН ШТ/ГОД",
          description: "Производство насосных штанг",
        },
        factory: {
          title: "300+ СПЕЦИАЛИСТОВ",
          description: "В цехе нефтепромыслового оборудования",
        },
        cycle: {
          title: "ПОЛНЫЙ ЦИКЛ",
          description: "От заготовки до испытаний и маркировки",
        },
      },
      building: {
        formwork: {
          title: "ОПАЛУБКА",
          description: "Винты, замки, подкосы и стойки",
        },
        stock: {
          title: "СКЛАД",
          description: "Постоянный запас ходовых позиций",
        },
        custom: {
          title: "ПО ЗАКАЗУ",
          description: "Типовые и индивидуальные чертежи",
        },
      },
    },
    stock: { prev: "Предыдущая позиция", next: "Следующая позиция" },
    advantages: {
      prev: "Предыдущее преимущество",
      next: "Следующее преимущество",
    },
    workshops: {
      metal: {
        title: "Цех металлоконструкций",
        cta: "ОМЗ — это команда, где ценят труд и помогают развиваться. Присоединяйтесь к нам!",
      },
    },
  },
  history: {
    breadcrumb: "История создания компании",
    title: "История создания компании",
    intro:
      "Узнайте интереснейшую историю нашего завода, какой мы прошли путь и какие этапы трансформации заводы были пройдены",
    timelineAria: "Годы истории компании",
    illustrationAlt: "Иллюстрация — {year} год",
    placeholder: "Исторические материалы за {year} год готовятся к публикации.",
    entry1757: {
      p1: "На плечи 24-летнего Александра Сергеевича Строганова легла ответственность за развитие семейного бизнеса",
      p2: "К этому времени наследник получил блестящее образование, в которое входил и серьезный курс изучения промышленных предприятий Европы. В 1746 году старший дядя Александра Сергеевича, Александр Григорьевич Строганов, построил Юго-Камский завод",
      p3: "Опираясь на его успешный опыт, Александр Сергеевич принимает предложение управляющего Фёдора Ваулина и решает возвести завод в богатых лесом очёрских местах. Для кричных горнов молотобойного завода требовалось большое количество древесного угля. Дело оставалось за малым: создать в глухом уголкке огромной вотчины новый город-завод",
    },
  },
  certificates: {
    breadcrumb: "Сертификаты",
    title: "сертификаты",
    prev: "Предыдущий сертификат",
    next: "Следующий сертификат",
    open: "Открыть {alt}",
    progress: "Прогресс просмотра сертификатов",
    lightbox: {
      aria: "Просмотр сертификата",
      closeView: "Закрыть просмотр",
    },
    items: {
      formworkEndAnchor: "Анкер торцевой для опалубки",
      anchorsAndTies: "Анкеры и стяжки",
      tieRodNuts: "Гайки для стяжного винта",
      polishedRodClamps: "Зажимы полированных штоков",
      wedgeAligningLocks: "Замки клиновые выравнивающие для опалубки",
      railAligningLocks: "Замки реечные выравнивающие для опалубки",
      pkHousing: "Кожух ПК",
      nktmCoupling73: "Муфта НКТМ 73",
      nktCouplingsGost31446: "Муфты НКТ ГОСТ 31446",
      nktCouplingsGost633: "Муфты НКТ ГОСТ 633",
      nktmCouplings: "Муфты НКТМ",
      pipelineSupportsVankor: "Опоры трубопроводов РН-Ванкор",
      pipelineSupports: "Опоры трубопроводов",
      utilityModelPatent: "Патент на полезную модель",
      wellheadSeals: "Сальники устьевые",
      tmkCertificate: "Свидетельство ТМК",
      qmsMetalStructures:
        "Система менеджмента качества (металлоконструкции)",
      qmsOilfieldEquipment:
        "Система менеджмента качества (нефтепромысловое оборудование)",
      automaticCouplingDevice: "Устройство автоматическое сцепное",
      fiberglassPumpRod: "Штанга насосная стеклопластиковая",
      pumpRodsAndCouplings: "Штанги насосные и муфты к ним",
      pumpRodsCouplings: "Штанги насосные и муфты",
      polishedRodGost31825: "Шток полированный ГОСТ 31825",
      polishedRod: "Шток полированный",
      rodHolder: "Штокодержатель",
      cornerStrippingPanel: "Щит угловой распалубочный",
    },
  },
  procurement: {
    columns: { name: "Наименование", quantity: "Количество" },
    empty: "Данные таблицы пока не добавлены.",
  },
  education: {
    columns: { code: "Код", name: "Наименование", info: "Информация" },
    empty: "Данные таблицы пока не добавлены.",
  },
  laborProtection: {
    breadcrumb: "Охрана труда",
    title: "охрана труда",
    download: "скачать",
    empty: "Документы пока не добавлены.",
  },
  safetyHotline: {
    breadcrumb: "Горячая линия безопасности",
    title: "линия безопасности",
    sectionTitle: "Горячая линия безопасности",
    reviewNote:
      "Каждое обращение будет внимательно рассмотрено, при наличии оснований будет проведена соответствующая проверка.",
    intro: {
      p1: {
        part1:
          "В целях поддержания высокого уровня доверия к АО «Очерский машиностроительный завод»,",
        part2:
          " соблюдения международных стандартов этики ведения бизнеса, в рамках реализации политики предприятия по вопросам выявления и предупреждения всевозможных нарушений и злоупотреблений, в том числе коррупции и мошенничества, злоупотребления положением и полномочиями, а также для противодействия иным правонарушениям ",
        part3: "на предприятии создана «ГОРЯЧАЯ ЛИНИЯ БЕЗОПАСНОСТИ».",
      },
      p2: {
        part1: "Обратившись по «Горячей линии безопасности», ",
        part2:
          "вы можете в удобной форме, в том числе на условиях анонимности, сообщить о фактах хищения и растраты в компании, кражи, мошенничества, взяточничества, коммерческого подкупа, конфликта интересов,",
        part3:
          " а также о других негативных событиях, вызвавших Вашу озабоченность.",
      },
    },
    notices: {
      anonymity:
        "Лицам, предоставившим информацию, гарантируется полная анонимность и конфиденциальность.",
      reward:
        "В случае предоставления достоверной информации, позволившей предотвратить нанесение ущерба предприятию, предусматривается денежное вознаграждение на условиях конфиденциальности.",
    },
  },
  staticCategories,
  metadata: {
    site: {
      title: "Очёрский машиностроительный завод | ОМЗ",
      description:
        "АО «Очерский машиностроительный завод» — производство нефтепромыслового оборудования, металлоконструкций и строительных конструкций",
    },
    catalog: {
      baseTitle: "Каталог продукции | ОМЗ",
      baseDescription:
        "Каталог нефтепромыслового оборудования, металлоконструкций и строительных конструкций ОМЗ: характеристики, наличие и цены.",
      searchTitle: "Поиск «{search}» — каталог | ОМЗ",
      pageTitle: "Каталог продукции — страница {page} | ОМЗ",
      subcategoryTitle: "{subcategory} — {category} | ОМЗ",
      subcategoryPageTitle: "{subcategory} — страница {page} | ОМЗ",
      subcategoryDescription:
        "{subcategory}: характеристики, наличие и цены. Категория «{category}». Производство ОМЗ.",
      categoryTitle: "{category} — каталог | ОМЗ",
      categoryPageTitle: "{category} — страница {page} | ОМЗ",
      categoryDescription:
        "{category}: характеристики, наличие и цены. Производство ОМЗ.",
      categoryNotFound: "Категория не найдена",
      categorySeo: {
        oilfield:
          "Штанги насосные, штоки полированные, муфты, центраторы, сальники устьевые и другое нефтепромысловое оборудование. Производство ОМЗ, соответствие ГОСТ.",
        metalwork:
          "Сваи, металлоконструкции зданий и сооружений, ростверки, ёмкости, резервуары, опоры трубопроводов. Изготовление по чертежам заказчика.",
        construction:
          "Замки клиновые, винты стяжные, анкеры, унивилки, подкосы, стойки и другие строительные конструкции для опалубки. Собственное производство.",
        calibrated:
          "Круглый калиброванный прокат различных диаметров. Высокая точность, соответствие стандартам качества.",
      },
    },
    product: {
      notFound: "Товар не найден | Ochko",
      buyDescription: "Купить {title} в каталоге Ochko",
    },
    cart: {
      title: "Корзина | Ochko",
      description: "Оформление заказа",
    },
    certificates: {
      title: "Сертификаты | Ochko",
      description: "Сертификаты и патенты Очёрского машиностроительного завода",
    },
    history: {
      title: "История создания компании | Ochko",
      description:
        "История создания и развития Очёрского машиностроительного завода",
    },
    news: {
      title: "Новости | Ochko",
      description:
        "Новости и пресс-центр Очёрского машиностроительного завода — производство, партнёры, жизнь коллектива",
      notFound: "Новость не найдена",
      itemTitle: "{title} — новости | Ochko",
    },
    services: {
      title: "{title} | Ochko",
      description:
        "Услуги АО «Очерский машиностроительный завод» — ремонт, резка, испытания, проектирование и доставка",
      delivery: {
        title: "Доставка | Ochko",
        description:
          "Доставка продукции АО «Очерский машиностроительный завод» — ж/д и автомобильным транспортом",
      },
    },
    products: {
      title: "Продукция | Ochko",
      description:
        "Продукция Очёрского машиностроительного завода — нефтепромысловое оборудование, металлоконструкции, строительные конструкции, калиброванный прокат",
    },
    about: {
      title: "{title} | ОМЗ",
      description:
        "АО «Очерский машиностроительный завод» — производство нефтепромыслового оборудования, металлоконструкций и строительных конструкций",
    },
    vacancies: {
      title: "Вакансии | Ochko",
      description:
        "Вакансии Очёрского машиностроительного завода — присоединяйтесь к команде профессионалов",
      notFound: "Вакансия не найдена",
      categoryNotFound: "Категория не найдена",
      itemTitle: "{title} — вакансии | Ochko",
      categoryTitle: "{title} — вакансии | Ochko",
    },
    procurement: {
      title: "{title} | Ochko",
      description:
        "Закупки Очёрского машиностроительного завода — перечень материалов и потребностей",
    },
    education: {
      title: "Сведения об образовательной организации | Ochko",
      description:
        "Сведения об образовательной организации АО «Очерский машиностроительный завод»",
    },
    laborProtection: {
      title: "Охрана труда | Ochko",
      description:
        "Документы по охране труда АО «Очерский машиностроительный завод»",
    },
    safetyHotline: {
      title: "Горячая линия безопасности | Ochko",
      description:
        "Горячая линия безопасности АО «Очерский машиностроительный завод» — сообщите о нарушениях анонимно",
    },
  },
  validation: {
    order: {
      nameRequired: "Укажите имя",
      phoneInvalid: "Укажите корректный телефон",
      paymentRequired: "Выберите способ оплаты",
      cartEmpty: "Корзина пуста",
      submitFailed: "Не удалось оформить заказ. Попробуйте позже.",
    },
    vacancy: {
      vacancyRequired: "Не указана вакансия для отклика",
      nameRequired: "Укажите Ф.И.О.",
      phoneInvalid: "Укажите корректный телефон",
      aboutRequired: "Расскажите немного о себе",
      consentRequired: "Необходимо согласие на обработку данных",
      resumeTooLarge: "Размер резюме не должен превышать 5 МБ",
      resumeFormat: "Допустимые форматы резюме: PDF, DOC, DOCX, RTF",
      notFound: "Вакансия не найдена или уже закрыта",
      submitFailed: "Не удалось отправить отклик. Попробуйте позже.",
    },
  },
  localeSwitcher: {
    label: "Язык",
    ariaLabel: "Выбор языка",
    ru: "Русский",
    en: "English",
    zh: "中文",
  },
};

function deepTranslate(obj, locale) {
  if (typeof obj === "string") {
    return translateString(obj, locale);
  }
  if (Array.isArray(obj)) {
    return obj.map((item) => deepTranslate(item, locale));
  }
  if (obj && typeof obj === "object") {
    const out = {};
    for (const [key, value] of Object.entries(obj)) {
      out[key] = deepTranslate(value, locale);
    }
    return out;
  }
  return obj;
}

const zhOverrides = {
  Home: "首页",
  Logo: "标志",
  "Learn more": "了解更多",
  "Go to catalog": "进入目录",
  Call: "致电",
  all: "全部",
  "Loading…": "加载中…",
  "Show more": "显示更多",
  Download: "下载",
  Search: "搜索",
  Close: "关闭",
  Cart: "购物车",
  News: "新闻",
  Contacts: "联系方式",
  Company: "公司",
  Products: "产品",
  Production: "生产",
  Services: "服务",
  History: "历史",
  Certificates: "证书",
  Vacancies: "招聘",
  Procurement: "采购",
  Delivery: "配送",
  Catalog: "目录",
  Language: "语言",
  Russian: "俄语",
  English: "英语",
  Chinese: "中文",
  "In stock": "现货",
  "On order": "预订",
  "Add to cart": "加入购物车",
  "Place order": "提交订单",
  Clear: "清除",
  from: "从",
  to: "到",
  Name: "姓名",
  Phone: "电话",
  Code: "代码",
  Information: "信息",
  Quantity: "数量",
  Russia: "俄罗斯",
  Kazakhstan: "哈萨克斯坦",
  Belarus: "白俄罗斯",
  India: "印度",
  Brazil: "巴西",
  Argentina: "阿根廷",
  Venezuela: "委内瑞拉",
  USA: "美国",
  cart: "购物车",
  "machine-": "机械",
  building: "制造",
  "product catalog": "产品目录",
  checkout: "结账",
  done: "完成",
  "order placed": "订单已提交",
  "thank you for your order": "感谢您的订单",
  "empty for now": "暂时为空",
  "no items in cart": "购物车中没有商品",
  "Enter contact details": "请输入联系信息",
  "Your name": "您的姓名",
  "Delivery address": "配送地址",
  "Order comment": "订单备注",
  "Bank card at the office": "办公室刷卡支付",
  "Cash at the store": "门店现金支付",
  "Warranty on parts": "配件保修",
  "Delivery across Russia": "全俄配送",
  "Manager assistance with orders": "下单经理协助",
  "Updating items": "正在更新商品",
  "Apply for vacancy": "申请职位",
  "submit application": "提交申请",
  "sending…": "发送中…",
  "Current vacancies": "最新招聘",
  "Company history": "公司历史",
  "Oilfield equipment": "石油开采设备",
  "Metal structures": "金属结构",
  "Construction structures": "建筑结构",
  "Calibrated rolled stock": "校准轧材",
  "Pump rods": "抽油杆",
  "Polished rods": "抛光杆",
  Centralizers: "扶正器",
  Piles: "桩基",
  "Tanks and reservoirs": "储罐和容器",
  "Wedge lock": "楔形锁",
  "Formwork tie screw": "模板对拉螺丝",
  Prop: "支撑",
  "Round calibrated rolled stock": "圆形校准轧材",
  "Main background image": "主背景图",
  "Building the future while preserving traditions": "建设未来，传承传统",
  Ocher: "奥切尔",
  "machine-building": "机械制造",
  plant: "工厂",
  "OMZ in numbers and facts": "OMZ 数据与事实",
  "Equipment fleet": "设备园区",
  "Truck with OMZ logo": "带有 OMZ 标志的卡车",
  "OMZ employee at work": "OMZ 员工在工作",
  "Certificate 1": "证书 1",
  "Certificate 2": "证书 2",
  "Certificate 3": "证书 3",
  "Safety hotline": "安全热线",
  "Occupational safety": "劳动保护",
  "Educational organization information": "教育机构信息",
  "Parts catalog": "配件目录",
  "Site search": "站内搜索",
  "Popular searches": "热门搜索",
  "Site sections": "网站栏目",
  "About the plant": "关于工厂",
  "our partners": "我们的合作伙伴",
  "delivery geography": "供应地理",
  catalog: "目录",
  products: "产品",
  "DELIVERY COUNTRIES": "供应国家",
  COUNTRIES: "国家",
  DELIVERIES: "供应",
  REGIONS: "地区",
  PRESENCE: "存在",
  INDUSTRIAL: "工业",
  CUSTOMERS: "客户",
  "All catalog": "全部目录",
  "Select a category": "选择类别",
  "Select all": "全选",
  "Deselect all": "取消全选",
  Go: "前往",
  Specifications: "规格",
  "Reset filters": "重置筛选",
  Sort: "排序",
  "By popularity": "按热门",
  "Alphabetically (A–Z)": "按字母 A–Z",
  "Alphabetically (Z–A)": "按字母 Z–A",
  "Price: low to high": "价格从低到高",
  "Price: high to low": "价格从高到低",
  Description: "描述",
  Documentation: "文档",
  download: "下载",
  "safety line": "安全热线",
  certificates: "证书",
  "occupational safety": "劳动保护",
  salary: "薪资",
  apply: "申请",
  "all news": "全部新闻",
  "Product catalog | OMZ": "产品目录 | OMZ",
  "Ocher Machine-Building Plant | OMZ": "奥切尔机械制造厂 | OMZ",
  "Cart | Ochko": "购物车 | Ochko",
  "Certificates | Ochko": "证书 | Ochko",
  "Company history | Ochko": "公司历史 | Ochko",
  "News | Ochko": "新闻 | Ochko",
  "Delivery | Ochko": "配送 | Ochko",
  "Products | Ochko": "产品 | Ochko",
  "Vacancies | Ochko": "招聘 | Ochko",
  "Occupational safety | Ochko": "劳动保护 | Ochko",
  "Safety hotline | Ochko": "安全热线 | Ochko",
  "Educational organization information | Ochko": "教育机构信息 | Ochko",
  "Product not found | Ochko": "未找到商品 | Ochko",
  Checkout: "结账",
  "Price on request": "价格面议",
  "PRICE ON REQUEST": "价格面议",
  "SKU:": "货号：",
  Availability: "库存",
  "Perm · Mon–Fri 9:00–18:00": "彼尔姆 · 周一至周五 9:00–18:00",
};

function translateRuToZh(ruText, enText) {
  const exact = {
    Главная: "首页",
    Логотип: "标志",
    ОМЗ: "OMZ",
    中文: "中文",
  };
  return (
    exact[ruText] ??
    zhOverrides[ruText] ??
    zhOverrides[enText] ??
    zhEnMap[ruText] ??
    zhEnMap[enText] ??
    enText
  );
}

function translateString(str, locale) {
  if (locale === "ru") return str;

  const enMap = {
    Главная: "Home",
    Логотип: "Logo",
    ОМЗ: "OMZ",
    Подробнее: "Learn more",
    "Подробнее о цехе": "About the workshop",
    "Перейти в каталог": "Go to catalog",
    Позвонить: "Call",
    все: "all",
    "Загрузка…": "Loading…",
    "Показать ещё": "Show more",
    Скачать: "Download",
    Очистить: "Clear",
    от: "from",
    до: "to",
    Параметр: "Parameter",
    Документ: "Document",
    "Нет изображения": "No image",
    Фабрика: "Factory",
    "Видео о производстве": "Production video",
    "Хлебные крошки": "Breadcrumbs",
    "Основная навигация": "Main navigation",
    "Написать на почту": "Send email",
    Искать: "Search",
    Закрыть: "Close",
    "Открыть меню": "Open menu",
    "Закрыть меню": "Close menu",
    "Предыдущий слайд": "Previous slide",
    "Следующий слайд": "Next slide",
    "Навигация по слайдам": "Slide navigation",
    "Предыдущее фото": "Previous photo",
    "Следующее фото": "Next photo",
    "Удалить из корзины": "Remove from cart",
    "Уменьшить количество": "Decrease quantity",
    "Увеличить количество": "Increase quantity",
    "Прикрепить резюме": "Attach resume",
    "Удалить файл": "Remove file",
    "В наличии": "In stock",
    "Под заказ": "On order",
    Наличие: "Availability",
    "Артикул:": "SKU:",
    "Цена по запросу": "Price on request",
    "ЦЕНА ПО ЗАПРОСУ": "PRICE ON REQUEST",
    Стоимость: "Price",
    "В корзину": "Add to cart",
    "г. Пермь · Пн–Пт 9:00–18:00": "Perm · Mon–Fri 9:00–18:00",
    Компания: "Company",
    Продукция: "Products",
    Производство: "Production",
    Услуги: "Services",
    Новости: "News",
    Контакты: "Contacts",
    "Каталог комплектующих": "Parts catalog",
    "О компании": "About",
    История: "History",
    Сертификаты: "Certificates",
    Партнерам: "For partners",
    Партнеры: "Partners",
    Вакансии: "Vacancies",
    Закупки: "Procurement",
    "Горячая линия безопасности": "Safety hotline",
    "Сведения об образовательной организации":
      "Educational organization information",
    "Охрана труда": "Occupational safety",
    "Ремонт насосных штанг": "Pump rod repair",
    "Лазерная резка металла": "Laser metal cutting",
    "Производство круга калиброванного": "Calibrated round production",
    "Лабораторные испытания": "Laboratory testing",
    "Разработка конструктивной документации":
      "Structural documentation development",
    Доставка: "Delivery",
    "Меню навигации": "Navigation menu",
    "Язык сайта": "Site language",
    "Поиск оборудования": "Search equipment",
    "Найти продукцию и услуги": "Find products and services",
    Корзина: "Cart",
    "Пока пусто": "Empty for now",
    Сайт: "Site",
    "Каталог товаров": "Product catalog",
    Почта: "Email",
    "Часы работы": "Working hours",
    "Пишите нам в соц сетях": "Message us on social media",
    "Для коммерческих предложеиний": "For commercial proposals",
    "Политика конфиденциальности": "Privacy policy",
    "Пользовательское соглашение": "Terms of use",
    "Опалубка лифтовых шахт": "Elevator shaft formwork",
    "Опалубка стеновая": "Wall formwork",
    "Опалубка перекрытий": "Floor formwork",
    Хомуты: "Clamps",
    "Винт стяжной": "Tie screw",
    "Комплектующие к опалубке": "Formwork accessories",
    Комплектующие: "Accessories",
    Поиск: "Search",
    "Поиск по сайту": "Site search",
    "Часто ищут": "Popular searches",
    "Разделы сайта": "Site sections",
    "Каталог продукции": "Product catalog",
    "История компании": "Company history",
    "О заводе": "About the plant",
    "наши партнёры": "our partners",
    "география поставок": "delivery geography",
    каталог: "catalog",
    продукции: "products",
    "СТРАНЫ ПОСТАВОК": "DELIVERY COUNTRIES",
    СТРАНЫ: "COUNTRIES",
    ПОСТАВОК: "DELIVERIES",
    РЕГИОНЫ: "REGIONS",
    ПРИСУТСТВИЯ: "PRESENCE",
    ПРОМЫШЛЕННЫЕ: "INDUSTRIAL",
    ЗАКАЗЧИКИ: "CUSTOMERS",
    Россия: "Russia",
    Казахстан: "Kazakhstan",
    Беларусь: "Belarus",
    Индия: "India",
    Бразилия: "Brazil",
    Аргентина: "Argentina",
    Венесуэла: "Venezuela",
    США: "USA",
    Каталог: "Catalog",
    "каталог продукции": "product catalog",
    "Весь каталог": "All catalog",
    "Выберите категорию": "Select a category",
    "Выбрать все": "Select all",
    "Снять все": "Deselect all",
    Перейти: "Go",
    Характеристики: "Specifications",
    "Сбросить фильтры": "Reset filters",
    Сортировка: "Sort",
    "По популярности": "By popularity",
    "По алфавиту (А–Я)": "Alphabetically (A–Z)",
    "По алфавиту (Я–А)": "Alphabetically (Z–A)",
    "Сначала дешёвые": "Price: low to high",
    "Сначала дорогие": "Price: high to low",
    Описание: "Description",
    Документация: "Documentation",
    скачать: "download",
    "линия безопасности": "safety line",
    сертификаты: "certificates",
    "охрана труда": "occupational safety",
    зарплата: "salary",
    откликнуться: "apply",
    "отправить отклик": "submit application",
    "отправка…": "sending…",
    "Актуальные вакансии": "Current vacancies",
    "История создания компании": "Company history",
    Язык: "Language",
    Русский: "Russian",
    English: "English",
    中文: "Chinese",
    "Нефтепромысловое оборудование": "Oilfield equipment",
    Металлоконструкции: "Metal structures",
    "Строительные конструкции": "Construction structures",
    "Калиброванный прокат": "Calibrated rolled stock",
    "Штанги насосные": "Pump rods",
    "Штоки полированные": "Polished rods",
    Центраторы: "Centralizers",
    Сваи: "Piles",
    "Емкости и резервуары": "Tanks and reservoirs",
    "Замок клиновой": "Wedge lock",
    "Винт стяжной для опалубки": "Formwork tie screw",
    Стойка: "Prop",
    "Круглый калиброванный прокат": "Round calibrated rolled stock",
    Код: "Code",
    Наименование: "Name",
    Информация: "Information",
    Количество: "Quantity",
    "Главное фоновое изображение": "Main background image",
    "Строим будущее, сохраняя традиции":
      "Building the future while preserving traditions",
    Очёрский: "Ocher",
    машиностроительный: "machine-building",
    завод: "plant",
    "ОМЗ в цифрах и фактах": "OMZ in numbers and facts",
    "Парк оборудования": "Equipment fleet",
    "Грузовик с логотипом ОМЗ": "Truck with OMZ logo",
    "Сотрудник ОМЗ за работой": "OMZ employee at work",
    "Анкер торцевой для опалубки": "End anchor for formwork",
    "Анкеры и стяжки": "Anchors and ties",
    "Гайки для стяжного винта": "Tie rod nuts",
    "Зажимы полированных штоков": "Polished rod clamps",
    "Замки клиновые выравнивающие для опалубки":
      "Wedge aligning locks for formwork",
    "Замки реечные выравнивающие для опалубки":
      "Rail aligning locks for formwork",
    "Кожух ПК": "PC housing",
    "Муфта НКТМ 73": "NKT-M coupling 73",
    "Муфты НКТ ГОСТ 31446": "NKT couplings GOST 31446",
    "Муфты НКТ ГОСТ 633": "NKT couplings GOST 633",
    "Муфты НКТМ": "NKT-M couplings",
    "Опоры трубопроводов РН-Ванкор": "Pipeline supports RN-Vankor",
    "Опоры трубопроводов": "Pipeline supports",
    "Патент на полезную модель": "Utility model patent",
    "Сальники устьевые": "Wellhead seals",
    "Свидетельство ТМК": "TMK certificate",
    "Система менеджмента качества (металлоконструкции)":
      "Quality management system (metal structures)",
    "Система менеджмента качества (нефтепромысловое оборудование)":
      "Quality management system (oilfield equipment)",
    "Устройство автоматическое сцепное": "Automatic coupling device",
    "Штанга насосная стеклопластиковая": "Fiberglass pump rod",
    "Штанги насосные и муфты к ним": "Pump rods and couplings",
    "Штанги насосные и муфты": "Pump rods and couplings",
    "Шток полированный ГОСТ 31825": "Polished rod GOST 31825",
    "Шток полированный": "Polished rod",
    "Штокодержатель": "Rod holder",
    "Щит угловой распалубочный": "Corner stripping panel",
    "Укажите имя": "Please enter your name",
    "Укажите корректный телефон": "Please enter a valid phone number",
    "Выберите способ оплаты": "Select a payment method",
    "Корзина пуста": "Cart is empty",
    "Не удалось оформить заказ. Попробуйте позже.":
      "Could not place the order. Please try again later.",
    "Укажите Ф.И.О.": "Please enter your full name",
    "Расскажите немного о себе": "Tell us a little about yourself",
    "Необходимо согласие на обработку данных":
      "Consent to data processing is required",
    "Размер резюме не должен превышать 5 МБ":
      "Resume size must not exceed 5 MB",
    "Допустимые форматы резюме: PDF, DOC, DOCX, RTF":
      "Allowed resume formats: PDF, DOC, DOCX, RTF",
    "Вакансия не найдена или уже закрыта":
      "Vacancy not found or already closed",
    "Не удалось отправить отклик. Попробуйте позже.":
      "Could not submit application. Please try again later.",
    "Не указана вакансия для отклика": "No vacancy specified for application",
    "Оформить заказ": "Place order",
    "Оформляем…": "Processing…",
    "Итого:": "Total:",
    "Сумма скидки": "Discount amount",
    готово: "done",
    "оформление заказа": "checkout",
    "заказ оформлен": "order placed",
    "спасибо за заказ": "thank you for your order",
    "пока пусто": "empty for now",
    "в корзине нет товаров": "no items in cart",
    "Введите контактные данные": "Enter contact details",
    Имя: "Name",
    "Ваше имя": "Your name",
    Телефон: "Phone",
    "Адрес доставки": "Delivery address",
    "Комментарий к заказу": "Order comment",
    "Банковской картой в офисе": "Bank card at the office",
    "Наличными в магазине": "Cash at the store",
    "Гарантия на комплектующие": "Warranty on parts",
    "Доставка по всей России": "Delivery across Russia",
    "Помощь менеджера при заказе": "Manager assistance with orders",
    "Обновляем товары": "Updating items",
    Вакансия: "Vacancy",
    Категория: "Category",
    "Ф.И.О": "Full name",
    "Выберите файл": "Choose file",
    "Отклик на вакансию": "Apply for vacancy",
    "все новости": "all news",
    "Подмости ПН-6": "Scaffold PN-6",
    Тренога: "Tripod",
    "Балка выравнивающая": "Leveling beam",
    "Угол нулевой": "Zero corner",
    "Захват монтажный": "Mounting grip",
    "Щит угловой распалубочный": "Stripping corner panel",
    "Замок реечный выравнивающий": "Leveling rack lock",
    "Подкос двухуровневый": "Two-level brace",
    Унивилка: "Univilka",
    "Гайка стяжная трёхрожковая": "Three-wing tie nut",
    "Анкер торцевой": "End anchor",
    Градирни: "Cooling towers",
    "Годы истории компании": "Company history years",
    "Предыдущий сертификат": "Previous certificate",
    "Следующий сертификат": "Next certificate",
    "Просмотр сертификата": "Certificate viewer",
    "Закрыть просмотр": "Close viewer",
    "Прогресс просмотра сертификатов": "Certificate viewing progress",
    "Данные таблицы пока не добавлены.": "Table data has not been added yet.",
    "Документы пока не добавлены.": "Documents have not been added yet.",
    "Цех нефтепромыслового оборудования": "Oilfield equipment workshop",
    "Цех металлоконструкций": "Metal structures workshop",
    "Цех строительных конструкций": "Building structures workshop",
    "доставка осуществляется транспортом ОМЗ":
      "delivery is provided by OMZ transport",
    "Комплектующие для опалубки": "Formwork accessories",
    "Начните вводить в поле выше, чтобы увидеть варианты":
      "Start typing in the field above to see suggestions",
    "Введите запрос для поиска по сайту": "Enter a query to search the site",
    "Поиск оборудования, услуг...": "Search equipment, services...",
    "По вашему запросу ничего не найдено": "Nothing found for your query",
    "По выбранным фильтрам ничего не найдено":
      "Nothing found for the selected filters",
    "Характеристики не указаны.": "No specifications provided.",
    "Описание товара пока не добавлено.":
      "Product description has not been added yet.",
    "Перейти к сертификатам": "Go to certificates",
    "Пожизненный срок службы": "Lifetime service life",
    "на все Комплектующие": "on all accessories",
    "купите Комплектующие": "buy accessories",
    "в офисе продаж": "at the sales office",
    "Возникли вопросы ?": "Have questions?",
    проконсультируем: "we will advise",
    "Предыдущая страница": "Previous page",
    "Следующая страница": "Next page",
    "Пагинация каталога": "Catalog pagination",
    "Предыдущий факт": "Previous fact",
    "Следующий факт": "Next fact",
    "Предыдущий цех": "Previous workshop",
    "Следующий цех": "Next workshop",
    "Навигация по цехам": "Workshop navigation",
    "Предыдущий партнёр": "Previous partner",
    "Следующий партнёр": "Next partner",
    "Прокрутить категории назад": "Scroll categories back",
    "Прокрутить категории вперёд": "Scroll categories forward",
    "Предыдущая подкатегория": "Previous subcategory",
    "Следующая подкатегория": "Next subcategory",
    "Предыдущая новость": "Previous news item",
    "Следующая новость": "Next news item",
    "Предыдущий показатель": "Previous metric",
    "Следующий показатель": "Next metric",
    "Навигация по показателям": "Metrics navigation",
    "Предыдущая позиция": "Previous item",
    "Следующая позиция": "Next item",
    "Предыдущее преимущество": "Previous advantage",
    "Следующее преимущество": "Next advantage",
    "Прокрутить типы вакансий назад": "Scroll vacancy types back",
    "Прокрутить типы вакансий вперёд": "Scroll vacancy types forward",
    "В выбранной категории пока нет опубликованных новостей.":
      "There are no published news items in the selected category yet.",
    "По выбранному направлению пока нет открытых категорий вакансий.":
      "There are no open vacancy categories in the selected direction yet.",
    "В этой категории пока нет открытых вакансий.":
      "There are no open vacancies in this category yet.",
    "Категория не найдена": "Category not found",
    "Новость не найдена": "News item not found",
    "Вакансия не найдена": "Vacancy not found",
    "Товар не найден | Ochko": "Product not found | Ochko",
    "Оформление заказа": "Checkout",
    "Корзина | Ochko": "Cart | Ochko",
    "Сертификаты | Ochko": "Certificates | Ochko",
    "История создания компании | Ochko": "Company history | Ochko",
    "Новости | Ochko": "News | Ochko",
    "Доставка | Ochko": "Delivery | Ochko",
    "Продукция | Ochko": "Products | Ochko",
    "Вакансии | Ochko": "Vacancies | Ochko",
    "Охрана труда | Ochko": "Occupational safety | Ochko",
    "Горячая линия безопасности | Ochko": "Safety hotline | Ochko",
    "Сведения об образовательной организации | Ochko":
      "Educational organization information | Ochko",
    "Каталог продукции | ОМЗ": "Product catalog | OMZ",
    "Очёрский машиностроительный завод | ОМЗ":
      "Ocher Machine-Building Plant | OMZ",
    "Раздел «Компания»": "“Company” section",
    "Раздел «Продукция»": "“Products” section",
    "Раздел «Производство»": "“Production” section",
    "Раздел «Услуги»": "“Services” section",
    "Карта стран поставок ОМЗ": "OMZ delivery countries map",
    "Страны и регионы присутствия ОМЗ":
      "Countries and regions where OMZ is present",
    "Страны поставок": "Delivery countries",
    "Суммарная площадь производственных цехов":
      "Total area of production workshops",
    "Штат сотрудников предприятия": "Company staff",
    "География поставок продукции": "Product delivery geography",
    "Ключевые производственные направления": "Key production areas",
    "45 000 КВ.М.": "45,000 SQ.M.",
    "> 800 ЧЕЛ.": "> 800 PEOPLE",
    "8 СТРАН": "8 COUNTRIES",
    "3 НАПРАВЛЕНИЯ": "3 PRODUCTION LINES",
    "4 НАПРАВЛЕНИЯ": "4 PRODUCTION LINES",
    "О КОМПАНИИ ОМЗ": "ABOUT OMZ",
    "АО «Очёрский машиностроительный завод» — более двух с половиной веков промышленной истории и современные технологии производства":
      "JSC Ocher Machine-Building Plant — more than two and a half centuries of industrial history and modern production technologies",
    " — одно из старейших промышленных предприятий Западного Урала, специализирующийся на внешнеэкономической деятельности торговых, строительных и нефтепромысловых организаций. Развиваем возможности малого, среднего и крупного бизнеса с помощью бесперебойного производства металлоконструкций, нефтепромыслового оборудования и комплектующих.":
      " — one of the oldest industrial enterprises in the Urals, focused on foreign economic activity for trading, construction, and oilfield organizations. We support small, medium, and large businesses through reliable production of metal structures, oilfield equipment, and components.",
    "Специалисты Очёрского машиностроительного завода всегда готовы к изучению и решению задач любой сложности. Внимательно отслеживают инновационные разработки и прогнозируют возможные риски при эксплуатации металлоконструкций и нефтепромыслового оборудования. Создают рациональную, с точки зрения материальных затрат, концепцию на осуществление метрологического надзора за использованием и состоянием оборудования, снижая расходы за счёт информационно-измерительных комплексов, эталонов и автоматизированной техники для проведения испытаний, химических, металлографических и механических анализов продукции и сырья с соблюдение метрологических норм, нормативных документов и правил для обеспечения требуемой точности и единства, с соответствием отраслевым стандартам: ГОСТ, API 11B, ТУ.":
      "Specialists at Ocher Machine-Building Plant are always ready to study and solve tasks of any complexity. They closely monitor innovative developments and anticipate risks in operating metal structures and oilfield equipment. They develop cost-efficient concepts for metrological supervision of equipment use and condition, reducing costs through measurement complexes, standards, and automated systems for testing and chemical, metallographic, and mechanical analysis of products and raw materials in compliance with GOST, API 11B, TU, and other industry standards.",
    "Целостный организм, сплотивший тысячи зарубежных и российских специалистов. Команда аналитиков, инженеров, аудиторов, системных администраторов, технологов, механиков, конструкторов, сертифицированных руководителей проектов и юристов, обладающих фундаментальными знаниями в области машиностроения, законодательства, высшей математики, аналитики, физики и инженерного дела.":
      "A unified organization bringing together thousands of international and Russian specialists: analysts, engineers, auditors, system administrators, technologists, mechanics, designers, certified project managers, and lawyers with deep expertise in mechanical engineering, law, mathematics, analytics, physics, and engineering.",
    "Производственное предприятие полного цикла": "Full-cycle production facility",
    "АО «Очёрский машиностроительный завод» — одно из старейших промышленных предприятий Западного Урала. Завод объединяет собственные производственные мощности, инженерную экспертизу и контроль качества для выпуска продукции, востребованной в нефтегазовой отрасли, строительстве и промышленности.\n\nОМЗ производит оборудование и комплектующие для предприятий, которым важны надёжность, соответствие стандартам, стабильные поставки и возможность изготовления изделий под конкретные технические требования.":
      "JSC Ocher Machine-Building Plant is one of the oldest industrial enterprises in the Urals. The plant combines in-house production capacity, engineering expertise, and quality control to deliver products demanded by the oil and gas, construction, and industrial sectors.\n\nOMZ manufactures equipment and components for companies that value reliability, compliance with standards, stable deliveries, and the ability to produce items to specific technical requirements.",
    "Производственные возможности": "Production capabilities",
    "Современное оборудование для точного и стабильного производства":
      "Modern equipment for precise and stable production",
    "Фоновое изображение страницы «О компании»":
      "Background image of the About page",
    "Производственные мощности АО «ОМЗ»":
      "Production capacity of JSC OMZ",
    "АО «Очёрский машиностроительный завод»":
      "JSC Ocher Machine-Building Plant",
    " — крупное многопрофильное предприятие Пермского края, выпускающее нефтепромысловое оборудование, металлоконструкции и строительные конструкции для внутреннего и зарубежного рынков. Продукция сертифицирована по требованиям API и представлена в Казахстане, Беларуси, Бразилии, Венесуэле, Аргентине, США, Индии и других странах.":
      " — a large multi-profile enterprise in Perm Krai manufacturing oilfield equipment, metal structures, and building structures for domestic and export markets. Products are certified to API requirements and supplied to Kazakhstan, Belarus, Brazil, Venezuela, Argentina, the USA, India, and other countries.",
    "Покупателей привлекают широкий ассортимент, оперативная доставка и выгрузка, а также нацеленность компании на долгосрочное сотрудничество.":
      "Customers value the wide range, prompt delivery and unloading, and the company's focus on long-term cooperation.",
    "Полный производственный цикл": "Full production cycle",
    "От заготовки и термообработки до испытаний и маркировки — все операции выполняются на площадке завода без привлечения сторонних подрядчиков.\n\nИзделия проходят входной, операционный и приёмочный контроль. Документация и сертификаты соответствия предоставляются заказчику.":
      "From blank preparation and heat treatment to testing and marking — all operations are performed on the plant site without third-party contractors.\n\nProducts undergo incoming, in-process, and acceptance inspection. Compliance documentation and certificates are provided to the customer.",
    "Производственная линия цеха нефтепромыслового оборудования":
      "Oilfield equipment shop production line",
    "Услуги завода ОМЗ": "OMZ plant services",
    "АО «Очерский машиностроительный завод» предлагает полный спектр услуг в области производства и ремонта нефтепромыслового оборудования и металлоконструкций, а также производит лабораторные испытания продукции, разрабатывает конструкторскую документацию, осуществляет услуги доставки.":
      "JSC Ocher Machine-Building Plant offers a full range of services in the production and repair of oilfield equipment and metal structures, as well as laboratory testing of products, design documentation development, and delivery services.",
    "{title} | ОМЗ": "{title} | OMZ",
    "13 425 КВ.М.": "13,425 SQ.M.",
    "900 ТОНН/МЕС": "900 TONS/MONTH",
    "8 КРАНОВ": "8 CRANES",
    "1 МЛН ШТ/ГОД": "1 MLN PCS/YEAR",
    "300+ СПЕЦИАЛИСТОВ": "300+ SPECIALISTS",
    "ПОЛНЫЙ ЦИКЛ": "FULL CYCLE",
    ОПАЛУБКА: "FORMWORK",
    СКЛАД: "WAREHOUSE",
    "ПО ЗАКАЗУ": "ON ORDER",
    "Общая площадь цехов": "Total workshop area",
    "Производственная мощность цеха": "Workshop production capacity",
    "Мостовые краны до 10 тонн": "Overhead cranes up to 10 tons",
    "Производство насосных штанг": "Pump rod production",
    "В цехе нефтепромыслового оборудования":
      "In the oilfield equipment workshop",
    "От заготовки до испытаний и маркировки":
      "From blanks to testing and marking",
    "Винты, замки, подкосы и стойки": "Screws, locks, braces, and props",
    "Постоянный запас ходовых позиций": "Standing stock of popular items",
    "Типовые и индивидуальные чертежи": "Standard and custom drawings",
    "обработку персональных данных": "processing of personal data",
    "Политикой конфиденциальности": "Privacy Policy",
    "Я согласен(на) на передачу и": "I agree to the transfer and",
    "в соответствии с": "in accordance with the",
    "Если у Вас есть резюме, пожалуйста, прикрепите его к отклику.":
      "If you have a resume, please attach it to your application.",
    "Размер не более 5 МБ": "Size up to 5 MB",
    "Напишите несколько слов о себе, расскажите о своём опыте":
      "Write a few words about yourself and your experience",
    "Зарплата: {value}": "Salary: {value}",
    "График: {value}": "Schedule: {value}",
    "Опыт: {value}": "Experience: {value}",
    "Место: {value}": "Location: {value}",
    "Фото {n}": "Photo {n}",
    "Открыть {alt}": "Open {alt}",
    "Иллюстрация — {year} год": "Illustration — {year}",
    "Товаров: {count}": "Items: {count}",
    "Корзина, товаров: {count}": "Cart, items: {count}",
    "{title} — перейти в каталог": "{title} — go to catalog",
    "{title} — перейти к вакансиям": "{title} — go to vacancies",
    "{title} — перейти к вакансии": "{title} — go to vacancy",
    "Купить {title} в каталоге Ochko": "Buy {title} in the Ochko catalog",
    "{title} — новости | Ochko": "{title} — news | Ochko",
    "{title} — вакансии | Ochko": "{title} — vacancies | Ochko",
    "{title} | Ochko": "{title} | Ochko",
    "Поиск «{search}» — каталог | ОМЗ": "Search “{search}” — catalog | OMZ",
    "Каталог продукции — страница {page} | ОМЗ":
      "Product catalog — page {page} | OMZ",
    "{subcategory} — {category} | ОМЗ": "{subcategory} — {category} | OMZ",
    "{subcategory} — страница {page} | ОМЗ":
      "{subcategory} — page {page} | OMZ",
    "{category} — каталог | ОМЗ": "{category} — catalog | OMZ",
    "{category} — страница {page} | ОМЗ": "{category} — page {page} | OMZ",
    "Исторические материалы за {year} год готовятся к публикации.":
      "Historical materials for {year} are being prepared for publication.",
    "Каталог пока пуст. Запустите наполнение данными командой npm run seed":
      "The catalog is empty. Run npm run seed to populate data",
    "Некоторые товары — по запросу. Их стоимость менеджер сообщит при подтверждении заказа.":
      "Some items are priced on request. A manager will confirm their cost when processing the order.",
    "Выберите оборудование в каталоге — добавьте позиции и оформите заказ онлайн или с помощью менеджера":
      "Choose equipment in the catalog, add items, and place an order online or with a manager",
    "Ваш заказ принят. Менеджер свяжется с вами для подтверждения и уточнения деталей.":
      "Your order has been received. A manager will contact you to confirm and clarify details.",
    "Каждое обращение будет внимательно рассмотрено, при наличии оснований будет проведена соответствующая проверка.":
      "Each report will be reviewed carefully; if warranted, an appropriate investigation will be conducted.",
    "Пишите письма, скидывайте свои проекты рады будем ответить вам":
      "Send us emails and your project files — we will be happy to reply",
    "Все права защищены © 2025. при копировании обязательна ссылка на сайт Ocher.ru":
      "All rights reserved © 2025. A link to Ocher.ru is required when copying",
    "Сертификаты и техническая документация доступны в разделе сертификатов или по запросу у менеджера.":
      "Certificates and technical documentation are available in the certificates section or on request from a manager.",
    "ОМЗ — это команда, где ценят труд и помогают развиваться. Присоединяйтесь к нам!":
      "OMZ is a team that values work and helps people grow. Join us!",
    "ОМЗ поставляет оборудование и комплектующие для промышленных предприятий":
      "OMZ supplies equipment and components for industrial enterprises",
    "в России и за рубежом, обеспечивая стабильные поставки и техническую поддержку.":
      "in Russia and abroad, providing stable deliveries and technical support.",
    "Узнайте интереснейшую историю нашего завода, какой мы прошли путь и какие этапы трансформации заводы были пройдены":
      "Discover the fascinating history of our plant, the path we have taken, and the stages of transformation we have gone through",
    "машино-": "machine-",
    строительный: "building",
    корзина: "cart",
    мм: "mm",
    см: "cm",
    м: "m",
    кг: "kg",
    т: "t",
    "АО «Очерский машиностроительный завод» специализируется на выпуске оборудования и комплектующих для ключевых отраслей промышленности в сфере нефтепромыслового оборудования и металлоконструкций. Завод обеспечивает доставку продукции по всей России, странам СНГ и дальнему зарубежью, предлагая решения, которые соответствуют международным стандартам качества.":
      "JSC Ocher Machine-Building Plant specializes in manufacturing equipment and components for key industries in oilfield equipment and metal structures. The plant delivers products across Russia, CIS countries, and abroad, offering solutions that meet international quality standards.",
    "Очерский машиностроительный завод выпускает продукцию по стандартам ГОСТ. Вся продукция проходит многократную проверку качества. Каждое изделие способствует повышению эффективности и безопасности на производственных площадках.":
      "Ocher Machine-Building Plant manufactures products according to GOST standards. All products undergo multiple quality checks. Each item helps improve efficiency and safety at production sites.",
    "ОМЗ предоставляет комплексные решения в области производства оборудования для добычи нефти:":
      "OMZ provides comprehensive solutions for oil production equipment manufacturing:",
    "Штанги насосные и муфты: основа для надёжной работы насосного оборудования;":
      "Pump rods and couplings: the foundation for reliable pump equipment operation;",
    "Центраторы и автосцепы: гарантируют правильную сборку и функционирование всех компонентов;":
      "Centralizers and auto-couplers: ensure proper assembly and operation of all components;",
    "Сальники и штанговращатели: эффективно защищают и управляют движением штанг.":
      "Seals and rod rotators: effectively protect and control rod movement.",
    "Производим металлоконструкции, которые находят применение в самых разнообразных областях:":
      "We manufacture metal structures used in a wide range of applications:",
    "Конструкции для зданий и сооружений: от небольших элементов до крупномасштабных проектов;":
      "Structures for buildings and facilities: from small elements to large-scale projects;",
    "Опоры и каркасы для трубопроводов: необходимы для обеспечения безопасности и долговечности инфраструктуры;":
      "Supports and frames for pipelines: essential for infrastructure safety and durability;",
    "Опоры для строительства и реконструкции участков автомобильных дорог;":
      "Supports for construction and reconstruction of road sections;",
    "Ёмкости и резервуары.": "Tanks and reservoirs.",
    "Комплектующие для опалубки, производимые АО «Очерский машиностроительный завод», отвечают высоким стандартам качества и долговечности.":
      "Formwork accessories manufactured by JSC Ocher Machine-Building Plant meet high quality and durability standards.",
    "Анкеры торцевые и винты стяжные: создают крепкое соединение между элементами опалубки, повышая надёжность всей системы;":
      "End anchors and tie screws: create strong connections between formwork elements, improving overall system reliability;",
    "Трёхрожковые гайки, клиновые и реечные замки: усиливают сцепление конструкционных компонентов, обеспечивая их стабильность и надёжность во время использования;":
      "Three-wing nuts, wedge and rack locks: strengthen connections between structural components, ensuring stability and reliability during use;",
    "Угловые щиты и усиленные унивилки для стоек: увеличивают устойчивость и прочность опалубочных конструкций, способствуя их долгосрочной эксплуатации;":
      "Corner panels and reinforced univilkas for props: increase stability and strength of formwork structures for long-term use;",
    "Подкосы двухуровневые и углы распалубочные;":
      "Two-level braces and stripping corners;",
    "Нулевой угол и балка выравнивающая.": "Zero corner and leveling beam.",
    "Изготовленную на заводе продукцию покупатель ":
      "Products manufactured at the plant can be received by the customer ",
    "может получить как железнодорожным транспортом, так и автомобильным.":
      "by rail or by road.",
    " Основную долю продукции АО «ОМЗ» отгружает ж/д транспортом: ":
      " OMZ ships most products by rail: ",
    "полувагоны, платформы и контейнера":
      "open wagons, flatcars, and containers",
    " (от 3 тн. до 20 тн. в зависимости от объема заказа).":
      " (from 3 to 20 tons depending on order volume).",
    "Отгрузка ж/д транспортом осуществляется с узловой станции,":
      "Rail shipments are made from a junction station,",
    " которая находится на расстоянии 23 км от г. Очёр. ":
      " located 23 km from Ocher. ",
    "На станции у АО «ОМЗ» есть своя ветка с погрузочно — разгрузочной площадкой и козловым краном,":
      "OMZ has its own siding at the station with a loading/unloading area and a gantry crane,",
    " грузоподъемностью 10 тн.": " with a lifting capacity of 10 tons.",
    "Для отгрузки потребителю готовой продукции, не подходящей под стандартные схемы, ":
      "For shipping finished products to customers that do not fit standard schemes, ",
    "АО «ОМЗ» готово разработать и согласовать необходимый пакет документов с управлением железной дороги.":
      "OMZ is ready to develop and approve the required documentation with the railway administration.",
    "На плечи 24-летнего Александра Сергеевича Строганова легла ответственность за развитие семейного бизнеса":
      "At the age of 24, Alexander Sergeyevich Stroganov took responsibility for developing the family business",
    "К этому времени наследник получил блестящее образование, в которое входил и серьезный курс изучения промышленных предприятий Европы. В 1746 году старший дядя Александра Сергеевича, Александр Григорьевич Строганов, построил Юго-Камский завод":
      "By then, the heir had received an excellent education, including a serious course in studying industrial enterprises in Europe. In 1746, Alexander Sergeyevich's elder uncle, Alexander Grigoryevich Stroganov, built the Yugo-Kamsky plant",
    "Опираясь на его успешный опыт, Александр Сергеевич принимает предложение управляющего Фёдора Ваулина и решает возвести завод в богатых лесом очёрских местах. Для кричных горнов молотобойного завода требовалось большое количество древесного угля. Дело оставалось за малым: создать в глухом уголкке огромной вотчины новый город-завод":
      "Drawing on this successful experience, Alexander Sergeyevich accepted manager Fyodor Vaulin's proposal and decided to build a plant in the forest-rich Ocher lands. The bloomery forge of the hammer mill required large amounts of charcoal. All that remained was to create a new factory town in a remote corner of the vast estate",
    "В целях поддержания высокого уровня доверия к АО «Очерский машиностроительный завод»,":
      "To maintain a high level of trust in JSC Ocher Machine-Building Plant,",
    " соблюдения международных стандартов этики ведения бизнеса, в рамках реализации политики предприятия по вопросам выявления и предупреждения всевозможных нарушений и злоупотреблений, в том числе коррупции и мошенничества, злоупотребления положением и полномочиями, а также для противодействия иным правонарушениям ":
      " compliance with international business ethics standards, and as part of the company's policy on detecting and preventing violations and abuses, including corruption and fraud, abuse of position and authority, and countering other offenses ",
    "на предприятии создана «ГОРЯЧАЯ ЛИНИЯ БЕЗОПАСНОСТИ».":
      "a SAFETY HOTLINE has been established at the company.",
    "Обратившись по «Горячей линии безопасности», ":
      "By contacting the Safety Hotline, ",
    "вы можете в удобной форме, в том числе на условиях анонимности, сообщить о фактах хищения и растраты в компании, кражи, мошенничества, взяточничества, коммерческого подкупа, конфликта интересов,":
      "you can conveniently report, including anonymously, theft and embezzlement, fraud, bribery, commercial bribery, and conflicts of interest,",
    " а также о других негативных событиях, вызвавших Вашу озабоченность.":
      " as well as other negative events that concern you.",
    "Лицам, предоставившим информацию, гарантируется полная анонимность и конфиденциальность.":
      "Full anonymity and confidentiality are guaranteed to those who provide information.",
    "В случае предоставления достоверной информации, позволившей предотвратить нанесение ущерба предприятию, предусматривается денежное вознаграждение на условиях конфиденциальности.":
      "If reliable information helps prevent damage to the company, a monetary reward is provided under confidentiality terms.",
    "Муфты штанг насосных и штоков полированных":
      "Pump rod and polished rod couplings",
    "Штанговращатели ШВР": "SVR rod rotators",
    "Сальники устьевые": "Wellhead seals",
    "Зажимы полированных штоков": "Polished rod clamps",
    Автосцепы: "Auto-couplers",
    "Штанги насосные шарнирные": "Hinged pump rods",
    "Муфты для насосно-компрессорных труб": "Tubing couplings",
    "Кожухи защиты кабеля (протекторы)": "Cable protection covers (protectors)",
    "Металлоконструкции зданий и сооружений":
      "Building and facility metal structures",
    "Металлоконструкции ростверков, балок, фундаментов":
      "Grade beam, beam, and foundation metal structures",
    "Опоры трубопровода": "Pipeline supports",
    "Опоры для строительства и реконструкции автодорог":
      "Supports for road construction and reconstruction",
    "Колодцы канализационные различного назначения":
      "Sewer manholes for various purposes",
    "АО «Очерский машиностроительный завод» — производство нефтепромыслового оборудования, металлоконструкций и строительных конструкций":
      "JSC Ocher Machine-Building Plant — oilfield equipment, metal structures, and construction structures manufacturing",
    "Каталог нефтепромыслового оборудования, металлоконструкций и строительных конструкций ОМЗ: характеристики, наличие и цены.":
      "OMZ catalog of oilfield equipment, metal structures, and construction structures: specifications, availability, and prices.",
    "{subcategory}: характеристики, наличие и цены. Категория «{category}». Производство ОМЗ.":
      "{subcategory}: specifications, availability, and prices. Category “{category}”. Made by OMZ.",
    "{category}: характеристики, наличие и цены. Производство ОМЗ.":
      "{category}: specifications, availability, and prices. Made by OMZ.",
    "Штанги насосные, штоки полированные, муфты, центраторы, сальники устьевые и другое нефтепромысловое оборудование. Производство ОМЗ, соответствие ГОСТ.":
      "Pump rods, polished rods, couplings, centralizers, wellhead seals, and other oilfield equipment. Made by OMZ, GOST compliant.",
    "Сваи, металлоконструкции зданий и сооружений, ростверки, ёмкости, резервуары, опоры трубопроводов. Изготовление по чертежам заказчика.":
      "Piles, building metal structures, grade beams, tanks, reservoirs, pipeline supports. Made to customer drawings.",
    "Замки клиновые, винты стяжные, анкеры, унивилки, подкосы, стойки и другие строительные конструкции для опалубки. Собственное производство.":
      "Wedge locks, tie screws, anchors, univilkas, braces, props, and other construction structures for formwork. In-house production.",
    "Круглый калиброванный прокат различных диаметров. Высокая точность, соответствие стандартам качества.":
      "Round calibrated rolled stock of various diameters. High precision and quality standards compliance.",
    "Сертификаты и патенты Очёрского машиностроительного завода":
      "Certificates and patents of Ocher Machine-Building Plant",
    "История создания и развития Очёрского машиностроительного завода":
      "History of the establishment and development of Ocher Machine-Building Plant",
    "Новости и пресс-центр Очёрского машиностроительного завода — производство, партнёры, жизнь коллектива":
      "News and press center of Ocher Machine-Building Plant — production, partners, and team life",
    "Услуги АО «Очерский машиностроительный завод» — ремонт, резка, испытания, проектирование и доставка":
      "Services of JSC Ocher Machine-Building Plant — repair, cutting, testing, design, and delivery",
    "Доставка продукции АО «Очерский машиностроительный завод» — ж/д и автомобильным транспортом":
      "Delivery of products by JSC Ocher Machine-Building Plant — by rail and road",
    "Продукция Очёрского машиностроительного завода — нефтепромысловое оборудование, металлоконструкции, строительные конструкции, калиброванный прокат":
      "Products of Ocher Machine-Building Plant — oilfield equipment, metal structures, construction structures, calibrated rolled stock",
    "Вакансии Очёрского машиностроительного завода — присоединяйтесь к команде профессионалов":
      "Vacancies at Ocher Machine-Building Plant — join a team of professionals",
    "Закупки Очёрского машиностроительного завода — перечень материалов и потребностей":
      "Procurement at Ocher Machine-Building Plant — list of materials and needs",
    "Сведения об образовательной организации АО «Очерский машиностроительный завод»":
      "Educational organization information of JSC Ocher Machine-Building Plant",
    "Документы по охране труда АО «Очерский машиностроительный завод»":
      "Occupational safety documents of JSC Ocher Machine-Building Plant",
    "Горячая линия безопасности АО «Очерский машиностроительный завод» — сообщите о нарушениях анонимно":
      "Safety hotline of JSC Ocher Machine-Building Plant — report violations anonymously",
  };

  const zhMap = Object.fromEntries(
    Object.entries(enMap).map(([ruText, enText]) => [
      ruText,
      zhOverrides[ruText] ??
        zhOverrides[enText] ??
        translateRuToZh(ruText, enText),
    ]),
  );

  if (locale === "en") {
    const translated = enMap[str] ?? str;
    return translated
      .replace(
        /\{count, plural, one \{# товар\} few \{# товара\} many \{# товаров\} other \{# товаров\}\}/g,
        "{count, plural, one {# item} other {# items}}",
      )
      .replace(
        /\{count, plural, one \{# товар\} few \{# товара\} many \{# товаров\} other \{# товаров\}\} в корзине/g,
        "{count, plural, one {# item} other {# items}} in cart",
      )
      .replace(/ в корзине/g, " in cart");
  }

  const enText = enMap[str] ?? str;
  const base = zhMap[str] ?? translateRuToZh(str, enText);

  return base
      .replace(
        /\{count, plural, one \{# товар\} few \{# товара\} many \{# товаров\} other \{# товаров\}\}/g,
        "{count, plural, other {# 件商品}}",
      )
      .replace(
        /\{count, plural, one \{# товар\} few \{# товара\} many \{# товаров\} other \{# товаров\}\} в корзине/g,
        "购物车中有 {count, plural, other {# 件商品}}",
      )
      .replace(/ в корзине/g, " 在购物车中");
}

function countLeaves(obj) {
  let count = 0;
  for (const value of Object.values(obj)) {
    if (typeof value === "string") count += 1;
    else if (Array.isArray(value))
      count += value.filter((v) => typeof v === "string").length;
    else if (value && typeof value === "object") count += countLeaves(value);
  }
  return count;
}

const en = deepTranslate(ru, "en");
const zh = deepTranslate(ru, "zh");

for (const [locale, data] of [
  ["ru", ru],
  ["en", en],
  ["zh", zh],
]) {
  writeFileSync(
    join(messagesDir, `${locale}.json`),
    `${JSON.stringify(data, null, 2)}\n`,
    "utf8",
  );
}

const summary = {};
for (const ns of Object.keys(ru)) {
  summary[ns] = countLeaves(ru[ns]);
}

console.log(JSON.stringify(summary, null, 2));
console.log(`Total keys: ${Object.values(summary).reduce((a, b) => a + b, 0)}`);
