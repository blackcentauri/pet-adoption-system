/*
  Warnings:

  - The values [pending] on the enum `application_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."application_status_new" AS ENUM ('applied', 'rejected', 'approved');
ALTER TABLE "public"."applications" ALTER COLUMN "application_status" DROP DEFAULT;
ALTER TABLE "public"."applications" ALTER COLUMN "application_status" TYPE "public"."application_status_new" USING ("application_status"::text::"public"."application_status_new");
ALTER TYPE "public"."application_status" RENAME TO "application_status_old";
ALTER TYPE "public"."application_status_new" RENAME TO "application_status";
DROP TYPE "public"."application_status_old";
ALTER TABLE "public"."applications" ALTER COLUMN "application_status" SET DEFAULT 'applied';
COMMIT;

-- AlterTable
ALTER TABLE "public"."users" ADD COLUMN     "address" VARCHAR(255),
ADD COLUMN     "age" INTEGER,
ADD COLUMN     "birthday" TIMESTAMP(6),
ADD COLUMN     "contact_number" VARCHAR(255),
ADD COLUMN     "valid_id" VARCHAR(255);
