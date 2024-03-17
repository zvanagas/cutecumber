import { Item, Category, CartItem } from '@prisma/client';

export type ItemWithCategory = Item & { category: Category };
export type CartItemWithCategory = CartItem & { item: ItemWithCategory };
