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
    "id" BIGSERIAL PRIMARY KEY,
    "breed" BIGINT NOT NULL,
    "preferredStylist" BIGINT NULL  -- Allow NULL when stylist is deleted
);

CREATE TABLE "breed"(
    "id" BIGSERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

CREATE TABLE "haircut"(
    "id" BIGSERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" FLOAT(53) NOT NULL,
    "dog" BIGINT NOT NULL
);

CREATE TABLE "owner"(
    "id" BIGSERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" BIGINT NOT NULL,
    "dogs" BIGINT NOT NULL
);

CREATE TABLE "stylist"(
    "employeeId" BIGSERIAL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- =======================================
-- FOREIGN KEY CONSTRAINTS
-- =======================================

-- If a stylist is deleted, set dogs' preferredStylist to NULL
ALTER TABLE "dog"
    ADD CONSTRAINT "dog_preferredstylist_foreign"
    FOREIGN KEY("preferredStylist") REFERENCES "stylist"("employeeId")
    ON DELETE SET NULL;

-- If a dog is deleted, delete all its haircuts (CASCADE)
ALTER TABLE "haircut"
    ADD CONSTRAINT "haircut_dog_foreign"
    FOREIGN KEY("dog") REFERENCES "dog"("id")
    ON DELETE CASCADE;

-- If a breed is deleted, prevent deletion if dogs reference it (RESTRICT - default behavior)
ALTER TABLE "dog"
    ADD CONSTRAINT "dog_breed_foreign"
    FOREIGN KEY("breed") REFERENCES "breed"("id")
    ON DELETE RESTRICT;

-- If a dog is deleted, delete the owner record that references it (CASCADE)
ALTER TABLE "owner"
    ADD CONSTRAINT "owner_dogs_foreign"
    FOREIGN KEY("dogs") REFERENCES "dog"("id")
    ON DELETE CASCADE;

-- =======================================
-- SEED DATA
-- =======================================

-- Stylists (Professional pet groomers)
INSERT INTO "stylist" ("name") VALUES
('Isabella Rodriguez'),
('Marcus Thompson'),
('Sofia Chen'),
('Alexander Williams'),
('Maya Patel'),
('David Anderson');

-- Breeds (More variety including popular breeds)
INSERT INTO "breed" ("name", "description") VALUES
('Golden Retriever', 'Friendly, loyal, and intelligent working dogs.'),
('Poodle', 'Smart, energetic, and hypoallergenic with curly coats.'),
('Bulldog', 'Calm, courageous, and affectionate with wrinkled faces.'),
('Labrador Retriever', 'Active, outgoing, and friendly family dogs.'),
('German Shepherd', 'Confident, courageous, and versatile working dogs.'),
('French Bulldog', 'Playful, adaptable, and smart with bat-like ears.'),
('Border Collie', 'Energetic, intelligent, and excellent herding dogs.'),
('Yorkshire Terrier', 'Feisty, brave, and determined small terriers.'),
('Siberian Husky', 'Friendly, alert, and outgoing sled dogs.'),
('Shih Tzu', 'Affectionate, playful, and outgoing toy dogs.');

-- Dogs (Testing many-to-one relationships)
INSERT INTO "dog" ("breed", "preferredStylist") VALUES
-- Multiple dogs with same breeds
(1, 1),   -- Golden Retriever with Isabella
(1, 2),   -- Another Golden Retriever with Marcus
(1, 3),   -- Third Golden Retriever with Sofia
(2, 1),   -- Poodle with Isabella (stylist has multiple dogs)
(2, 4),   -- Another Poodle with Alexander
(3, 2),   -- Bulldog with Marcus (stylist has multiple dogs)
(4, 1),   -- Labrador with Isabella (stylist has multiple dogs)
(4, 5),   -- Another Labrador with Maya
(4, 6),   -- Third Labrador with David
(5, 3),   -- German Shepherd with Sofia (stylist has multiple dogs)
(6, 4),   -- French Bulldog with Alexander (stylist has multiple dogs)
(7, 5),   -- Border Collie with Maya (stylist has multiple dogs)
(8, 6),   -- Yorkshire Terrier with David (stylist has multiple dogs)
(9, 2),   -- Siberian Husky with Marcus (stylist has multiple dogs)
(10, 4),  -- Shih Tzu with Alexander (stylist has multiple dogs)
(1, 5),   -- Fourth Golden Retriever with Maya (breed has multiple dogs)
(2, 6),   -- Third Poodle with David (breed has multiple dogs)
(6, 1),   -- Second French Bulldog with Isabella (breed & stylist have multiple)
(8, 2),   -- Second Yorkshire Terrier with Marcus
(10, 3);  -- Second Shih Tzu with Sofia

-- Owners (Testing one owner having multiple dogs)
INSERT INTO "owner" ("name", "email", "phone", "dogs") VALUES
-- Sarah owns multiple dogs (testing one-to-many from owner perspective)
('Sarah Mitchell', 'sarah.mitchell@email.com', 5551234567, 1),
('Sarah Mitchell', 'sarah.mitchell@email.com', 5551234567, 2),
('Sarah Mitchell', 'sarah.mitchell@email.com', 5551234567, 3),
-- James owns multiple dogs
('James Patterson', 'james.patterson@email.com', 5552345678, 4),
('James Patterson', 'james.patterson@email.com', 5552345678, 5),
-- Emma owns multiple dogs
('Emma Thompson', 'emma.thompson@email.com', 5553456789, 6),
('Emma Thompson', 'emma.thompson@email.com', 5553456789, 7),
('Emma Thompson', 'emma.thompson@email.com', 5553456789, 8),
-- Single dog owners
('Michael Johnson', 'michael.johnson@email.com', 5554567890, 9),
('Lisa Rodriguez', 'lisa.rodriguez@email.com', 5555678901, 10),
('David Kim', 'david.kim@email.com', 5556789012, 11),
('Rachel Green', 'rachel.green@email.com', 5557890123, 12),
('Tom Wilson', 'tom.wilson@email.com', 5558901234, 13),
('Anna Davis', 'anna.davis@email.com', 5559012345, 14),
('Chris Brown', 'chris.brown@email.com', 5550123456, 15),
-- Additional owners for remaining dogs
('Jennifer Lee', 'jennifer.lee@email.com', 5551357924, 16),
('Robert Taylor', 'robert.taylor@email.com', 5552468135, 17),
('Amanda White', 'amanda.white@email.com', 5553579246, 18),
('Kevin Martinez', 'kevin.martinez@email.com', 5554680357, 19),
('Melissa Garcia', 'melissa.garcia@email.com', 5555791468, 20);

-- Haircuts (Testing one dog having multiple haircuts)
INSERT INTO "haircut" ("name", "description", "price", "dog") VALUES
-- Dog 1 (Sarah's Golden Retriever) has multiple haircuts over time
('Puppy Introduction Cut', 'Gentle first grooming experience for young dogs.', 45.00, 1),
('Summer Lion Cut', 'Shorter cut to keep cool in summer heat.', 65.00, 1),
('Holiday Full Groom', 'Complete grooming with festive bow tie.', 85.00, 1),
('Maintenance Trim', 'Regular upkeep and nail trim.', 55.00, 1),

-- Dog 2 (Sarah's second Golden Retriever) has multiple haircuts
('Breed Standard Cut', 'Traditional Golden Retriever styling.', 70.00, 2),
('Sanitary Trim', 'Hygienic grooming for sensitive areas.', 40.00, 2),
('De-shedding Treatment', 'Special treatment to reduce shedding.', 60.00, 2),

-- Dog 4 (James' Poodle) has multiple elaborate cuts
('Continental Clip', 'Classic poodle show cut with pom-poms.', 120.00, 4),
('Puppy Clip', 'All-over even length cut.', 75.00, 4),
('Miami Clip', 'Stylish shorter leg hair with longer body.', 95.00, 4),
('Teddy Bear Cut', 'Cute rounded face with fluffy body.', 80.00, 4),

-- Dog 7 (Emma's Labrador) has multiple haircuts
('Basic Wash & Brush', 'Simple cleaning and brushing service.', 35.00, 7),
('Nail Trim & Ear Clean', 'Essential maintenance grooming.', 25.00, 7),
('Full Service Groom', 'Complete grooming package.', 70.00, 7),

-- Various other dogs with single or multiple haircuts
('Bulldog Face Wrinkle Care', 'Specialized cleaning for facial wrinkles.', 50.00, 6),
('German Shepherd De-shed', 'Heavy de-shedding for double coat.', 65.00, 10),
('French Bulldog Bath', 'Gentle bath for sensitive skin.', 45.00, 11),
('Border Collie Trim', 'Working dog practical cut.', 60.00, 12),
('Yorkie Topknot Style', 'Traditional Yorkshire Terrier hair styling.', 55.00, 13),
('Husky Undercoat Rake', 'Specialized tool for thick undercoat.', 70.00, 14),
('Shih Tzu Face Trim', 'Keeping hair out of eyes.', 40.00, 15),

-- Additional haircuts for dogs with multiple services
('Express Groom', 'Quick wash and dry service.', 30.00, 16),
('Luxury Spa Treatment', 'Premium grooming with aromatherapy.', 100.00, 17),
('Show Prep Grooming', 'Competition-ready styling.', 150.00, 18),
('Senior Dog Gentle Care', 'Extra gentle grooming for older dogs.', 65.00, 19),
('Flea & Tick Treatment', 'Medicated bath and treatment.', 75.00, 20),

-- Even more haircuts for dogs that should have multiple services
('Spring Refresh Cut', 'Seasonal grooming to remove winter coat.', 55.00, 5),
('Matting Removal', 'Careful removal of tangled fur.', 45.00, 8),
('Anal Gland Expression', 'Health maintenance service.', 20.00, 9),
('Teeth Cleaning Add-on', 'Dental hygiene service.', 35.00, 12);
