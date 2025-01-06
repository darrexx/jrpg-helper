CREATE TABLE "games" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "games_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text NOT NULL,
	"releaseDate" date,
	"wikiLink" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sideQuests" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "sideQuests_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text NOT NULL,
	"gameId" integer,
	"wikiLink" text,
	"giver" text,
	"level" integer,
	"map" text NOT NULL,
	"location" text,
	"startX" numeric,
	"startY" numeric,
	"startZ" numeric,
	"prerequisites" text,
	"category" text,
	"steps" text
);
--> statement-breakpoint
CREATE TABLE "uniqueMonsters" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "uniqueMonsters_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text NOT NULL,
	"level" integer,
	"map" text NOT NULL,
	"location" text,
	"x" numeric,
	"y" numeric,
	"z" numeric,
	"wikiLink" text,
	"spawnTime" text,
	"gameId" integer
);
--> statement-breakpoint
ALTER TABLE "sideQuests" ADD CONSTRAINT "sideQuests_gameId_games_id_fk" FOREIGN KEY ("gameId") REFERENCES "public"."games"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "uniqueMonsters" ADD CONSTRAINT "uniqueMonsters_gameId_games_id_fk" FOREIGN KEY ("gameId") REFERENCES "public"."games"("id") ON DELETE cascade ON UPDATE no action;