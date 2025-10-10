-- AlterTable
ALTER TABLE "public"."pets" ADD COLUMN     "admin_id" INTEGER;

-- CreateTable
CREATE TABLE "public"."admins" (
    "admin_id" SERIAL NOT NULL,
    "admin_name" VARCHAR(255),
    "username" VARCHAR(255),
    "email" VARCHAR(255),
    "password" VARCHAR(255),
    "role" "public"."user_role",
    "created_at" TIMESTAMP(6),

    CONSTRAINT "admins_pkey" PRIMARY KEY ("admin_id")
);

-- AddForeignKey
ALTER TABLE "public"."pets" ADD CONSTRAINT "pets_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "public"."admins"("admin_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
