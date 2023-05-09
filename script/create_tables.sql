BEGIN;

-- Si les tables existent déjà, on les supprime
DROP TABLE IF EXISTS "card_has_tag","tag", "card", "list", "table", "user";

CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "lastname" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  CONSTRAINT email_format CHECK ("email" ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$'),
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "table" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "user_id" INTEGER REFERENCES "user"("id"),
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "list" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL DEFAULT 'Liste vide',
  "position" INTEGER NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ,
  "table_id" INTEGER REFERENCES "table"("id") ON DELETE CASCADE
);

CREATE TABLE "card" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL DEFAULT 'Carte vide',
  "position" INTEGER NOT NULL,
  "color" TEXT NOT NULL DEFAULT '#FFF',
  "list_id" INTEGER NOT NULL REFERENCES "list"("id") ON DELETE CASCADE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "tag" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL DEFAULT 'Carte vide',
  "color" TEXT NOT NULL DEFAULT '#FFF',
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "card_has_tag" (
  "card_id" INTEGER NOT NULL REFERENCES "card"("id") ON DELETE CASCADE,
  "tag_id" INTEGER NOT NULL REFERENCES "tag"("id") ON DELETE CASCADE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY ("card_id", "tag_id")
);

COMMIT;

