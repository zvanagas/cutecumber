'use client';
import { trpc } from '@/client/trpc';
import Button from '@/components/button';
import Items from '@/components/items/items';
import NavigationBar from '@/components/navigation-bar';
import useDebounce from '@/hooks/use-debounce';
import { CloseIcon } from '@/icons/close.icon';
import { useState } from 'react';

export default function ItemsPage() {
  const [isCreationMode, setIsCreationMode] = useState(false);
  const { mutate: addToCart } = trpc.cart.add.useMutation();
  const [value, setValue] = useState('');
  const [categoryId, setCategoryId] = useState(1);
  const { data: categories } = trpc.categories.getAll.useQuery();
  const { mutate: createItem } = trpc.items.create.useMutation();
  const { data: latestCart } = trpc.cart.getLatestId.useQuery();
  const debouncedValue = useDebounce(value);
  const { data } = trpc.items.getAll.useQuery(
    {
      q: debouncedValue,
    },
    { enabled: value.length > 0 }
  );

  return (
    <div className="flex flex-col gap-4">
      <NavigationBar isBackButtonShown>
        <Button onClick={() => setIsCreationMode(!isCreationMode)}>
          {isCreationMode ? 'Add to basket mode' : 'Creation mode'}
        </Button>
      </NavigationBar>
      {isCreationMode ? (
        <div className="flex flex-col items-center justify-between w-full gap-2 p-4 bg-white rounded text-black shadow-md">
          <span>Item name</span>
          <div className="relative">
            <input
              className="w-52 h-8 text-black p-4 border rounded-md"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            {value && (
              <CloseIcon
                className="absolute top-1.5 right-1 w-6 text-black cursor-pointer"
                onClick={() => setValue('')}
              />
            )}
          </div>
          <span>Category</span>
          <select
            className="w-52 text-black p-1 border rounded"
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
            className="bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300 disabled:bg-blue-200 disabled:cursor-not-allowed"
            onClick={() =>
              categoryId && createItem({ name: value, categoryId })
            }
            isDisabled={!!data?.length}
          >
            Create item
          </Button>
        </div>
      ) : (
        <Items
          isBasketMode
          onSave={({ items }) =>
            latestCart && addToCart({ cartId: latestCart.id, items })
          }
        />
      )}
    </div>
  );
}
