/*
  Warnings:

  - Added the required column `cartId` to the `Cart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
CREATE SEQUENCE cart_id_seq;
ALTER TABLE "Cart" ADD COLUMN     "cartId" INTEGER NOT NULL,
ALTER COLUMN "id" SET DEFAULT nextval('cart_id_seq');
ALTER SEQUENCE cart_id_seq OWNED BY "Cart"."id";
