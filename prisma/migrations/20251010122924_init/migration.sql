/*
  Warnings:

  - Added the required column `user_id` to the `applications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."applications" ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."applications" ADD CONSTRAINT "applications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
