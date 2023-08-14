import { Item, Category, Cart } from "@prisma/client";

export type ItemWithCategory = Item & { category: Category };
export type CartItemWithCategory = Cart & { item: ItemWithCategory };
