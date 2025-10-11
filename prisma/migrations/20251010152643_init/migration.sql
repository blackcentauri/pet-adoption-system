/*
  Warnings:

  - Made the column `pet_name` on table `pets` required. This step will fail if there are existing NULL values in that column.
  - Made the column `pet_age` on table `pets` required. This step will fail if there are existing NULL values in that column.
  - Made the column `pet_species` on table `pets` required. This step will fail if there are existing NULL values in that column.
  - Made the column `pet_description` on table `pets` required. This step will fail if there are existing NULL values in that column.
  - Made the column `pet_breed` on table `pets` required. This step will fail if there are existing NULL values in that column.
  - Made the column `pet_sex` on table `pets` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."pets" ALTER COLUMN "pet_name" SET NOT NULL,
ALTER COLUMN "pet_age" SET NOT NULL,
ALTER COLUMN "pet_species" SET NOT NULL,
ALTER COLUMN "pet_description" SET NOT NULL,
ALTER COLUMN "pet_breed" SET NOT NULL,
ALTER COLUMN "pet_sex" SET NOT NULL;
