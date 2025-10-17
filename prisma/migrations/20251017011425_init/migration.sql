/*
  Warnings:

  - Made the column `pet_image` on table `pets` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."pets" ALTER COLUMN "pet_image" SET NOT NULL;
