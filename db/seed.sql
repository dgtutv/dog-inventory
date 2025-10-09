-- =======================================
-- DROP TABLES (in reverse dependency order)
-- =======================================
DROP TABLE IF EXISTS "haircut" CASCADE;
DROP TABLE IF EXISTS "owner" CASCADE;
DROP TABLE IF EXISTS "dog" CASCADE;
DROP TABLE IF EXISTS "breed" CASCADE;
DROP TABLE IF EXISTS "stylist" CASCADE;

-- =======================================
-- TABLE DEFINITIONS
-- =======================================

CREATE TABLE "dog"(
    "id" BIGINT NOT NULL,
    "breed" BIGINT NOT NULL,
    "preferredStylist" BIGINT NOT NULL
);
ALTER TABLE "dog" ADD PRIMARY KEY("id");

CREATE TABLE "breed"(
    "id" BIGINT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);
ALTER TABLE "breed" ADD PRIMARY KEY("id");

CREATE TABLE "haircut"(
    "id" BIGINT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" FLOAT(53) NOT NULL,
    "dog" BIGINT NOT NULL
);
ALTER TABLE "haircut" ADD PRIMARY KEY("id");

CREATE TABLE "owner"(
    "id" BIGINT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" BIGINT NOT NULL,
    "dogs" BIGINT NOT NULL
);
ALTER TABLE "owner" ADD PRIMARY KEY("id");

CREATE TABLE "stylist"(
    "employeeId" BIGINT NOT NULL,
    "name" BIGINT NOT NULL
);
ALTER TABLE "stylist" ADD PRIMARY KEY("employeeId");

-- =======================================
-- FOREIGN KEY CONSTRAINTS
-- =======================================
ALTER TABLE "dog"
    ADD CONSTRAINT "dog_preferredstylist_foreign"
    FOREIGN KEY("preferredStylist") REFERENCES "stylist"("employeeId");

ALTER TABLE "haircut"
    ADD CONSTRAINT "haircut_dog_foreign"
    FOREIGN KEY("dog") REFERENCES "dog"("id");

ALTER TABLE "dog"
    ADD CONSTRAINT "dog_breed_foreign"
    FOREIGN KEY("breed") REFERENCES "breed"("id");

ALTER TABLE "owner"
    ADD CONSTRAINT "owner_dogs_foreign"
    FOREIGN KEY("dogs") REFERENCES "dog"("id");

-- =======================================
-- SEED DATA
-- =======================================

-- Stylists
INSERT INTO "stylist" ("employeeId", "name") VALUES
(1, 1111),
(2, 2222),
(3, 3333);

-- Breeds
INSERT INTO "breed" ("id", "name", "description") VALUES
(1, 'Golden Retriever', 'Friendly, loyal, and intelligent.'),
(2, 'Poodle', 'Smart, energetic, and hypoallergenic.'),
(3, 'Bulldog', 'Calm, courageous, and affectionate.');

-- Dogs
INSERT INTO "dog" ("id", "breed", "preferredStylist") VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 3),
(4, 1, 2);

-- Owners
INSERT INTO "owner" ("id", "name", "email", "phone", "dogs") VALUES
(1, 'Alice Johnson', 'alice@example.com', 6041234567, 1),
(2, 'Bob Smith', 'bob@example.com', 6049876543, 2),
(3, 'Charlie Brown', 'charlie@example.com', 6042223333, 3),
(4, 'Dana White', 'dana@example.com', 6045556677, 4);

-- Haircuts
INSERT INTO "haircut" ("id", "name", "description", "price", "dog") VALUES
(1, 'Puppy Trim', 'Basic trim and clean-up for puppies.', 45.00, 1),
(2, 'Luxury Wash & Style', 'Full shampoo, conditioner, and blow dry.', 70.00, 2),
(3, 'Full Groom', 'Wash, trim, and coat styling.', 60.00, 3),
(4, 'Summer Cut', 'Short cut for warm weather.', 50.00, 4);
