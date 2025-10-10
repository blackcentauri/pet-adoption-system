/*
  Warnings:

  - Made the column `username` on table `admins` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."admins" ALTER COLUMN "username" SET NOT NULL;
