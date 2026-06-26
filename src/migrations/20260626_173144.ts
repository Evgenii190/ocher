import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('ru', 'en', 'zh');
  CREATE TYPE "public"."enum_characteristics_type" AS ENUM('number', 'text');
  CREATE TYPE "public"."enum_characteristics_unit" AS ENUM('none', 'mm', 'cm', 'm', 'kg', 't');
  CREATE TYPE "public"."enum_products_spec_tables_rows_kind" AS ENUM('data', 'wide', 'section');
  CREATE TYPE "public"."enum_products_availability" AS ENUM('inStock', 'onOrder');
  CREATE TYPE "public"."enum_orders_payment_method" AS ENUM('cardOffice', 'cashStore');
  CREATE TYPE "public"."enum_orders_status" AS ENUM('new', 'processing', 'done', 'cancelled');
  CREATE TYPE "public"."enum_vacancy_applications_status" AS ENUM('new', 'viewed', 'contacted', 'rejected');
  CREATE TYPE "public"."enum_workshop_equipment_workshop" AS ENUM('metal-structures', 'oilfield-equipment', 'building-structures');
  CREATE TYPE "public"."enum_education_disclosure_entries_buttons_variant" AS ENUM('filled', 'outline');
  CREATE TYPE "public"."enum_education_disclosure_entries_kind" AS ENUM('section', 'row');
  CREATE TYPE "public"."enum_education_disclosure_entries_title_style" AS ENUM('default', 'compact');
  CREATE TYPE "public"."enum_education_disclosure_entries_info_type" AS ENUM('text', 'link', 'buttons');
  CREATE TYPE "public"."enum_procurement_entries_kind" AS ENUM('group', 'row');
  CREATE TYPE "public"."enum_workshop_metal_structures_section_order_section" AS ENUM('about', 'stock', 'equipment', 'advantages');
  CREATE TYPE "public"."enum_workshop_oilfield_equipment_section_order_section" AS ENUM('about', 'stock', 'equipment', 'advantages');
  CREATE TYPE "public"."enum_workshop_building_structures_section_order_section" AS ENUM('about', 'stock', 'equipment', 'advantages');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "media_locales" (
  	"alt" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "documents_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"parent_id" integer,
  	"image_id" integer,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "categories_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "characteristics" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"type" "enum_characteristics_type" DEFAULT 'text' NOT NULL,
  	"unit" "enum_characteristics_unit" DEFAULT 'none',
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "characteristics_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "products_documents" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"file_id" integer NOT NULL
  );
  
  CREATE TABLE "products_documents_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "products_characteristics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"characteristic_id" integer NOT NULL,
  	"value_number" numeric
  );
  
  CREATE TABLE "products_characteristics_locales" (
  	"value_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "products_spec_tables_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "products_spec_tables_columns_locales" (
  	"header" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "products_spec_tables_rows_cells_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "products_spec_tables_rows_cells_values_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "products_spec_tables_rows_cells" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "products_spec_tables_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kind" "enum_products_spec_tables_rows_kind" DEFAULT 'data' NOT NULL,
  	"highlight" boolean DEFAULT false,
  	"accent" boolean DEFAULT false
  );
  
  CREATE TABLE "products_spec_tables_rows_locales" (
  	"label" varchar,
  	"wide_value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "products_spec_tables" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "products_spec_tables_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "products" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"category_id" integer NOT NULL,
  	"availability" "enum_products_availability" DEFAULT 'inStock' NOT NULL,
  	"price" numeric,
  	"discount_percent" numeric DEFAULT 0,
  	"image_id" integer,
  	"popularity" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "products_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "products_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "orders_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"product_id" varchar,
  	"title" varchar NOT NULL,
  	"price" numeric,
  	"discount_percent" numeric DEFAULT 0,
  	"quantity" numeric DEFAULT 1 NOT NULL
  );
  
  CREATE TABLE "orders" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"phone" varchar NOT NULL,
  	"address" varchar,
  	"comment" varchar,
  	"payment_method" "enum_orders_payment_method" NOT NULL,
  	"status" "enum_orders_status" DEFAULT 'new',
  	"subtotal" numeric,
  	"discount_total" numeric,
  	"total" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "vacancy_types" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "vacancy_types_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "vacancy_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"type_id" integer NOT NULL,
  	"salary_from" numeric,
  	"image_id" integer,
  	"published_at" timestamp(3) with time zone,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "vacancy_categories_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "vacancies" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"category_id" integer NOT NULL,
  	"type_id" integer NOT NULL,
  	"salary_from" numeric,
  	"published_at" timestamp(3) with time zone,
  	"is_active" boolean DEFAULT true,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "vacancies_locales" (
  	"title" varchar NOT NULL,
  	"subtitle" varchar,
  	"description" varchar,
  	"salary_text" varchar,
  	"schedule" varchar,
  	"experience" varchar,
  	"location" varchar,
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "vacancy_applications" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"vacancy_id" integer NOT NULL,
  	"vacancy_title" varchar NOT NULL,
  	"category_title" varchar,
  	"applicant_name" varchar NOT NULL,
  	"phone" varchar NOT NULL,
  	"about" varchar NOT NULL,
  	"resume_id" integer,
  	"status" "enum_vacancy_applications_status" DEFAULT 'new',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "news_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "news_categories_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "news" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"image_id" integer,
  	"category_id" integer NOT NULL,
  	"published_at" timestamp(3) with time zone,
  	"is_active" boolean DEFAULT true,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "news_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "workshop_equipment_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "workshop_equipment_features_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "workshop_equipment_specs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "workshop_equipment_specs_locales" (
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "workshop_equipment" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"workshop" "enum_workshop_equipment_workshop" DEFAULT 'metal-structures' NOT NULL,
  	"image_id" integer NOT NULL,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "workshop_equipment_locales" (
  	"title" varchar NOT NULL,
  	"title_full" varchar,
  	"description" varchar NOT NULL,
  	"description_long" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "services_specs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "services_specs_locales" (
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_advantages" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "services_advantages_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"image_id" integer NOT NULL,
  	"hero_image_id" integer,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "services_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"hero_title" varchar,
  	"hero_description" varchar,
  	"page_content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"documents_id" integer,
  	"categories_id" integer,
  	"characteristics_id" integer,
  	"products_id" integer,
  	"orders_id" integer,
  	"vacancy_types_id" integer,
  	"vacancy_categories_id" integer,
  	"vacancies_id" integer,
  	"vacancy_applications_id" integer,
  	"news_categories_id" integer,
  	"news_id" integer,
  	"workshop_equipment_id" integer,
  	"services_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_contacts_offices" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"phone" varchar NOT NULL
  );
  
  CREATE TABLE "site_contacts_offices_locales" (
  	"city" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "site_contacts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"header_phone" varchar NOT NULL,
  	"header_email" varchar NOT NULL,
  	"hotline_phone" varchar NOT NULL,
  	"hotline_email" varchar NOT NULL,
  	"general_email" varchar NOT NULL,
  	"commercial_email" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_contacts_locales" (
  	"working_hours" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "labor_protection_documents" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"file_id" integer NOT NULL,
  	"order" numeric DEFAULT 0
  );
  
  CREATE TABLE "labor_protection" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "education_disclosure_entries_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "education_disclosure_entries_lines_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "education_disclosure_entries_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_education_disclosure_entries_buttons_variant" DEFAULT 'outline',
  	"file_id" integer
  );
  
  CREATE TABLE "education_disclosure_entries_buttons_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "education_disclosure_entries" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kind" "enum_education_disclosure_entries_kind" DEFAULT 'row' NOT NULL,
  	"title_style" "enum_education_disclosure_entries_title_style" DEFAULT 'default',
  	"info_type" "enum_education_disclosure_entries_info_type" DEFAULT 'text',
  	"file_id" integer
  );
  
  CREATE TABLE "education_disclosure_entries_locales" (
  	"section_title" varchar,
  	"code" varchar,
  	"name" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "education_disclosure" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "education_disclosure_locales" (
  	"page_title" varchar DEFAULT 'Сведения об образовательной организации' NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "procurement_entries_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "procurement_entries_items_locales" (
  	"name" varchar,
  	"quantity" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "procurement_entries" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kind" "enum_procurement_entries_kind" DEFAULT 'row' NOT NULL
  );
  
  CREATE TABLE "procurement_entries_locales" (
  	"group_title" varchar,
  	"name" varchar,
  	"quantity" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "procurement" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "procurement_locales" (
  	"page_title" varchar DEFAULT 'Закупки' NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "services_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "services_page_locales" (
  	"page_title" varchar DEFAULT 'Услуги' NOT NULL,
  	"cards_section_title" varchar DEFAULT 'Услуги' NOT NULL,
  	"bottom_content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "home_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_page_locales" (
  	"about_content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "workshop_metal_structures_section_order" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section" "enum_workshop_metal_structures_section_order_section" NOT NULL
  );
  
  CREATE TABLE "workshop_metal_structures_stock_section_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "workshop_metal_structures_stock_section_items_locales" (
  	"title" varchar NOT NULL,
  	"value" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "workshop_metal_structures_advantage_blocks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "workshop_metal_structures_advantage_blocks_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "workshop_metal_structures" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_background_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "workshop_metal_structures_locales" (
  	"hero_description" varchar,
  	"about_content" jsonb,
  	"stock_section_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "workshop_oilfield_equipment_section_order" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section" "enum_workshop_oilfield_equipment_section_order_section" NOT NULL
  );
  
  CREATE TABLE "workshop_oilfield_equipment_stock_section_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "workshop_oilfield_equipment_stock_section_items_locales" (
  	"title" varchar NOT NULL,
  	"value" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "workshop_oilfield_equipment_advantage_blocks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "workshop_oilfield_equipment_advantage_blocks_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "workshop_oilfield_equipment" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_background_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "workshop_oilfield_equipment_locales" (
  	"hero_description" varchar,
  	"about_content" jsonb,
  	"stock_section_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "workshop_building_structures_section_order" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section" "enum_workshop_building_structures_section_order_section" NOT NULL
  );
  
  CREATE TABLE "workshop_building_structures_stock_section_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "workshop_building_structures_stock_section_items_locales" (
  	"title" varchar NOT NULL,
  	"value" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "workshop_building_structures_advantage_blocks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "workshop_building_structures_advantage_blocks_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "workshop_building_structures" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_background_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "workshop_building_structures_locales" (
  	"hero_description" varchar,
  	"about_content" jsonb,
  	"stock_section_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "documents_locales" ADD CONSTRAINT "documents_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories" ADD CONSTRAINT "categories_parent_id_categories_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "categories" ADD CONSTRAINT "categories_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "categories_locales" ADD CONSTRAINT "categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "characteristics_locales" ADD CONSTRAINT "characteristics_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."characteristics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_documents" ADD CONSTRAINT "products_documents_file_id_documents_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."documents"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_documents" ADD CONSTRAINT "products_documents_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_documents_locales" ADD CONSTRAINT "products_documents_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_characteristics" ADD CONSTRAINT "products_characteristics_characteristic_id_characteristics_id_fk" FOREIGN KEY ("characteristic_id") REFERENCES "public"."characteristics"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_characteristics" ADD CONSTRAINT "products_characteristics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_characteristics_locales" ADD CONSTRAINT "products_characteristics_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_characteristics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_spec_tables_columns" ADD CONSTRAINT "products_spec_tables_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_spec_tables"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_spec_tables_columns_locales" ADD CONSTRAINT "products_spec_tables_columns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_spec_tables_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_spec_tables_rows_cells_values" ADD CONSTRAINT "products_spec_tables_rows_cells_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_spec_tables_rows_cells"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_spec_tables_rows_cells_values_locales" ADD CONSTRAINT "products_spec_tables_rows_cells_values_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_spec_tables_rows_cells_values"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_spec_tables_rows_cells" ADD CONSTRAINT "products_spec_tables_rows_cells_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_spec_tables_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_spec_tables_rows" ADD CONSTRAINT "products_spec_tables_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_spec_tables"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_spec_tables_rows_locales" ADD CONSTRAINT "products_spec_tables_rows_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_spec_tables_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_spec_tables" ADD CONSTRAINT "products_spec_tables_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_spec_tables_locales" ADD CONSTRAINT "products_spec_tables_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_spec_tables"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products" ADD CONSTRAINT "products_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products" ADD CONSTRAINT "products_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_locales" ADD CONSTRAINT "products_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "orders_items" ADD CONSTRAINT "orders_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vacancy_types_locales" ADD CONSTRAINT "vacancy_types_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vacancy_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vacancy_categories" ADD CONSTRAINT "vacancy_categories_type_id_vacancy_types_id_fk" FOREIGN KEY ("type_id") REFERENCES "public"."vacancy_types"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "vacancy_categories" ADD CONSTRAINT "vacancy_categories_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "vacancy_categories_locales" ADD CONSTRAINT "vacancy_categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vacancy_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vacancies" ADD CONSTRAINT "vacancies_category_id_vacancy_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."vacancy_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "vacancies" ADD CONSTRAINT "vacancies_type_id_vacancy_types_id_fk" FOREIGN KEY ("type_id") REFERENCES "public"."vacancy_types"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "vacancies_locales" ADD CONSTRAINT "vacancies_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vacancies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vacancy_applications" ADD CONSTRAINT "vacancy_applications_vacancy_id_vacancies_id_fk" FOREIGN KEY ("vacancy_id") REFERENCES "public"."vacancies"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "vacancy_applications" ADD CONSTRAINT "vacancy_applications_resume_id_documents_id_fk" FOREIGN KEY ("resume_id") REFERENCES "public"."documents"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news_categories_locales" ADD CONSTRAINT "news_categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news" ADD CONSTRAINT "news_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news" ADD CONSTRAINT "news_category_id_news_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."news_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news_locales" ADD CONSTRAINT "news_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "workshop_equipment_features" ADD CONSTRAINT "workshop_equipment_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."workshop_equipment"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "workshop_equipment_features_locales" ADD CONSTRAINT "workshop_equipment_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."workshop_equipment_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "workshop_equipment_specs" ADD CONSTRAINT "workshop_equipment_specs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."workshop_equipment"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "workshop_equipment_specs_locales" ADD CONSTRAINT "workshop_equipment_specs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."workshop_equipment_specs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "workshop_equipment" ADD CONSTRAINT "workshop_equipment_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "workshop_equipment_locales" ADD CONSTRAINT "workshop_equipment_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."workshop_equipment"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_specs" ADD CONSTRAINT "services_specs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_specs_locales" ADD CONSTRAINT "services_specs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_specs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_advantages" ADD CONSTRAINT "services_advantages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_advantages_locales" ADD CONSTRAINT "services_advantages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_advantages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_locales" ADD CONSTRAINT "services_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_documents_fk" FOREIGN KEY ("documents_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_characteristics_fk" FOREIGN KEY ("characteristics_id") REFERENCES "public"."characteristics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_orders_fk" FOREIGN KEY ("orders_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_vacancy_types_fk" FOREIGN KEY ("vacancy_types_id") REFERENCES "public"."vacancy_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_vacancy_categories_fk" FOREIGN KEY ("vacancy_categories_id") REFERENCES "public"."vacancy_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_vacancies_fk" FOREIGN KEY ("vacancies_id") REFERENCES "public"."vacancies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_vacancy_applications_fk" FOREIGN KEY ("vacancy_applications_id") REFERENCES "public"."vacancy_applications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_news_categories_fk" FOREIGN KEY ("news_categories_id") REFERENCES "public"."news_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_news_fk" FOREIGN KEY ("news_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_workshop_equipment_fk" FOREIGN KEY ("workshop_equipment_id") REFERENCES "public"."workshop_equipment"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_contacts_offices" ADD CONSTRAINT "site_contacts_offices_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_contacts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_contacts_offices_locales" ADD CONSTRAINT "site_contacts_offices_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_contacts_offices"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_contacts_locales" ADD CONSTRAINT "site_contacts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_contacts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "labor_protection_documents" ADD CONSTRAINT "labor_protection_documents_file_id_documents_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."documents"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "labor_protection_documents" ADD CONSTRAINT "labor_protection_documents_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."labor_protection"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "education_disclosure_entries_lines" ADD CONSTRAINT "education_disclosure_entries_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."education_disclosure_entries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "education_disclosure_entries_lines_locales" ADD CONSTRAINT "education_disclosure_entries_lines_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."education_disclosure_entries_lines"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "education_disclosure_entries_buttons" ADD CONSTRAINT "education_disclosure_entries_buttons_file_id_documents_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."documents"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "education_disclosure_entries_buttons" ADD CONSTRAINT "education_disclosure_entries_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."education_disclosure_entries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "education_disclosure_entries_buttons_locales" ADD CONSTRAINT "education_disclosure_entries_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."education_disclosure_entries_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "education_disclosure_entries" ADD CONSTRAINT "education_disclosure_entries_file_id_documents_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."documents"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "education_disclosure_entries" ADD CONSTRAINT "education_disclosure_entries_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."education_disclosure"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "education_disclosure_entries_locales" ADD CONSTRAINT "education_disclosure_entries_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."education_disclosure_entries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "education_disclosure_locales" ADD CONSTRAINT "education_disclosure_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."education_disclosure"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "procurement_entries_items" ADD CONSTRAINT "procurement_entries_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."procurement_entries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "procurement_entries_items_locales" ADD CONSTRAINT "procurement_entries_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."procurement_entries_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "procurement_entries" ADD CONSTRAINT "procurement_entries_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."procurement"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "procurement_entries_locales" ADD CONSTRAINT "procurement_entries_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."procurement_entries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "procurement_locales" ADD CONSTRAINT "procurement_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."procurement"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_page_locales" ADD CONSTRAINT "services_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_locales" ADD CONSTRAINT "home_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "workshop_metal_structures_section_order" ADD CONSTRAINT "workshop_metal_structures_section_order_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."workshop_metal_structures"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "workshop_metal_structures_stock_section_items" ADD CONSTRAINT "workshop_metal_structures_stock_section_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "workshop_metal_structures_stock_section_items" ADD CONSTRAINT "workshop_metal_structures_stock_section_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."workshop_metal_structures"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "workshop_metal_structures_stock_section_items_locales" ADD CONSTRAINT "workshop_metal_structures_stock_section_items_locales_par_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."workshop_metal_structures_stock_section_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "workshop_metal_structures_advantage_blocks" ADD CONSTRAINT "workshop_metal_structures_advantage_blocks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."workshop_metal_structures"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "workshop_metal_structures_advantage_blocks_locales" ADD CONSTRAINT "workshop_metal_structures_advantage_blocks_locales_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."workshop_metal_structures_advantage_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "workshop_metal_structures" ADD CONSTRAINT "workshop_metal_structures_hero_background_id_media_id_fk" FOREIGN KEY ("hero_background_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "workshop_metal_structures_locales" ADD CONSTRAINT "workshop_metal_structures_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."workshop_metal_structures"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "workshop_oilfield_equipment_section_order" ADD CONSTRAINT "workshop_oilfield_equipment_section_order_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."workshop_oilfield_equipment"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "workshop_oilfield_equipment_stock_section_items" ADD CONSTRAINT "workshop_oilfield_equipment_stock_section_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "workshop_oilfield_equipment_stock_section_items" ADD CONSTRAINT "workshop_oilfield_equipment_stock_section_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."workshop_oilfield_equipment"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "workshop_oilfield_equipment_stock_section_items_locales" ADD CONSTRAINT "workshop_oilfield_equipment_stock_section_items_locales_p_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."workshop_oilfield_equipment_stock_section_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "workshop_oilfield_equipment_advantage_blocks" ADD CONSTRAINT "workshop_oilfield_equipment_advantage_blocks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."workshop_oilfield_equipment"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "workshop_oilfield_equipment_advantage_blocks_locales" ADD CONSTRAINT "workshop_oilfield_equipment_advantage_blocks_locales_pare_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."workshop_oilfield_equipment_advantage_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "workshop_oilfield_equipment" ADD CONSTRAINT "workshop_oilfield_equipment_hero_background_id_media_id_fk" FOREIGN KEY ("hero_background_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "workshop_oilfield_equipment_locales" ADD CONSTRAINT "workshop_oilfield_equipment_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."workshop_oilfield_equipment"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "workshop_building_structures_section_order" ADD CONSTRAINT "workshop_building_structures_section_order_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."workshop_building_structures"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "workshop_building_structures_stock_section_items" ADD CONSTRAINT "workshop_building_structures_stock_section_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "workshop_building_structures_stock_section_items" ADD CONSTRAINT "workshop_building_structures_stock_section_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."workshop_building_structures"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "workshop_building_structures_stock_section_items_locales" ADD CONSTRAINT "workshop_building_structures_stock_section_items_locales__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."workshop_building_structures_stock_section_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "workshop_building_structures_advantage_blocks" ADD CONSTRAINT "workshop_building_structures_advantage_blocks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."workshop_building_structures"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "workshop_building_structures_advantage_blocks_locales" ADD CONSTRAINT "workshop_building_structures_advantage_blocks_locales_par_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."workshop_building_structures_advantage_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "workshop_building_structures" ADD CONSTRAINT "workshop_building_structures_hero_background_id_media_id_fk" FOREIGN KEY ("hero_background_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "workshop_building_structures_locales" ADD CONSTRAINT "workshop_building_structures_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."workshop_building_structures"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE UNIQUE INDEX "media_locales_locale_parent_id_unique" ON "media_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "documents_updated_at_idx" ON "documents" USING btree ("updated_at");
  CREATE INDEX "documents_created_at_idx" ON "documents" USING btree ("created_at");
  CREATE UNIQUE INDEX "documents_filename_idx" ON "documents" USING btree ("filename");
  CREATE UNIQUE INDEX "documents_locales_locale_parent_id_unique" ON "documents_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");
  CREATE INDEX "categories_parent_idx" ON "categories" USING btree ("parent_id");
  CREATE INDEX "categories_image_idx" ON "categories" USING btree ("image_id");
  CREATE INDEX "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "categories" USING btree ("created_at");
  CREATE UNIQUE INDEX "categories_locales_locale_parent_id_unique" ON "categories_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "characteristics_slug_idx" ON "characteristics" USING btree ("slug");
  CREATE INDEX "characteristics_updated_at_idx" ON "characteristics" USING btree ("updated_at");
  CREATE INDEX "characteristics_created_at_idx" ON "characteristics" USING btree ("created_at");
  CREATE UNIQUE INDEX "characteristics_locales_locale_parent_id_unique" ON "characteristics_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "products_documents_order_idx" ON "products_documents" USING btree ("_order");
  CREATE INDEX "products_documents_parent_id_idx" ON "products_documents" USING btree ("_parent_id");
  CREATE INDEX "products_documents_file_idx" ON "products_documents" USING btree ("file_id");
  CREATE UNIQUE INDEX "products_documents_locales_locale_parent_id_unique" ON "products_documents_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "products_characteristics_order_idx" ON "products_characteristics" USING btree ("_order");
  CREATE INDEX "products_characteristics_parent_id_idx" ON "products_characteristics" USING btree ("_parent_id");
  CREATE INDEX "products_characteristics_characteristic_idx" ON "products_characteristics" USING btree ("characteristic_id");
  CREATE UNIQUE INDEX "products_characteristics_locales_locale_parent_id_unique" ON "products_characteristics_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "products_spec_tables_columns_order_idx" ON "products_spec_tables_columns" USING btree ("_order");
  CREATE INDEX "products_spec_tables_columns_parent_id_idx" ON "products_spec_tables_columns" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "products_spec_tables_columns_locales_locale_parent_id_unique" ON "products_spec_tables_columns_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "products_spec_tables_rows_cells_values_order_idx" ON "products_spec_tables_rows_cells_values" USING btree ("_order");
  CREATE INDEX "products_spec_tables_rows_cells_values_parent_id_idx" ON "products_spec_tables_rows_cells_values" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "products_spec_tables_rows_cells_values_locales_locale_parent" ON "products_spec_tables_rows_cells_values_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "products_spec_tables_rows_cells_order_idx" ON "products_spec_tables_rows_cells" USING btree ("_order");
  CREATE INDEX "products_spec_tables_rows_cells_parent_id_idx" ON "products_spec_tables_rows_cells" USING btree ("_parent_id");
  CREATE INDEX "products_spec_tables_rows_order_idx" ON "products_spec_tables_rows" USING btree ("_order");
  CREATE INDEX "products_spec_tables_rows_parent_id_idx" ON "products_spec_tables_rows" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "products_spec_tables_rows_locales_locale_parent_id_unique" ON "products_spec_tables_rows_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "products_spec_tables_order_idx" ON "products_spec_tables" USING btree ("_order");
  CREATE INDEX "products_spec_tables_parent_id_idx" ON "products_spec_tables" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "products_spec_tables_locales_locale_parent_id_unique" ON "products_spec_tables_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "products_slug_idx" ON "products" USING btree ("slug");
  CREATE INDEX "products_category_idx" ON "products" USING btree ("category_id");
  CREATE INDEX "products_image_idx" ON "products" USING btree ("image_id");
  CREATE INDEX "products_updated_at_idx" ON "products" USING btree ("updated_at");
  CREATE INDEX "products_created_at_idx" ON "products" USING btree ("created_at");
  CREATE UNIQUE INDEX "products_locales_locale_parent_id_unique" ON "products_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "products_rels_order_idx" ON "products_rels" USING btree ("order");
  CREATE INDEX "products_rels_parent_idx" ON "products_rels" USING btree ("parent_id");
  CREATE INDEX "products_rels_path_idx" ON "products_rels" USING btree ("path");
  CREATE INDEX "products_rels_media_id_idx" ON "products_rels" USING btree ("media_id");
  CREATE INDEX "orders_items_order_idx" ON "orders_items" USING btree ("_order");
  CREATE INDEX "orders_items_parent_id_idx" ON "orders_items" USING btree ("_parent_id");
  CREATE INDEX "orders_updated_at_idx" ON "orders" USING btree ("updated_at");
  CREATE INDEX "orders_created_at_idx" ON "orders" USING btree ("created_at");
  CREATE UNIQUE INDEX "vacancy_types_slug_idx" ON "vacancy_types" USING btree ("slug");
  CREATE INDEX "vacancy_types_updated_at_idx" ON "vacancy_types" USING btree ("updated_at");
  CREATE INDEX "vacancy_types_created_at_idx" ON "vacancy_types" USING btree ("created_at");
  CREATE UNIQUE INDEX "vacancy_types_locales_locale_parent_id_unique" ON "vacancy_types_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "vacancy_categories_slug_idx" ON "vacancy_categories" USING btree ("slug");
  CREATE INDEX "vacancy_categories_type_idx" ON "vacancy_categories" USING btree ("type_id");
  CREATE INDEX "vacancy_categories_image_idx" ON "vacancy_categories" USING btree ("image_id");
  CREATE INDEX "vacancy_categories_updated_at_idx" ON "vacancy_categories" USING btree ("updated_at");
  CREATE INDEX "vacancy_categories_created_at_idx" ON "vacancy_categories" USING btree ("created_at");
  CREATE UNIQUE INDEX "vacancy_categories_locales_locale_parent_id_unique" ON "vacancy_categories_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "vacancies_slug_idx" ON "vacancies" USING btree ("slug");
  CREATE INDEX "vacancies_category_idx" ON "vacancies" USING btree ("category_id");
  CREATE INDEX "vacancies_type_idx" ON "vacancies" USING btree ("type_id");
  CREATE INDEX "vacancies_updated_at_idx" ON "vacancies" USING btree ("updated_at");
  CREATE INDEX "vacancies_created_at_idx" ON "vacancies" USING btree ("created_at");
  CREATE UNIQUE INDEX "vacancies_locales_locale_parent_id_unique" ON "vacancies_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "vacancy_applications_vacancy_idx" ON "vacancy_applications" USING btree ("vacancy_id");
  CREATE INDEX "vacancy_applications_resume_idx" ON "vacancy_applications" USING btree ("resume_id");
  CREATE INDEX "vacancy_applications_updated_at_idx" ON "vacancy_applications" USING btree ("updated_at");
  CREATE INDEX "vacancy_applications_created_at_idx" ON "vacancy_applications" USING btree ("created_at");
  CREATE UNIQUE INDEX "news_categories_slug_idx" ON "news_categories" USING btree ("slug");
  CREATE INDEX "news_categories_updated_at_idx" ON "news_categories" USING btree ("updated_at");
  CREATE INDEX "news_categories_created_at_idx" ON "news_categories" USING btree ("created_at");
  CREATE UNIQUE INDEX "news_categories_locales_locale_parent_id_unique" ON "news_categories_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "news_slug_idx" ON "news" USING btree ("slug");
  CREATE INDEX "news_image_idx" ON "news" USING btree ("image_id");
  CREATE INDEX "news_category_idx" ON "news" USING btree ("category_id");
  CREATE INDEX "news_updated_at_idx" ON "news" USING btree ("updated_at");
  CREATE INDEX "news_created_at_idx" ON "news" USING btree ("created_at");
  CREATE UNIQUE INDEX "news_locales_locale_parent_id_unique" ON "news_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "workshop_equipment_features_order_idx" ON "workshop_equipment_features" USING btree ("_order");
  CREATE INDEX "workshop_equipment_features_parent_id_idx" ON "workshop_equipment_features" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "workshop_equipment_features_locales_locale_parent_id_unique" ON "workshop_equipment_features_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "workshop_equipment_specs_order_idx" ON "workshop_equipment_specs" USING btree ("_order");
  CREATE INDEX "workshop_equipment_specs_parent_id_idx" ON "workshop_equipment_specs" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "workshop_equipment_specs_locales_locale_parent_id_unique" ON "workshop_equipment_specs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "workshop_equipment_image_idx" ON "workshop_equipment" USING btree ("image_id");
  CREATE INDEX "workshop_equipment_updated_at_idx" ON "workshop_equipment" USING btree ("updated_at");
  CREATE INDEX "workshop_equipment_created_at_idx" ON "workshop_equipment" USING btree ("created_at");
  CREATE UNIQUE INDEX "workshop_equipment_locales_locale_parent_id_unique" ON "workshop_equipment_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_specs_order_idx" ON "services_specs" USING btree ("_order");
  CREATE INDEX "services_specs_parent_id_idx" ON "services_specs" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "services_specs_locales_locale_parent_id_unique" ON "services_specs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_advantages_order_idx" ON "services_advantages" USING btree ("_order");
  CREATE INDEX "services_advantages_parent_id_idx" ON "services_advantages" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "services_advantages_locales_locale_parent_id_unique" ON "services_advantages_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "services_slug_idx" ON "services" USING btree ("slug");
  CREATE INDEX "services_image_idx" ON "services" USING btree ("image_id");
  CREATE INDEX "services_hero_image_idx" ON "services" USING btree ("hero_image_id");
  CREATE INDEX "services_updated_at_idx" ON "services" USING btree ("updated_at");
  CREATE INDEX "services_created_at_idx" ON "services" USING btree ("created_at");
  CREATE UNIQUE INDEX "services_locales_locale_parent_id_unique" ON "services_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_documents_id_idx" ON "payload_locked_documents_rels" USING btree ("documents_id");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX "payload_locked_documents_rels_characteristics_id_idx" ON "payload_locked_documents_rels" USING btree ("characteristics_id");
  CREATE INDEX "payload_locked_documents_rels_products_id_idx" ON "payload_locked_documents_rels" USING btree ("products_id");
  CREATE INDEX "payload_locked_documents_rels_orders_id_idx" ON "payload_locked_documents_rels" USING btree ("orders_id");
  CREATE INDEX "payload_locked_documents_rels_vacancy_types_id_idx" ON "payload_locked_documents_rels" USING btree ("vacancy_types_id");
  CREATE INDEX "payload_locked_documents_rels_vacancy_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("vacancy_categories_id");
  CREATE INDEX "payload_locked_documents_rels_vacancies_id_idx" ON "payload_locked_documents_rels" USING btree ("vacancies_id");
  CREATE INDEX "payload_locked_documents_rels_vacancy_applications_id_idx" ON "payload_locked_documents_rels" USING btree ("vacancy_applications_id");
  CREATE INDEX "payload_locked_documents_rels_news_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("news_categories_id");
  CREATE INDEX "payload_locked_documents_rels_news_id_idx" ON "payload_locked_documents_rels" USING btree ("news_id");
  CREATE INDEX "payload_locked_documents_rels_workshop_equipment_id_idx" ON "payload_locked_documents_rels" USING btree ("workshop_equipment_id");
  CREATE INDEX "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_contacts_offices_order_idx" ON "site_contacts_offices" USING btree ("_order");
  CREATE INDEX "site_contacts_offices_parent_id_idx" ON "site_contacts_offices" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "site_contacts_offices_locales_locale_parent_id_unique" ON "site_contacts_offices_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "site_contacts_locales_locale_parent_id_unique" ON "site_contacts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "labor_protection_documents_order_idx" ON "labor_protection_documents" USING btree ("_order");
  CREATE INDEX "labor_protection_documents_parent_id_idx" ON "labor_protection_documents" USING btree ("_parent_id");
  CREATE INDEX "labor_protection_documents_file_idx" ON "labor_protection_documents" USING btree ("file_id");
  CREATE INDEX "education_disclosure_entries_lines_order_idx" ON "education_disclosure_entries_lines" USING btree ("_order");
  CREATE INDEX "education_disclosure_entries_lines_parent_id_idx" ON "education_disclosure_entries_lines" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "education_disclosure_entries_lines_locales_locale_parent_id_" ON "education_disclosure_entries_lines_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "education_disclosure_entries_buttons_order_idx" ON "education_disclosure_entries_buttons" USING btree ("_order");
  CREATE INDEX "education_disclosure_entries_buttons_parent_id_idx" ON "education_disclosure_entries_buttons" USING btree ("_parent_id");
  CREATE INDEX "education_disclosure_entries_buttons_file_idx" ON "education_disclosure_entries_buttons" USING btree ("file_id");
  CREATE UNIQUE INDEX "education_disclosure_entries_buttons_locales_locale_parent_i" ON "education_disclosure_entries_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "education_disclosure_entries_order_idx" ON "education_disclosure_entries" USING btree ("_order");
  CREATE INDEX "education_disclosure_entries_parent_id_idx" ON "education_disclosure_entries" USING btree ("_parent_id");
  CREATE INDEX "education_disclosure_entries_file_idx" ON "education_disclosure_entries" USING btree ("file_id");
  CREATE UNIQUE INDEX "education_disclosure_entries_locales_locale_parent_id_unique" ON "education_disclosure_entries_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "education_disclosure_locales_locale_parent_id_unique" ON "education_disclosure_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "procurement_entries_items_order_idx" ON "procurement_entries_items" USING btree ("_order");
  CREATE INDEX "procurement_entries_items_parent_id_idx" ON "procurement_entries_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "procurement_entries_items_locales_locale_parent_id_unique" ON "procurement_entries_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "procurement_entries_order_idx" ON "procurement_entries" USING btree ("_order");
  CREATE INDEX "procurement_entries_parent_id_idx" ON "procurement_entries" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "procurement_entries_locales_locale_parent_id_unique" ON "procurement_entries_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "procurement_locales_locale_parent_id_unique" ON "procurement_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "services_page_locales_locale_parent_id_unique" ON "services_page_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "home_page_locales_locale_parent_id_unique" ON "home_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "workshop_metal_structures_section_order_order_idx" ON "workshop_metal_structures_section_order" USING btree ("_order");
  CREATE INDEX "workshop_metal_structures_section_order_parent_id_idx" ON "workshop_metal_structures_section_order" USING btree ("_parent_id");
  CREATE INDEX "workshop_metal_structures_stock_section_items_order_idx" ON "workshop_metal_structures_stock_section_items" USING btree ("_order");
  CREATE INDEX "workshop_metal_structures_stock_section_items_parent_id_idx" ON "workshop_metal_structures_stock_section_items" USING btree ("_parent_id");
  CREATE INDEX "workshop_metal_structures_stock_section_items_image_idx" ON "workshop_metal_structures_stock_section_items" USING btree ("image_id");
  CREATE UNIQUE INDEX "workshop_metal_structures_stock_section_items_locales_locale" ON "workshop_metal_structures_stock_section_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "workshop_metal_structures_advantage_blocks_order_idx" ON "workshop_metal_structures_advantage_blocks" USING btree ("_order");
  CREATE INDEX "workshop_metal_structures_advantage_blocks_parent_id_idx" ON "workshop_metal_structures_advantage_blocks" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "workshop_metal_structures_advantage_blocks_locales_locale_pa" ON "workshop_metal_structures_advantage_blocks_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "workshop_metal_structures_hero_background_idx" ON "workshop_metal_structures" USING btree ("hero_background_id");
  CREATE UNIQUE INDEX "workshop_metal_structures_locales_locale_parent_id_unique" ON "workshop_metal_structures_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "workshop_oilfield_equipment_section_order_order_idx" ON "workshop_oilfield_equipment_section_order" USING btree ("_order");
  CREATE INDEX "workshop_oilfield_equipment_section_order_parent_id_idx" ON "workshop_oilfield_equipment_section_order" USING btree ("_parent_id");
  CREATE INDEX "workshop_oilfield_equipment_stock_section_items_order_idx" ON "workshop_oilfield_equipment_stock_section_items" USING btree ("_order");
  CREATE INDEX "workshop_oilfield_equipment_stock_section_items_parent_id_idx" ON "workshop_oilfield_equipment_stock_section_items" USING btree ("_parent_id");
  CREATE INDEX "workshop_oilfield_equipment_stock_section_items_image_idx" ON "workshop_oilfield_equipment_stock_section_items" USING btree ("image_id");
  CREATE UNIQUE INDEX "workshop_oilfield_equipment_stock_section_items_locales_loca" ON "workshop_oilfield_equipment_stock_section_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "workshop_oilfield_equipment_advantage_blocks_order_idx" ON "workshop_oilfield_equipment_advantage_blocks" USING btree ("_order");
  CREATE INDEX "workshop_oilfield_equipment_advantage_blocks_parent_id_idx" ON "workshop_oilfield_equipment_advantage_blocks" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "workshop_oilfield_equipment_advantage_blocks_locales_locale_" ON "workshop_oilfield_equipment_advantage_blocks_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "workshop_oilfield_equipment_hero_background_idx" ON "workshop_oilfield_equipment" USING btree ("hero_background_id");
  CREATE UNIQUE INDEX "workshop_oilfield_equipment_locales_locale_parent_id_unique" ON "workshop_oilfield_equipment_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "workshop_building_structures_section_order_order_idx" ON "workshop_building_structures_section_order" USING btree ("_order");
  CREATE INDEX "workshop_building_structures_section_order_parent_id_idx" ON "workshop_building_structures_section_order" USING btree ("_parent_id");
  CREATE INDEX "workshop_building_structures_stock_section_items_order_idx" ON "workshop_building_structures_stock_section_items" USING btree ("_order");
  CREATE INDEX "workshop_building_structures_stock_section_items_parent_id_idx" ON "workshop_building_structures_stock_section_items" USING btree ("_parent_id");
  CREATE INDEX "workshop_building_structures_stock_section_items_image_idx" ON "workshop_building_structures_stock_section_items" USING btree ("image_id");
  CREATE UNIQUE INDEX "workshop_building_structures_stock_section_items_locales_loc" ON "workshop_building_structures_stock_section_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "workshop_building_structures_advantage_blocks_order_idx" ON "workshop_building_structures_advantage_blocks" USING btree ("_order");
  CREATE INDEX "workshop_building_structures_advantage_blocks_parent_id_idx" ON "workshop_building_structures_advantage_blocks" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "workshop_building_structures_advantage_blocks_locales_locale" ON "workshop_building_structures_advantage_blocks_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "workshop_building_structures_hero_background_idx" ON "workshop_building_structures" USING btree ("hero_background_id");
  CREATE UNIQUE INDEX "workshop_building_structures_locales_locale_parent_id_unique" ON "workshop_building_structures_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "media_locales" CASCADE;
  DROP TABLE "documents" CASCADE;
  DROP TABLE "documents_locales" CASCADE;
  DROP TABLE "categories" CASCADE;
  DROP TABLE "categories_locales" CASCADE;
  DROP TABLE "characteristics" CASCADE;
  DROP TABLE "characteristics_locales" CASCADE;
  DROP TABLE "products_documents" CASCADE;
  DROP TABLE "products_documents_locales" CASCADE;
  DROP TABLE "products_characteristics" CASCADE;
  DROP TABLE "products_characteristics_locales" CASCADE;
  DROP TABLE "products_spec_tables_columns" CASCADE;
  DROP TABLE "products_spec_tables_columns_locales" CASCADE;
  DROP TABLE "products_spec_tables_rows_cells_values" CASCADE;
  DROP TABLE "products_spec_tables_rows_cells_values_locales" CASCADE;
  DROP TABLE "products_spec_tables_rows_cells" CASCADE;
  DROP TABLE "products_spec_tables_rows" CASCADE;
  DROP TABLE "products_spec_tables_rows_locales" CASCADE;
  DROP TABLE "products_spec_tables" CASCADE;
  DROP TABLE "products_spec_tables_locales" CASCADE;
  DROP TABLE "products" CASCADE;
  DROP TABLE "products_locales" CASCADE;
  DROP TABLE "products_rels" CASCADE;
  DROP TABLE "orders_items" CASCADE;
  DROP TABLE "orders" CASCADE;
  DROP TABLE "vacancy_types" CASCADE;
  DROP TABLE "vacancy_types_locales" CASCADE;
  DROP TABLE "vacancy_categories" CASCADE;
  DROP TABLE "vacancy_categories_locales" CASCADE;
  DROP TABLE "vacancies" CASCADE;
  DROP TABLE "vacancies_locales" CASCADE;
  DROP TABLE "vacancy_applications" CASCADE;
  DROP TABLE "news_categories" CASCADE;
  DROP TABLE "news_categories_locales" CASCADE;
  DROP TABLE "news" CASCADE;
  DROP TABLE "news_locales" CASCADE;
  DROP TABLE "workshop_equipment_features" CASCADE;
  DROP TABLE "workshop_equipment_features_locales" CASCADE;
  DROP TABLE "workshop_equipment_specs" CASCADE;
  DROP TABLE "workshop_equipment_specs_locales" CASCADE;
  DROP TABLE "workshop_equipment" CASCADE;
  DROP TABLE "workshop_equipment_locales" CASCADE;
  DROP TABLE "services_specs" CASCADE;
  DROP TABLE "services_specs_locales" CASCADE;
  DROP TABLE "services_advantages" CASCADE;
  DROP TABLE "services_advantages_locales" CASCADE;
  DROP TABLE "services" CASCADE;
  DROP TABLE "services_locales" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_contacts_offices" CASCADE;
  DROP TABLE "site_contacts_offices_locales" CASCADE;
  DROP TABLE "site_contacts" CASCADE;
  DROP TABLE "site_contacts_locales" CASCADE;
  DROP TABLE "labor_protection_documents" CASCADE;
  DROP TABLE "labor_protection" CASCADE;
  DROP TABLE "education_disclosure_entries_lines" CASCADE;
  DROP TABLE "education_disclosure_entries_lines_locales" CASCADE;
  DROP TABLE "education_disclosure_entries_buttons" CASCADE;
  DROP TABLE "education_disclosure_entries_buttons_locales" CASCADE;
  DROP TABLE "education_disclosure_entries" CASCADE;
  DROP TABLE "education_disclosure_entries_locales" CASCADE;
  DROP TABLE "education_disclosure" CASCADE;
  DROP TABLE "education_disclosure_locales" CASCADE;
  DROP TABLE "procurement_entries_items" CASCADE;
  DROP TABLE "procurement_entries_items_locales" CASCADE;
  DROP TABLE "procurement_entries" CASCADE;
  DROP TABLE "procurement_entries_locales" CASCADE;
  DROP TABLE "procurement" CASCADE;
  DROP TABLE "procurement_locales" CASCADE;
  DROP TABLE "services_page" CASCADE;
  DROP TABLE "services_page_locales" CASCADE;
  DROP TABLE "home_page" CASCADE;
  DROP TABLE "home_page_locales" CASCADE;
  DROP TABLE "workshop_metal_structures_section_order" CASCADE;
  DROP TABLE "workshop_metal_structures_stock_section_items" CASCADE;
  DROP TABLE "workshop_metal_structures_stock_section_items_locales" CASCADE;
  DROP TABLE "workshop_metal_structures_advantage_blocks" CASCADE;
  DROP TABLE "workshop_metal_structures_advantage_blocks_locales" CASCADE;
  DROP TABLE "workshop_metal_structures" CASCADE;
  DROP TABLE "workshop_metal_structures_locales" CASCADE;
  DROP TABLE "workshop_oilfield_equipment_section_order" CASCADE;
  DROP TABLE "workshop_oilfield_equipment_stock_section_items" CASCADE;
  DROP TABLE "workshop_oilfield_equipment_stock_section_items_locales" CASCADE;
  DROP TABLE "workshop_oilfield_equipment_advantage_blocks" CASCADE;
  DROP TABLE "workshop_oilfield_equipment_advantage_blocks_locales" CASCADE;
  DROP TABLE "workshop_oilfield_equipment" CASCADE;
  DROP TABLE "workshop_oilfield_equipment_locales" CASCADE;
  DROP TABLE "workshop_building_structures_section_order" CASCADE;
  DROP TABLE "workshop_building_structures_stock_section_items" CASCADE;
  DROP TABLE "workshop_building_structures_stock_section_items_locales" CASCADE;
  DROP TABLE "workshop_building_structures_advantage_blocks" CASCADE;
  DROP TABLE "workshop_building_structures_advantage_blocks_locales" CASCADE;
  DROP TABLE "workshop_building_structures" CASCADE;
  DROP TABLE "workshop_building_structures_locales" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_characteristics_type";
  DROP TYPE "public"."enum_characteristics_unit";
  DROP TYPE "public"."enum_products_spec_tables_rows_kind";
  DROP TYPE "public"."enum_products_availability";
  DROP TYPE "public"."enum_orders_payment_method";
  DROP TYPE "public"."enum_orders_status";
  DROP TYPE "public"."enum_vacancy_applications_status";
  DROP TYPE "public"."enum_workshop_equipment_workshop";
  DROP TYPE "public"."enum_education_disclosure_entries_buttons_variant";
  DROP TYPE "public"."enum_education_disclosure_entries_kind";
  DROP TYPE "public"."enum_education_disclosure_entries_title_style";
  DROP TYPE "public"."enum_education_disclosure_entries_info_type";
  DROP TYPE "public"."enum_procurement_entries_kind";
  DROP TYPE "public"."enum_workshop_metal_structures_section_order_section";
  DROP TYPE "public"."enum_workshop_oilfield_equipment_section_order_section";
  DROP TYPE "public"."enum_workshop_building_structures_section_order_section";`)
}
