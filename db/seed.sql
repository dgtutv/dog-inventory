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
    "name" TEXT NOT NULL
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

-- Stylists (Professional pet groomers)
INSERT INTO "stylist" ("employeeId", "name") VALUES
(1, 'Isabella Rodriguez'),
(2, 'Marcus Thompson'),
(3, 'Sofia Chen'),
(4, 'Alexander Williams'),
(5, 'Maya Patel'),
(6, 'David Anderson');

-- Breeds (More variety including popular breeds)
INSERT INTO "breed" ("id", "name", "description") VALUES
(1, 'Golden Retriever', 'Friendly, loyal, and intelligent working dogs.'),
(2, 'Poodle', 'Smart, energetic, and hypoallergenic with curly coats.'),
(3, 'Bulldog', 'Calm, courageous, and affectionate with wrinkled faces.'),
(4, 'Labrador Retriever', 'Active, outgoing, and friendly family dogs.'),
(5, 'German Shepherd', 'Confident, courageous, and versatile working dogs.'),
(6, 'French Bulldog', 'Playful, adaptable, and smart with bat-like ears.'),
(7, 'Border Collie', 'Energetic, intelligent, and excellent herding dogs.'),
(8, 'Yorkshire Terrier', 'Feisty, brave, and determined small terriers.'),
(9, 'Siberian Husky', 'Friendly, alert, and outgoing sled dogs.'),
(10, 'Shih Tzu', 'Affectionate, playful, and outgoing toy dogs.');

-- Dogs (Testing many-to-one relationships)
INSERT INTO "dog" ("id", "breed", "preferredStylist") VALUES
-- Multiple dogs with same breeds
(1, 1, 1),   -- Golden Retriever with Isabella
(2, 1, 2),   -- Another Golden Retriever with Marcus
(3, 1, 3),   -- Third Golden Retriever with Sofia
(4, 2, 1),   -- Poodle with Isabella (stylist has multiple dogs)
(5, 2, 4),   -- Another Poodle with Alexander
(6, 3, 2),   -- Bulldog with Marcus (stylist has multiple dogs)
(7, 4, 1),   -- Labrador with Isabella (stylist has multiple dogs)
(8, 4, 5),   -- Another Labrador with Maya
(9, 4, 6),   -- Third Labrador with David
(10, 5, 3),  -- German Shepherd with Sofia (stylist has multiple dogs)
(11, 6, 4),  -- French Bulldog with Alexander (stylist has multiple dogs)
(12, 7, 5),  -- Border Collie with Maya (stylist has multiple dogs)
(13, 8, 6),  -- Yorkshire Terrier with David (stylist has multiple dogs)
(14, 9, 2),  -- Siberian Husky with Marcus (stylist has multiple dogs)
(15, 10, 4), -- Shih Tzu with Alexander (stylist has multiple dogs)
(16, 1, 5),  -- Fourth Golden Retriever with Maya (breed has multiple dogs)
(17, 2, 6),  -- Third Poodle with David (breed has multiple dogs)
(18, 6, 1),  -- Second French Bulldog with Isabella (breed & stylist have multiple)
(19, 8, 2),  -- Second Yorkshire Terrier with Marcus
(20, 10, 3); -- Second Shih Tzu with Sofia

-- Owners (Testing one owner having multiple dogs)
INSERT INTO "owner" ("id", "name", "email", "phone", "dogs") VALUES
-- Sarah owns multiple dogs (testing one-to-many from owner perspective)
(1, 'Sarah Mitchell', 'sarah.mitchell@email.com', 5551234567, 1),
(2, 'Sarah Mitchell', 'sarah.mitchell@email.com', 5551234567, 2),
(3, 'Sarah Mitchell', 'sarah.mitchell@email.com', 5551234567, 3),
-- James owns multiple dogs
(4, 'James Patterson', 'james.patterson@email.com', 5552345678, 4),
(5, 'James Patterson', 'james.patterson@email.com', 5552345678, 5),
-- Emma owns multiple dogs
(6, 'Emma Thompson', 'emma.thompson@email.com', 5553456789, 6),
(7, 'Emma Thompson', 'emma.thompson@email.com', 5553456789, 7),
(8, 'Emma Thompson', 'emma.thompson@email.com', 5553456789, 8),
-- Single dog owners
(9, 'Michael Johnson', 'michael.johnson@email.com', 5554567890, 9),
(10, 'Lisa Rodriguez', 'lisa.rodriguez@email.com', 5555678901, 10),
(11, 'David Kim', 'david.kim@email.com', 5556789012, 11),
(12, 'Rachel Green', 'rachel.green@email.com', 5557890123, 12),
(13, 'Tom Wilson', 'tom.wilson@email.com', 5558901234, 13),
(14, 'Anna Davis', 'anna.davis@email.com', 5559012345, 14),
(15, 'Chris Brown', 'chris.brown@email.com', 5550123456, 15),
-- Additional owners for remaining dogs
(16, 'Jennifer Lee', 'jennifer.lee@email.com', 5551357924, 16),
(17, 'Robert Taylor', 'robert.taylor@email.com', 5552468135, 17),
(18, 'Amanda White', 'amanda.white@email.com', 5553579246, 18),
(19, 'Kevin Martinez', 'kevin.martinez@email.com', 5554680357, 19),
(20, 'Melissa Garcia', 'melissa.garcia@email.com', 5555791468, 20);

