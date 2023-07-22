BEGIN;

-- Ajout de trois faux utilisateurs
INSERT INTO "consumers" ("name","lastname", "email")
VALUES
("John","doe", "john.doe@example.com"),
("Jane","smith", "jane.smith@example.com"),
("Bob ","smiteidh", "bob.johnson@example.com");

-- Ajout d'un tableau pour chaque utilisateur
INSERT INTO "deck" ("name", "consumers_id")
VALUES
("Tableau 1", 1),
("Tableau 2", 2),
("Tableau 3", 3);

-- Ajout de deux listes pour chaque tableau
INSERT INTO "list" ("name", "position", "deck_id")
VALUES
("Liste 1", 1, 1),
("Liste 2", 2, 1),
("Liste 3", 3, 2),
("Liste 4", 4, 2),
("Liste 5", 5, 3),
("Liste 6", 6, 3);

-- Ajout de six cartes pour chaque liste
INSERT INTO "card" ("name", "position", "color", "list_id")
VALUES
("Carte 1", 1, "#F00", 1),
("Carte 2", 2, "#0F0", 1),
("Carte 3", 3, "#00F", 1),
("Carte 4", 4, "#F0F", 2),
("Carte 5", 5, "#F00", 2),
("Carte 6", 6, "#0F0", 3),
("Carte 7", 7, "#00F", 3),
("Carte 8", 8, "#F0F", 4),
("Carte 9", 9, "#F00", 4),
("Carte 10", 10, "#0F0", 5),
("Carte 11", 11, "#00F", 5),
("Carte 12", 12, "#F0F", 6);

-- Ajout de quelques tags pour chaque carte
INSERT INTO "tag" ("name", "color")
VALUES
("Urgent", "#F00"),
("Important", "#FF0"),
("A faire", "#0F0"),
("En cours", "#00F"),
("Terminé", "#F0F");

-- Ajout des relations entre les cartes et les tags
INSERT INTO "card_has_tag" ("card_id", "tag_id")
VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 1),
(5, 2),
(6, 3),
(7, 4),
(8, 1),
(9, 2),
(10, 3),
(11, 4),
(12, 5);

COMMIT;

  -- 