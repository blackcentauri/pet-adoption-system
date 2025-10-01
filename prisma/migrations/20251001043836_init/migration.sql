-- CreateEnum
CREATE TYPE "public"."pet_status" AS ENUM ('not adopted', 'pending', 'adopted');

-- CreateEnum
CREATE TYPE "public"."user_role" AS ENUM ('user', 'admin');

-- CreateTable
CREATE TABLE "public"."adopted_pets" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "pet_id" INTEGER NOT NULL,
    "date_of_adoption" TIMESTAMP(6),

    CONSTRAINT "adopted_pets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."pets" (
    "pet_id" SERIAL NOT NULL,
    "pet_name" VARCHAR(255),
    "pet_age" VARCHAR(255),
    "pet_species" VARCHAR(255),
    "pet_status" "public"."pet_status",
    "pet_description" VARCHAR(255),
    "pet_image" VARCHAR(255),
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("pet_id")
);

-- CreateTable
CREATE TABLE "public"."users" (
    "user_id" SERIAL NOT NULL,
    "first_name" VARCHAR(255),
    "last_name" VARCHAR(255),
    "username" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" "public"."user_role" DEFAULT 'user',
    "organization_name" VARCHAR(255),
    "created_at" TIMESTAMP(6),

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "unique_username" ON "public"."users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "email" ON "public"."users"("email");

-- AddForeignKey
ALTER TABLE "public"."adopted_pets" ADD CONSTRAINT "user_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."pets" ADD CONSTRAINT "fk_user_id" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
