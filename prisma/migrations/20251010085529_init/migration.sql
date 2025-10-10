-- CreateEnum
CREATE TYPE "public"."application_status" AS ENUM ('applied', 'pending', 'approved');

-- CreateTable
CREATE TABLE "public"."applications" (
    "application_id" SERIAL NOT NULL,
    "application_date" TIMESTAMP(6),
    "adoption_date" TIMESTAMP(6),
    "application_status" "public"."application_status" DEFAULT 'applied',
    "pet_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "applications_pkey" PRIMARY KEY ("application_id")
);

-- AddForeignKey
ALTER TABLE "public"."applications" ADD CONSTRAINT "applications_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "public"."pets"("pet_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."applications" ADD CONSTRAINT "applications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
