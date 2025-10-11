-- AddForeignKey
ALTER TABLE "public"."adopted_pets" ADD CONSTRAINT "pet_fk" FOREIGN KEY ("pet_id") REFERENCES "public"."pets"("pet_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
