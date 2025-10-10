/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `admins` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `admins` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "unique_admin_username" ON "public"."admins"("username");

-- CreateIndex
CREATE UNIQUE INDEX "unique_admin_email" ON "public"."admins"("email");
