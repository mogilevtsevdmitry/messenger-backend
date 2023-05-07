/*
  Warnings:

  - Made the column `nickname` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `firstName` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastName` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "roles" TEXT[],
ALTER COLUMN "nickname" SET NOT NULL,
ALTER COLUMN "firstName" SET NOT NULL,
ALTER COLUMN "lastName" SET NOT NULL,
ALTER COLUMN "status" SET NOT NULL;
