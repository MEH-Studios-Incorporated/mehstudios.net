import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_hero_slides_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_hero_slides_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_cards_cards_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_cards_cards_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_cards_cards_variant" AS ENUM('showcase', 'information');
  CREATE TYPE "public"."enum_pages_blocks_cards_cards_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_cards_arrangement" AS ENUM('row', 'grid');
  CREATE TYPE "public"."enum_pages_blocks_community_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_community_link_appearance" AS ENUM('default');
  CREATE TYPE "public"."enum_pages_blocks_archive_arrangement" AS ENUM('row', 'grid');
  CREATE TYPE "public"."enum__pages_v_version_hero_slides_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_version_hero_slides_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_cards_cards_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_cards_cards_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_cards_cards_variant" AS ENUM('showcase', 'information');
  CREATE TYPE "public"."enum__pages_v_blocks_cards_cards_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_cards_arrangement" AS ENUM('row', 'grid');
  CREATE TYPE "public"."enum__pages_v_blocks_community_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_community_link_appearance" AS ENUM('default');
  CREATE TYPE "public"."enum__pages_v_blocks_archive_arrangement" AS ENUM('row', 'grid');
  CREATE TYPE "public"."enum_pages_t_hero_slides_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_t_hero_slides_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_t_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_t_hero_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_t_blocks_cta_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_t_blocks_cta_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_t_blocks_cta_variant" AS ENUM('gradient', 'black', 'primary');
  CREATE TYPE "public"."enum_pages_t_blocks_cards_cards_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_t_blocks_cards_cards_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_t_blocks_cards_cards_variant" AS ENUM('showcase', 'information');
  CREATE TYPE "public"."enum_pages_t_blocks_cards_cards_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_t_blocks_cards_arrangement" AS ENUM('row', 'grid');
  CREATE TYPE "public"."enum_pages_t_blocks_community_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_t_blocks_community_link_appearance" AS ENUM('default');
  CREATE TYPE "public"."enum_pages_t_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum_pages_t_blocks_content_columns_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_t_blocks_content_columns_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_t_blocks_archive_arrangement" AS ENUM('row', 'grid');
  CREATE TYPE "public"."enum_pages_t_blocks_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum_pages_t_blocks_archive_relation_to" AS ENUM('posts');
  CREATE TYPE "public"."enum_pages_t_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact');
  CREATE TABLE "pages_hero_slides_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_hero_slides_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_hero_slides_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_blocks_cards_cards_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_cards_cards_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_cards_cards_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_blocks_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_cards_cards_variant" DEFAULT 'showcase',
  	"image_id" integer,
  	"title" varchar,
  	"tag" varchar,
  	"link_type" "enum_pages_blocks_cards_cards_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"rich_text" jsonb
  );
  
  CREATE TABLE "pages_blocks_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"arrangement" "enum_pages_blocks_cards_arrangement" DEFAULT 'row',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_community" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"body" jsonb,
  	"link_type" "enum_pages_blocks_community_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_community_link_appearance" DEFAULT 'default',
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_news_panel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"featured_eyebrow" varchar,
  	"featured_eyebrow_sub" varchar,
  	"featured_post_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_version_hero_slides_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_version_hero_slides_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_version_hero_slides_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cards_cards_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_cards_cards_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_cards_cards_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__pages_v_blocks_cards_cards_variant" DEFAULT 'showcase',
  	"image_id" integer,
  	"title" varchar,
  	"tag" varchar,
  	"link_type" "enum__pages_v_blocks_cards_cards_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"rich_text" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"arrangement" "enum__pages_v_blocks_cards_arrangement" DEFAULT 'row',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_community" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"body" jsonb,
  	"link_type" "enum__pages_v_blocks_community_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_community_link_appearance" DEFAULT 'default',
  	"image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_news_panel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"featured_eyebrow" varchar,
  	"featured_eyebrow_sub" varchar,
  	"featured_post_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_t_hero_slides_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_t_hero_slides_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_t_hero_slides_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_t_hero_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"title" varchar,
  	"subtitle" varchar
  );
  
  CREATE TABLE "pages_t_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_t_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_t_hero_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_t_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_t_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL,
  	"link_appearance" "enum_pages_t_blocks_cta_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_t_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_t_blocks_cta_variant" DEFAULT 'gradient',
  	"rich_text" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_t_blocks_cards_cards_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_t_blocks_cards_cards_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_t_blocks_cards_cards_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_t_blocks_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_t_blocks_cards_cards_variant" DEFAULT 'showcase',
  	"image_id" integer NOT NULL,
  	"title" varchar,
  	"tag" varchar,
  	"link_type" "enum_pages_t_blocks_cards_cards_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"rich_text" jsonb
  );
  
  CREATE TABLE "pages_t_blocks_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"arrangement" "enum_pages_t_blocks_cards_arrangement" DEFAULT 'row',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_t_blocks_community" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"body" jsonb,
  	"link_type" "enum_pages_t_blocks_community_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL,
  	"link_appearance" "enum_pages_t_blocks_community_link_appearance" DEFAULT 'default',
  	"image_id" integer NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_t_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "enum_pages_t_blocks_content_columns_size" DEFAULT 'oneThird',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_type" "enum_pages_t_blocks_content_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_t_blocks_content_columns_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_t_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_t_blocks_news_panel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"featured_eyebrow" varchar,
  	"featured_eyebrow_sub" varchar,
  	"featured_post_id" integer NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_t_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_t_blocks_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"arrangement" "enum_pages_t_blocks_archive_arrangement" DEFAULT 'row',
  	"intro_content" jsonb,
  	"populate_by" "enum_pages_t_blocks_archive_populate_by" DEFAULT 'collection',
  	"relation_to" "enum_pages_t_blocks_archive_relation_to" DEFAULT 'posts',
  	"limit" numeric DEFAULT 10,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_t_blocks_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"form_id" integer NOT NULL,
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_t" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"template_name" varchar NOT NULL,
  	"template_source_id" integer,
  	"title" varchar,
  	"hero_type" "enum_pages_t_hero_type" DEFAULT 'lowImpact',
  	"hero_title" varchar,
  	"hero_subtitle" varchar,
  	"hero_badge" varchar,
  	"hero_media_id" integer,
  	"hero_supertitle" varchar,
  	"hero_rich_text" jsonb,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"meta_keywords" varchar,
  	"published_at" timestamp(3) with time zone,
  	"generate_slug" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pages_t_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"categories_id" integer
  );
  
  CREATE TABLE "posts_t_populated_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar
  );
  
  CREATE TABLE "posts_t" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"template_name" varchar NOT NULL,
  	"template_source_id" integer,
  	"title" varchar,
  	"hero_image_id" integer,
  	"content" jsonb,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"meta_keywords" varchar,
  	"published_at" timestamp(3) with time zone,
  	"generate_slug" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "posts_t_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"posts_id" integer,
  	"categories_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "collection_templates_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "pages_hero_slides" ADD COLUMN "title" varchar;
  ALTER TABLE "pages_hero_slides" ADD COLUMN "subtitle" varchar;
  ALTER TABLE "pages_blocks_archive" ADD COLUMN "heading" varchar;
  ALTER TABLE "pages_blocks_archive" ADD COLUMN "arrangement" "enum_pages_blocks_archive_arrangement" DEFAULT 'row';
  ALTER TABLE "pages" ADD COLUMN "hero_badge" varchar;
  ALTER TABLE "pages" ADD COLUMN "hero_supertitle" varchar;
  ALTER TABLE "pages" ADD COLUMN "meta_keywords" varchar;
  ALTER TABLE "pages" ADD COLUMN "inherits_from_id" integer;
  ALTER TABLE "_pages_v_version_hero_slides" ADD COLUMN "title" varchar;
  ALTER TABLE "_pages_v_version_hero_slides" ADD COLUMN "subtitle" varchar;
  ALTER TABLE "_pages_v_blocks_archive" ADD COLUMN "heading" varchar;
  ALTER TABLE "_pages_v_blocks_archive" ADD COLUMN "arrangement" "enum__pages_v_blocks_archive_arrangement" DEFAULT 'row';
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_badge" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_supertitle" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_meta_keywords" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_inherits_from_id" integer;
  ALTER TABLE "posts" ADD COLUMN "meta_keywords" varchar;
  ALTER TABLE "posts" ADD COLUMN "inherits_from_id" integer;
  ALTER TABLE "_posts_v" ADD COLUMN "version_meta_keywords" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_inherits_from_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "pages_t_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "posts_t_id" integer;
  ALTER TABLE "pages_hero_slides_links" ADD CONSTRAINT "pages_hero_slides_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_hero_slides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cards_cards_links" ADD CONSTRAINT "pages_blocks_cards_cards_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cards_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cards_cards" ADD CONSTRAINT "pages_blocks_cards_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cards_cards" ADD CONSTRAINT "pages_blocks_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cards" ADD CONSTRAINT "pages_blocks_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_community" ADD CONSTRAINT "pages_blocks_community_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_community" ADD CONSTRAINT "pages_blocks_community_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_news_panel" ADD CONSTRAINT "pages_blocks_news_panel_featured_post_id_posts_id_fk" FOREIGN KEY ("featured_post_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_news_panel" ADD CONSTRAINT "pages_blocks_news_panel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_hero_slides_links" ADD CONSTRAINT "_pages_v_version_hero_slides_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_version_hero_slides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cards_cards_links" ADD CONSTRAINT "_pages_v_blocks_cards_cards_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cards_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cards_cards" ADD CONSTRAINT "_pages_v_blocks_cards_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cards_cards" ADD CONSTRAINT "_pages_v_blocks_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cards" ADD CONSTRAINT "_pages_v_blocks_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_community" ADD CONSTRAINT "_pages_v_blocks_community_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_community" ADD CONSTRAINT "_pages_v_blocks_community_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_news_panel" ADD CONSTRAINT "_pages_v_blocks_news_panel_featured_post_id_posts_id_fk" FOREIGN KEY ("featured_post_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_news_panel" ADD CONSTRAINT "_pages_v_blocks_news_panel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_t_hero_slides_links" ADD CONSTRAINT "pages_t_hero_slides_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_t_hero_slides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_t_hero_slides" ADD CONSTRAINT "pages_t_hero_slides_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_t_hero_slides" ADD CONSTRAINT "pages_t_hero_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_t"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_t_hero_links" ADD CONSTRAINT "pages_t_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_t"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_t_blocks_cta_links" ADD CONSTRAINT "pages_t_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_t_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_t_blocks_cta" ADD CONSTRAINT "pages_t_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_t"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_t_blocks_cards_cards_links" ADD CONSTRAINT "pages_t_blocks_cards_cards_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_t_blocks_cards_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_t_blocks_cards_cards" ADD CONSTRAINT "pages_t_blocks_cards_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_t_blocks_cards_cards" ADD CONSTRAINT "pages_t_blocks_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_t_blocks_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_t_blocks_cards" ADD CONSTRAINT "pages_t_blocks_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_t"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_t_blocks_community" ADD CONSTRAINT "pages_t_blocks_community_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_t_blocks_community" ADD CONSTRAINT "pages_t_blocks_community_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_t"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_t_blocks_content_columns" ADD CONSTRAINT "pages_t_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_t_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_t_blocks_content" ADD CONSTRAINT "pages_t_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_t"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_t_blocks_news_panel" ADD CONSTRAINT "pages_t_blocks_news_panel_featured_post_id_posts_id_fk" FOREIGN KEY ("featured_post_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_t_blocks_news_panel" ADD CONSTRAINT "pages_t_blocks_news_panel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_t"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_t_blocks_media_block" ADD CONSTRAINT "pages_t_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_t_blocks_media_block" ADD CONSTRAINT "pages_t_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_t"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_t_blocks_archive" ADD CONSTRAINT "pages_t_blocks_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_t"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_t_blocks_form_block" ADD CONSTRAINT "pages_t_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_t_blocks_form_block" ADD CONSTRAINT "pages_t_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_t"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_t" ADD CONSTRAINT "pages_t_template_source_id_pages_id_fk" FOREIGN KEY ("template_source_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_t" ADD CONSTRAINT "pages_t_hero_media_id_media_id_fk" FOREIGN KEY ("hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_t" ADD CONSTRAINT "pages_t_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_t_rels" ADD CONSTRAINT "pages_t_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages_t"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_t_rels" ADD CONSTRAINT "pages_t_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_t_rels" ADD CONSTRAINT "pages_t_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_t_rels" ADD CONSTRAINT "pages_t_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_t_populated_authors" ADD CONSTRAINT "posts_t_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_t"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_t" ADD CONSTRAINT "posts_t_template_source_id_posts_id_fk" FOREIGN KEY ("template_source_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_t" ADD CONSTRAINT "posts_t_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_t" ADD CONSTRAINT "posts_t_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_t_rels" ADD CONSTRAINT "posts_t_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts_t"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_t_rels" ADD CONSTRAINT "posts_t_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_t_rels" ADD CONSTRAINT "posts_t_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_t_rels" ADD CONSTRAINT "posts_t_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_hero_slides_links_order_idx" ON "pages_hero_slides_links" USING btree ("_order");
  CREATE INDEX "pages_hero_slides_links_parent_id_idx" ON "pages_hero_slides_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cards_cards_links_order_idx" ON "pages_blocks_cards_cards_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_cards_cards_links_parent_id_idx" ON "pages_blocks_cards_cards_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cards_cards_order_idx" ON "pages_blocks_cards_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_cards_cards_parent_id_idx" ON "pages_blocks_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cards_cards_image_idx" ON "pages_blocks_cards_cards" USING btree ("image_id");
  CREATE INDEX "pages_blocks_cards_order_idx" ON "pages_blocks_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_cards_parent_id_idx" ON "pages_blocks_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cards_path_idx" ON "pages_blocks_cards" USING btree ("_path");
  CREATE INDEX "pages_blocks_community_order_idx" ON "pages_blocks_community" USING btree ("_order");
  CREATE INDEX "pages_blocks_community_parent_id_idx" ON "pages_blocks_community" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_community_path_idx" ON "pages_blocks_community" USING btree ("_path");
  CREATE INDEX "pages_blocks_community_image_idx" ON "pages_blocks_community" USING btree ("image_id");
  CREATE INDEX "pages_blocks_news_panel_order_idx" ON "pages_blocks_news_panel" USING btree ("_order");
  CREATE INDEX "pages_blocks_news_panel_parent_id_idx" ON "pages_blocks_news_panel" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_news_panel_path_idx" ON "pages_blocks_news_panel" USING btree ("_path");
  CREATE INDEX "pages_blocks_news_panel_featured_post_idx" ON "pages_blocks_news_panel" USING btree ("featured_post_id");
  CREATE INDEX "_pages_v_version_hero_slides_links_order_idx" ON "_pages_v_version_hero_slides_links" USING btree ("_order");
  CREATE INDEX "_pages_v_version_hero_slides_links_parent_id_idx" ON "_pages_v_version_hero_slides_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cards_cards_links_order_idx" ON "_pages_v_blocks_cards_cards_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cards_cards_links_parent_id_idx" ON "_pages_v_blocks_cards_cards_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cards_cards_order_idx" ON "_pages_v_blocks_cards_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cards_cards_parent_id_idx" ON "_pages_v_blocks_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cards_cards_image_idx" ON "_pages_v_blocks_cards_cards" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_cards_order_idx" ON "_pages_v_blocks_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cards_parent_id_idx" ON "_pages_v_blocks_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cards_path_idx" ON "_pages_v_blocks_cards" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_community_order_idx" ON "_pages_v_blocks_community" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_community_parent_id_idx" ON "_pages_v_blocks_community" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_community_path_idx" ON "_pages_v_blocks_community" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_community_image_idx" ON "_pages_v_blocks_community" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_news_panel_order_idx" ON "_pages_v_blocks_news_panel" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_news_panel_parent_id_idx" ON "_pages_v_blocks_news_panel" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_news_panel_path_idx" ON "_pages_v_blocks_news_panel" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_news_panel_featured_post_idx" ON "_pages_v_blocks_news_panel" USING btree ("featured_post_id");
  CREATE INDEX "pages_t_hero_slides_links_order_idx" ON "pages_t_hero_slides_links" USING btree ("_order");
  CREATE INDEX "pages_t_hero_slides_links_parent_id_idx" ON "pages_t_hero_slides_links" USING btree ("_parent_id");
  CREATE INDEX "pages_t_hero_slides_order_idx" ON "pages_t_hero_slides" USING btree ("_order");
  CREATE INDEX "pages_t_hero_slides_parent_id_idx" ON "pages_t_hero_slides" USING btree ("_parent_id");
  CREATE INDEX "pages_t_hero_slides_image_idx" ON "pages_t_hero_slides" USING btree ("image_id");
  CREATE INDEX "pages_t_hero_links_order_idx" ON "pages_t_hero_links" USING btree ("_order");
  CREATE INDEX "pages_t_hero_links_parent_id_idx" ON "pages_t_hero_links" USING btree ("_parent_id");
  CREATE INDEX "pages_t_blocks_cta_links_order_idx" ON "pages_t_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "pages_t_blocks_cta_links_parent_id_idx" ON "pages_t_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "pages_t_blocks_cta_order_idx" ON "pages_t_blocks_cta" USING btree ("_order");
  CREATE INDEX "pages_t_blocks_cta_parent_id_idx" ON "pages_t_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_t_blocks_cta_path_idx" ON "pages_t_blocks_cta" USING btree ("_path");
  CREATE INDEX "pages_t_blocks_cards_cards_links_order_idx" ON "pages_t_blocks_cards_cards_links" USING btree ("_order");
  CREATE INDEX "pages_t_blocks_cards_cards_links_parent_id_idx" ON "pages_t_blocks_cards_cards_links" USING btree ("_parent_id");
  CREATE INDEX "pages_t_blocks_cards_cards_order_idx" ON "pages_t_blocks_cards_cards" USING btree ("_order");
  CREATE INDEX "pages_t_blocks_cards_cards_parent_id_idx" ON "pages_t_blocks_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_t_blocks_cards_cards_image_idx" ON "pages_t_blocks_cards_cards" USING btree ("image_id");
  CREATE INDEX "pages_t_blocks_cards_order_idx" ON "pages_t_blocks_cards" USING btree ("_order");
  CREATE INDEX "pages_t_blocks_cards_parent_id_idx" ON "pages_t_blocks_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_t_blocks_cards_path_idx" ON "pages_t_blocks_cards" USING btree ("_path");
  CREATE INDEX "pages_t_blocks_community_order_idx" ON "pages_t_blocks_community" USING btree ("_order");
  CREATE INDEX "pages_t_blocks_community_parent_id_idx" ON "pages_t_blocks_community" USING btree ("_parent_id");
  CREATE INDEX "pages_t_blocks_community_path_idx" ON "pages_t_blocks_community" USING btree ("_path");
  CREATE INDEX "pages_t_blocks_community_image_idx" ON "pages_t_blocks_community" USING btree ("image_id");
  CREATE INDEX "pages_t_blocks_content_columns_order_idx" ON "pages_t_blocks_content_columns" USING btree ("_order");
  CREATE INDEX "pages_t_blocks_content_columns_parent_id_idx" ON "pages_t_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX "pages_t_blocks_content_order_idx" ON "pages_t_blocks_content" USING btree ("_order");
  CREATE INDEX "pages_t_blocks_content_parent_id_idx" ON "pages_t_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "pages_t_blocks_content_path_idx" ON "pages_t_blocks_content" USING btree ("_path");
  CREATE INDEX "pages_t_blocks_news_panel_order_idx" ON "pages_t_blocks_news_panel" USING btree ("_order");
  CREATE INDEX "pages_t_blocks_news_panel_parent_id_idx" ON "pages_t_blocks_news_panel" USING btree ("_parent_id");
  CREATE INDEX "pages_t_blocks_news_panel_path_idx" ON "pages_t_blocks_news_panel" USING btree ("_path");
  CREATE INDEX "pages_t_blocks_news_panel_featured_post_idx" ON "pages_t_blocks_news_panel" USING btree ("featured_post_id");
  CREATE INDEX "pages_t_blocks_media_block_order_idx" ON "pages_t_blocks_media_block" USING btree ("_order");
  CREATE INDEX "pages_t_blocks_media_block_parent_id_idx" ON "pages_t_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "pages_t_blocks_media_block_path_idx" ON "pages_t_blocks_media_block" USING btree ("_path");
  CREATE INDEX "pages_t_blocks_media_block_media_idx" ON "pages_t_blocks_media_block" USING btree ("media_id");
  CREATE INDEX "pages_t_blocks_archive_order_idx" ON "pages_t_blocks_archive" USING btree ("_order");
  CREATE INDEX "pages_t_blocks_archive_parent_id_idx" ON "pages_t_blocks_archive" USING btree ("_parent_id");
  CREATE INDEX "pages_t_blocks_archive_path_idx" ON "pages_t_blocks_archive" USING btree ("_path");
  CREATE INDEX "pages_t_blocks_form_block_order_idx" ON "pages_t_blocks_form_block" USING btree ("_order");
  CREATE INDEX "pages_t_blocks_form_block_parent_id_idx" ON "pages_t_blocks_form_block" USING btree ("_parent_id");
  CREATE INDEX "pages_t_blocks_form_block_path_idx" ON "pages_t_blocks_form_block" USING btree ("_path");
  CREATE INDEX "pages_t_blocks_form_block_form_idx" ON "pages_t_blocks_form_block" USING btree ("form_id");
  CREATE INDEX "pages_t_template_name_idx" ON "pages_t" USING btree ("template_name");
  CREATE INDEX "pages_t_template_source_idx" ON "pages_t" USING btree ("template_source_id");
  CREATE INDEX "pages_t_hero_hero_media_idx" ON "pages_t" USING btree ("hero_media_id");
  CREATE INDEX "pages_t_meta_meta_image_idx" ON "pages_t" USING btree ("meta_image_id");
  CREATE INDEX "pages_t_updated_at_idx" ON "pages_t" USING btree ("updated_at");
  CREATE INDEX "pages_t_created_at_idx" ON "pages_t" USING btree ("created_at");
  CREATE INDEX "pages_t_rels_order_idx" ON "pages_t_rels" USING btree ("order");
  CREATE INDEX "pages_t_rels_parent_idx" ON "pages_t_rels" USING btree ("parent_id");
  CREATE INDEX "pages_t_rels_path_idx" ON "pages_t_rels" USING btree ("path");
  CREATE INDEX "pages_t_rels_pages_id_idx" ON "pages_t_rels" USING btree ("pages_id");
  CREATE INDEX "pages_t_rels_posts_id_idx" ON "pages_t_rels" USING btree ("posts_id");
  CREATE INDEX "pages_t_rels_categories_id_idx" ON "pages_t_rels" USING btree ("categories_id");
  CREATE INDEX "posts_t_populated_authors_order_idx" ON "posts_t_populated_authors" USING btree ("_order");
  CREATE INDEX "posts_t_populated_authors_parent_id_idx" ON "posts_t_populated_authors" USING btree ("_parent_id");
  CREATE INDEX "posts_t_template_name_idx" ON "posts_t" USING btree ("template_name");
  CREATE INDEX "posts_t_template_source_idx" ON "posts_t" USING btree ("template_source_id");
  CREATE INDEX "posts_t_hero_image_idx" ON "posts_t" USING btree ("hero_image_id");
  CREATE INDEX "posts_t_meta_meta_image_idx" ON "posts_t" USING btree ("meta_image_id");
  CREATE INDEX "posts_t_updated_at_idx" ON "posts_t" USING btree ("updated_at");
  CREATE INDEX "posts_t_created_at_idx" ON "posts_t" USING btree ("created_at");
  CREATE INDEX "posts_t_rels_order_idx" ON "posts_t_rels" USING btree ("order");
  CREATE INDEX "posts_t_rels_parent_idx" ON "posts_t_rels" USING btree ("parent_id");
  CREATE INDEX "posts_t_rels_path_idx" ON "posts_t_rels" USING btree ("path");
  CREATE INDEX "posts_t_rels_posts_id_idx" ON "posts_t_rels" USING btree ("posts_id");
  CREATE INDEX "posts_t_rels_categories_id_idx" ON "posts_t_rels" USING btree ("categories_id");
  CREATE INDEX "posts_t_rels_users_id_idx" ON "posts_t_rels" USING btree ("users_id");
  ALTER TABLE "pages" ADD CONSTRAINT "pages_inherits_from_id_pages_t_id_fk" FOREIGN KEY ("inherits_from_id") REFERENCES "public"."pages_t"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_inherits_from_id_pages_t_id_fk" FOREIGN KEY ("version_inherits_from_id") REFERENCES "public"."pages_t"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_inherits_from_id_posts_t_id_fk" FOREIGN KEY ("inherits_from_id") REFERENCES "public"."posts_t"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_inherits_from_id_posts_t_id_fk" FOREIGN KEY ("version_inherits_from_id") REFERENCES "public"."posts_t"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_t_fk" FOREIGN KEY ("pages_t_id") REFERENCES "public"."pages_t"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_t_fk" FOREIGN KEY ("posts_t_id") REFERENCES "public"."posts_t"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_inherits_from_idx" ON "pages" USING btree ("inherits_from_id");
  CREATE INDEX "_pages_v_version_version_inherits_from_idx" ON "_pages_v" USING btree ("version_inherits_from_id");
  CREATE INDEX "posts_inherits_from_idx" ON "posts" USING btree ("inherits_from_id");
  CREATE INDEX "_posts_v_version_version_inherits_from_idx" ON "_posts_v" USING btree ("version_inherits_from_id");
  CREATE INDEX "payload_locked_documents_rels_pages_t_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_t_id");
  CREATE INDEX "payload_locked_documents_rels_posts_t_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_t_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_hero_slides_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_cards_cards_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_cards_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_community" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_news_panel" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_version_hero_slides_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_cards_cards_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_cards_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_community" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_news_panel" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_t_hero_slides_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_t_hero_slides" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_t_hero_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_t_blocks_cta_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_t_blocks_cta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_t_blocks_cards_cards_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_t_blocks_cards_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_t_blocks_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_t_blocks_community" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_t_blocks_content_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_t_blocks_content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_t_blocks_news_panel" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_t_blocks_media_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_t_blocks_archive" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_t_blocks_form_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_t" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_t_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_t_populated_authors" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_t" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_t_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "collection_templates_settings" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_hero_slides_links" CASCADE;
  DROP TABLE "pages_blocks_cards_cards_links" CASCADE;
  DROP TABLE "pages_blocks_cards_cards" CASCADE;
  DROP TABLE "pages_blocks_cards" CASCADE;
  DROP TABLE "pages_blocks_community" CASCADE;
  DROP TABLE "pages_blocks_news_panel" CASCADE;
  DROP TABLE "_pages_v_version_hero_slides_links" CASCADE;
  DROP TABLE "_pages_v_blocks_cards_cards_links" CASCADE;
  DROP TABLE "_pages_v_blocks_cards_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_community" CASCADE;
  DROP TABLE "_pages_v_blocks_news_panel" CASCADE;
  DROP TABLE "pages_t_hero_slides_links" CASCADE;
  DROP TABLE "pages_t_hero_slides" CASCADE;
  DROP TABLE "pages_t_hero_links" CASCADE;
  DROP TABLE "pages_t_blocks_cta_links" CASCADE;
  DROP TABLE "pages_t_blocks_cta" CASCADE;
  DROP TABLE "pages_t_blocks_cards_cards_links" CASCADE;
  DROP TABLE "pages_t_blocks_cards_cards" CASCADE;
  DROP TABLE "pages_t_blocks_cards" CASCADE;
  DROP TABLE "pages_t_blocks_community" CASCADE;
  DROP TABLE "pages_t_blocks_content_columns" CASCADE;
  DROP TABLE "pages_t_blocks_content" CASCADE;
  DROP TABLE "pages_t_blocks_news_panel" CASCADE;
  DROP TABLE "pages_t_blocks_media_block" CASCADE;
  DROP TABLE "pages_t_blocks_archive" CASCADE;
  DROP TABLE "pages_t_blocks_form_block" CASCADE;
  DROP TABLE "pages_t" CASCADE;
  DROP TABLE "pages_t_rels" CASCADE;
  DROP TABLE "posts_t_populated_authors" CASCADE;
  DROP TABLE "posts_t" CASCADE;
  DROP TABLE "posts_t_rels" CASCADE;
  DROP TABLE "collection_templates_settings" CASCADE;
  ALTER TABLE "pages" DROP CONSTRAINT "pages_inherits_from_id_pages_t_id_fk";
  
  ALTER TABLE "_pages_v" DROP CONSTRAINT "_pages_v_version_inherits_from_id_pages_t_id_fk";
  
  ALTER TABLE "posts" DROP CONSTRAINT "posts_inherits_from_id_posts_t_id_fk";
  
  ALTER TABLE "_posts_v" DROP CONSTRAINT "_posts_v_version_inherits_from_id_posts_t_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_pages_t_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_posts_t_fk";
  
  DROP INDEX "pages_inherits_from_idx";
  DROP INDEX "_pages_v_version_version_inherits_from_idx";
  DROP INDEX "posts_inherits_from_idx";
  DROP INDEX "_posts_v_version_version_inherits_from_idx";
  DROP INDEX "payload_locked_documents_rels_pages_t_id_idx";
  DROP INDEX "payload_locked_documents_rels_posts_t_id_idx";
  ALTER TABLE "pages_hero_slides" DROP COLUMN "title";
  ALTER TABLE "pages_hero_slides" DROP COLUMN "subtitle";
  ALTER TABLE "pages_blocks_archive" DROP COLUMN "heading";
  ALTER TABLE "pages_blocks_archive" DROP COLUMN "arrangement";
  ALTER TABLE "pages" DROP COLUMN "hero_badge";
  ALTER TABLE "pages" DROP COLUMN "hero_supertitle";
  ALTER TABLE "pages" DROP COLUMN "meta_keywords";
  ALTER TABLE "pages" DROP COLUMN "inherits_from_id";
  ALTER TABLE "_pages_v_version_hero_slides" DROP COLUMN "title";
  ALTER TABLE "_pages_v_version_hero_slides" DROP COLUMN "subtitle";
  ALTER TABLE "_pages_v_blocks_archive" DROP COLUMN "heading";
  ALTER TABLE "_pages_v_blocks_archive" DROP COLUMN "arrangement";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_badge";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_supertitle";
  ALTER TABLE "_pages_v" DROP COLUMN "version_meta_keywords";
  ALTER TABLE "_pages_v" DROP COLUMN "version_inherits_from_id";
  ALTER TABLE "posts" DROP COLUMN "meta_keywords";
  ALTER TABLE "posts" DROP COLUMN "inherits_from_id";
  ALTER TABLE "_posts_v" DROP COLUMN "version_meta_keywords";
  ALTER TABLE "_posts_v" DROP COLUMN "version_inherits_from_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "pages_t_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "posts_t_id";
  DROP TYPE "public"."enum_pages_hero_slides_links_link_type";
  DROP TYPE "public"."enum_pages_hero_slides_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_cards_cards_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_cards_cards_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_cards_cards_variant";
  DROP TYPE "public"."enum_pages_blocks_cards_cards_link_type";
  DROP TYPE "public"."enum_pages_blocks_cards_arrangement";
  DROP TYPE "public"."enum_pages_blocks_community_link_type";
  DROP TYPE "public"."enum_pages_blocks_community_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_archive_arrangement";
  DROP TYPE "public"."enum__pages_v_version_hero_slides_links_link_type";
  DROP TYPE "public"."enum__pages_v_version_hero_slides_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_cards_cards_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_cards_cards_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_cards_cards_variant";
  DROP TYPE "public"."enum__pages_v_blocks_cards_cards_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_cards_arrangement";
  DROP TYPE "public"."enum__pages_v_blocks_community_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_community_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_archive_arrangement";
  DROP TYPE "public"."enum_pages_t_hero_slides_links_link_type";
  DROP TYPE "public"."enum_pages_t_hero_slides_links_link_appearance";
  DROP TYPE "public"."enum_pages_t_hero_links_link_type";
  DROP TYPE "public"."enum_pages_t_hero_links_link_appearance";
  DROP TYPE "public"."enum_pages_t_blocks_cta_links_link_type";
  DROP TYPE "public"."enum_pages_t_blocks_cta_links_link_appearance";
  DROP TYPE "public"."enum_pages_t_blocks_cta_variant";
  DROP TYPE "public"."enum_pages_t_blocks_cards_cards_links_link_type";
  DROP TYPE "public"."enum_pages_t_blocks_cards_cards_links_link_appearance";
  DROP TYPE "public"."enum_pages_t_blocks_cards_cards_variant";
  DROP TYPE "public"."enum_pages_t_blocks_cards_cards_link_type";
  DROP TYPE "public"."enum_pages_t_blocks_cards_arrangement";
  DROP TYPE "public"."enum_pages_t_blocks_community_link_type";
  DROP TYPE "public"."enum_pages_t_blocks_community_link_appearance";
  DROP TYPE "public"."enum_pages_t_blocks_content_columns_size";
  DROP TYPE "public"."enum_pages_t_blocks_content_columns_link_type";
  DROP TYPE "public"."enum_pages_t_blocks_content_columns_link_appearance";
  DROP TYPE "public"."enum_pages_t_blocks_archive_arrangement";
  DROP TYPE "public"."enum_pages_t_blocks_archive_populate_by";
  DROP TYPE "public"."enum_pages_t_blocks_archive_relation_to";
  DROP TYPE "public"."enum_pages_t_hero_type";`)
}
