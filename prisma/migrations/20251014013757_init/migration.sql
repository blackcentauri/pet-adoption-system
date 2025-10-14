/*
  Warnings:

  - Made the column `pet_height` on table `pets` required. This step will fail if there are existing NULL values in that column.
  - Made the column `pet_weight` on table `pets` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."pets" ALTER COLUMN "pet_height" SET NOT NULL,
ALTER COLUMN "pet_weight" SET NOT NULL;
