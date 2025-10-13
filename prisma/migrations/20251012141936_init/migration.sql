-- DropForeignKey
ALTER TABLE "public"."adopted_pets" DROP CONSTRAINT "pet_fk";

-- DropForeignKey
ALTER TABLE "public"."applications" DROP CONSTRAINT "applications_pet_id_fkey";

-- AddForeignKey
ALTER TABLE "public"."adopted_pets" ADD CONSTRAINT "pet_fk" FOREIGN KEY ("pet_id") REFERENCES "public"."pets"("pet_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."applications" ADD CONSTRAINT "applications_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "public"."pets"("pet_id") ON DELETE CASCADE ON UPDATE NO ACTION;
