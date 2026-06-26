import path from "node:path";
import { fileURLToPath } from "node:url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import sharp from "sharp";
import { Categories } from "./src/collections/Categories";
import { Characteristics } from "./src/collections/Characteristics";
import { Documents } from "./src/collections/Documents";
import { Media } from "./src/collections/Media";
import { News } from "./src/collections/News";
import { NewsCategories } from "./src/collections/NewsCategories";
import { Orders } from "./src/collections/Orders";
import { Products } from "./src/collections/Products";
import { Users } from "./src/collections/Users";
import { Vacancies } from "./src/collections/Vacancies";
import { VacancyApplications } from "./src/collections/VacancyApplications";
import { VacancyCategories } from "./src/collections/VacancyCategories";
import { VacancyTypes } from "./src/collections/VacancyTypes";
import { Services } from "./src/collections/Services";
import { WorkshopEquipment } from "./src/collections/WorkshopEquipment";
import { AboutPage } from "./src/globals/AboutPage";
import { CertificatesPage } from "./src/globals/CertificatesPage";
import { EducationDisclosure } from "./src/globals/EducationDisclosure";
import { HomePage } from "./src/globals/HomePage";
import { LaborProtection } from "./src/globals/LaborProtection";
import { Procurement } from "./src/globals/Procurement";
import { ServicesPage } from "./src/globals/ServicesPage";
import { SiteContacts } from "./src/globals/SiteContacts";
import {
  WorkshopBuildingStructures,
  WorkshopMetalStructures,
  WorkshopOilfieldEquipment,
} from "./src/globals/workshops";
import { payloadLocalization } from "./src/i18n/locales";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  editor: lexicalEditor(),
  localization: payloadLocalization,
  collections: [
    Users,
    Media,
    Documents,
    Categories,
    Characteristics,
    Products,
    Orders,
    VacancyTypes,
    VacancyCategories,
    Vacancies,
    VacancyApplications,
    NewsCategories,
    News,
    WorkshopEquipment,
    Services,
  ],
  globals: [
    SiteContacts,
    LaborProtection,
    CertificatesPage,
    EducationDisclosure,
    Procurement,
    ServicesPage,
    AboutPage,
    HomePage,
    WorkshopMetalStructures,
    WorkshopOilfieldEquipment,
    WorkshopBuildingStructures,
  ],
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "src/payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || "",
    },
    migrationDir: path.resolve(dirname, "src/migrations"),
    push: true,
  }),
  sharp,
});
