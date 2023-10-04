-- CreateTable
CREATE TABLE "Fridge" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "itemId" INTEGER NOT NULL,

    CONSTRAINT "Fridge_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Fridge" ADD CONSTRAINT "Fridge_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