-- Haircuts (Testing one dog having multiple haircuts)
INSERT INTO "haircut" ("id", "name", "description", "price", "dog") VALUES
-- Dog 1 (Sarah's Golden Retriever) has multiple haircuts over time
(1, 'Puppy Introduction Cut', 'Gentle first grooming experience for young dogs.', 45.00, 1),
(2, 'Summer Lion Cut', 'Shorter cut to keep cool in summer heat.', 65.00, 1),
(3, 'Holiday Full Groom', 'Complete grooming with festive bow tie.', 85.00, 1),
(4, 'Maintenance Trim', 'Regular upkeep and nail trim.', 55.00, 1),

-- Dog 2 (Sarah's second Golden Retriever) has multiple haircuts
(5, 'Breed Standard Cut', 'Traditional Golden Retriever styling.', 70.00, 2),
(6, 'Sanitary Trim', 'Hygienic grooming for sensitive areas.', 40.00, 2),
(7, 'De-shedding Treatment', 'Special treatment to reduce shedding.', 60.00, 2),

-- Dog 4 (James' Poodle) has multiple elaborate cuts
(8, 'Continental Clip', 'Classic poodle show cut with pom-poms.', 120.00, 4),
(9, 'Puppy Clip', 'All-over even length cut.', 75.00, 4),
(10, 'Miami Clip', 'Stylish shorter leg hair with longer body.', 95.00, 4),
(11, 'Teddy Bear Cut', 'Cute rounded face with fluffy body.', 80.00, 4),

-- Dog 7 (Emma's Labrador) has multiple haircuts
(12, 'Basic Wash & Brush', 'Simple cleaning and brushing service.', 35.00, 7),
(13, 'Nail Trim & Ear Clean', 'Essential maintenance grooming.', 25.00, 7),
(14, 'Full Service Groom', 'Complete grooming package.', 70.00, 7),

-- Various other dogs with single or multiple haircuts
(15, 'Bulldog Face Wrinkle Care', 'Specialized cleaning for facial wrinkles.', 50.00, 6),
(16, 'German Shepherd De-shed', 'Heavy de-shedding for double coat.', 65.00, 10),
(17, 'French Bulldog Bath', 'Gentle bath for sensitive skin.', 45.00, 11),
(18, 'Border Collie Trim', 'Working dog practical cut.', 60.00, 12),
(19, 'Yorkie Topknot Style', 'Traditional Yorkshire Terrier hair styling.', 55.00, 13),
(20, 'Husky Undercoat Rake', 'Specialized tool for thick undercoat.', 70.00, 14),
(21, 'Shih Tzu Face Trim', 'Keeping hair out of eyes.', 40.00, 15),

-- Additional haircuts for dogs with multiple services
(22, 'Express Groom', 'Quick wash and dry service.', 30.00, 16),
(23, 'Luxury Spa Treatment', 'Premium grooming with aromatherapy.', 100.00, 17),
(24, 'Show Prep Grooming', 'Competition-ready styling.', 150.00, 18),
(25, 'Senior Dog Gentle Care', 'Extra gentle grooming for older dogs.', 65.00, 19),
(26, 'Flea & Tick Treatment', 'Medicated bath and treatment.', 75.00, 20),

-- Even more haircuts for dogs that should have multiple services
(27, 'Spring Refresh Cut', 'Seasonal grooming to remove winter coat.', 55.00, 5),
(28, 'Matting Removal', 'Careful removal of tangled fur.', 45.00, 8),
(29, 'Anal Gland Expression', 'Health maintenance service.', 20.00, 9),
(30, 'Teeth Cleaning Add-on', 'Dental hygiene service.', 35.00, 12);
