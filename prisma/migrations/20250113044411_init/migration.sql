/*
  Warnings:

  - Added the required column `uploadedF` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usedMB` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `uploadedF` INTEGER NOT NULL,
    ADD COLUMN `usedMB` INTEGER NOT NULL;
