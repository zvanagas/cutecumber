/*
  Warnings:

  - Added the required column `amount` to the `Cart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cart" ADD COLUMN     "amount" INTEGER NOT NULL;
