'use client';
import { trpc } from '@/client/trpc';
import { useState } from 'react';
import useDebounce from '@/hooks/use-debounce';
import ItemCardWithAmount from '@/components/item-card-with-amount';
import ItemCard from '@/components/item-card';
import CloseIcon from '@/icons/close.icon';
import { ItemWithCategory } from '@/types/item';

interface CartItem {
  item: ItemWithCategory;
  amount: number;
}

type Props = {
  itemsInCart?: CartItem[];
};

const Items = ({ itemsInCart }: Props) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [value, setValue] = useState<string>('');
  const [categoryId, setCategoryId] = useState<number>(1);
  const debouncedValue = useDebounce(value);
  const { data, isFetched } = trpc.items.useQuery(
    { q: debouncedValue },
    { enabled: debouncedValue.length > 2 }
  );
  const { data: categories } = trpc.categories.useQuery();
  const { mutate } = trpc.addToCart.useMutation();
  const { mutate: createItem } = trpc.createItem.useMutation();

  const addToCart = (item: ItemWithCategory, amount: number) => {
    setCart([...cart, { item, amount }]);
    setValue('');
  };

  const saveCart = () => {
    const items = cart.map((item) => ({
      itemId: item.item.id,
      amount: item.amount,
    }));
    mutate({ items });

    setCart([]);
  };

  return (
    <div className="flex flex-col gap-2 items-center">
      <div className="relative">
        <input
          className="w-30 h-8 text-black p-1 border border-black rounded"
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
          onUpdate={(amount) => addToCart(item, amount)}
        />
      ))}
      {data && data.length < 1 && isFetched && (
        <div className="flex flex-col">
          <div>Name: {value}</div>
          <select
            className="text-black"
            value={categoryId}
            onChange={(e) => setCategoryId(Number(e.target.value))}
          >
            {categories?.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <button
            onClick={() =>
              categoryId && createItem({ name: value, categoryId })
            }
          >
            Create item
          </button>
        </div>
      )}
      {cart.length > 0 && (
        <div className="flex flex-col justify-center items-center mt-10">
          <span>Added cart items</span>
          {cart.map((item) => (
            <ItemCard
              key={item.item.id}
              item={item.item}
              amount={item.amount}
            />
          ))}
          <button onClick={saveCart}>Save cart</button>
        </div>
      )}
    </div>
  );
};

export default Items;
