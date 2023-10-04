import { ItemWithCategory } from '@/types/item';

export interface CartItem {
  item: ItemWithCategory;
  amount: number;
}

export interface SaveParams {
  items: { itemId: number; amount: number }[];
}
