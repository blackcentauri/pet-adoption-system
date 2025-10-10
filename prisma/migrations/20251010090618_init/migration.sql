/*
  Warnings:

  - You are about to drop the column `organization_name` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."users" DROP COLUMN "organization_name";
