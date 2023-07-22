BEGIN;

-- Si les tables existent déjà, on les supprime
DROP TABLE IF EXISTS "card_has_tag","tag", "card", "list", "deck", "consumers";

CREATE TABLE consumers (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "lastname" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  CONSTRAINT email_format CHECK ("email" ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$'),
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE deck (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "consumers_id" INTEGER REFERENCES "consumers"("id"),
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

CREATE list (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL DEFAULT 'Liste vide',
  "position" INTEGER NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ,
  "deck_id" INTEGER REFERENCES "deck"("id") ON DELETE CASCADE
);

CREATE TABLE card (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL DEFAULT 'Carte vide',
  "position" INTEGER NOT NULL,
  "color" TEXT NOT NULL DEFAULT '#FFF',
  "list_id" INTEGER NOT NULL REFERENCES "list"("id") ON DELETE CASCADE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE tag (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL DEFAULT 'Carte vide',
  "color" TEXT NOT NULL DEFAULT '#FFF',
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE card_has_tag (
  "card_id" INTEGER NOT NULL REFERENCES "card"("id") ON DELETE CASCADE,
  "tag_id" INTEGER NOT NULL REFERENCES "tag"("id") ON DELETE CASCADE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY ("card_id", "tag_id")
);

COMMIT;

