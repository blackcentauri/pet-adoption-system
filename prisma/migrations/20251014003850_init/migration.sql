-- AlterTable
ALTER TABLE "public"."pets" ADD COLUMN     "pet_birthday" TIMESTAMP(6),
ADD COLUMN     "pet_condition" VARCHAR(255),
ADD COLUMN     "pet_height" INTEGER,
ADD COLUMN     "pet_weight" INTEGER;
