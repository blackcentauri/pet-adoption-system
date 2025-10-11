/*
  Warnings:

  - You are about to drop the column `user_id` on the `applications` table. All the data in the column will be lost.
  - Added the required column `admin_id` to the `applications` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."applications" DROP CONSTRAINT "applications_user_id_fkey";

-- AlterTable
ALTER TABLE "public"."applications" DROP COLUMN "user_id",
ADD COLUMN     "admin_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."applications" ADD CONSTRAINT "applications_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "public"."admins"("admin_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
