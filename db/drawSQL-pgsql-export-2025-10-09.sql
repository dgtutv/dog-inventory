CREATE TABLE "dog"(
    "id" BIGINT NOT NULL,
    "breed" BIGINT NOT NULL,
    "preferredStylist" BIGINT NOT NULL
);
ALTER TABLE
    "dog" ADD PRIMARY KEY("id");
CREATE TABLE "breed"(
    "id" BIGINT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);
ALTER TABLE
    "breed" ADD PRIMARY KEY("id");
CREATE TABLE "haircut"(
    "id" BIGINT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" FLOAT(53) NOT NULL,
    "dog" BIGINT NOT NULL
);
ALTER TABLE
    "haircut" ADD PRIMARY KEY("id");
CREATE TABLE "owner"(
    "id" BIGINT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" BIGINT NOT NULL,
    "dogs" BIGINT NOT NULL
);
ALTER TABLE
    "owner" ADD PRIMARY KEY("id");
CREATE TABLE "stylist"(
    "employeeId" BIGINT NOT NULL,
    "name" BIGINT NOT NULL
);
ALTER TABLE
    "stylist" ADD PRIMARY KEY("employeeId");
ALTER TABLE
    "dog" ADD CONSTRAINT "dog_preferredstylist_foreign" FOREIGN KEY("preferredStylist") REFERENCES "stylist"("employeeId");
ALTER TABLE
    "haircut" ADD CONSTRAINT "haircut_dog_foreign" FOREIGN KEY("dog") REFERENCES "dog"("id");
ALTER TABLE
    "dog" ADD CONSTRAINT "dog_breed_foreign" FOREIGN KEY("breed") REFERENCES "breed"("id");
ALTER TABLE
    "owner" ADD CONSTRAINT "owner_dogs_foreign" FOREIGN KEY("dogs") REFERENCES "dog"("id");