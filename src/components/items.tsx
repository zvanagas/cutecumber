'use client';
import { trpc } from '@/client/trpc';
import { useState } from 'react';
import useDebounce from '@/hooks/use-debounce';
import ItemCardWithAmount from '@/components/item-card-with-amount';
import ItemCard from '@/components/item-card';
import CloseIcon from '@/icons/close.icon';
import { ItemWithCategory } from '@/types/item';
import Button from './button';

interface CartItem {
  item: ItemWithCategory;
  amount: number;
}

interface SaveParams {
  items: { itemId: number; amount: number }[];
}

type Props = {
  onSave: (items: SaveParams) => void;
  itemsInCart?: CartItem[];
};

const Items = ({ itemsInCart, onSave }: Props) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [value, setValue] = useState<string>('');
  const [categoryId, setCategoryId] = useState<number>(1);
  const debouncedValue = useDebounce(value);
  const { data, isFetched } = trpc.items.useQuery(
    { q: debouncedValue },
    { enabled: debouncedValue.length > 2 }
  );
  const { data: categories } = trpc.categories.useQuery();
  const { mutate: createItem } = trpc.createItem.useMutation();

  const addToBasket = (item: ItemWithCategory, amount: number) => {
    setItems([...items, { item, amount }]);
    setValue('');
  };

  const save = () => {
    const itemsToSave = items.map((item) => ({
      itemId: item.item.id,
      amount: item.amount,
    }));
    onSave({ items: itemsToSave });

    setItems([]);
  };

  return (
    <div className="flex w-full flex-col gap-2 items-center">
      <span>Search for items</span>
      <div className="relative">
        <input
          className="w-30 h-8 text-black p-1 border rounded"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        {value && (
          <CloseIcon
            className="absolute top-[5px] right-1 w-6 text-black cursor-pointer"
            onClick={() => setValue('')}
          />
        )}
      </div>
      {data?.map((item) => (
        <ItemCardWithAmount
          key={item.name}
          item={item}
          isDisabled={itemsInCart?.some((it) => it.item.id === item.id)}
          onUpdate={(amount) => addToBasket(item, amount)}
        />
      ))}
      {data && data.length < 1 && isFetched && (
        <div className="flex flex-col gap-2">
          <div>Name: {value}</div>
          <select
            className="text-black p-1 border rounded"
            value={categoryId}
            onChange={(e) => setCategoryId(Number(e.target.value))}
          >
            {categories?.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <Button
            onClick={() =>
              categoryId && createItem({ name: value, categoryId })
            }
          >
            Create item
          </Button>
        </div>
      )}
      {items.length > 0 && (
        <div className="flex flex-col gap-2 justify-center items-center mt-10 w-full">
          <span>Added items</span>
          {items.map((item) => (
            <ItemCard
              key={item.item.id}
              item={item.item}
              amount={item.amount}
            />
          ))}
          <Button onClick={save}>Save</Button>
        </div>
      )}
    </div>
  );
};

export default Items;
