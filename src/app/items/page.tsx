'use client';
import { trpc } from '@/client/trpc';
import { Button } from '@/components/button';
import { CategoryBlock } from '@/components/category-block';
import { NavigationBar } from '@/components/navigation-bar';
import { useDebounce } from '@/hooks/use-debounce';
import { CloseIcon } from '@/icons/close.icon';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ItemsPage() {
  const [isCreationMode, setIsCreationMode] = useState(false);
  const [value, setValue] = useState('');
  const [categoryId, setCategoryId] = useState(1);
  const { data: categories } = trpc.categories.getAll.useQuery();
  const { mutate: createItem } = trpc.items.create.useMutation({
    onSuccess: () => setValue(''),
  });
  const debouncedValue = useDebounce(value);
  const { data } = trpc.items.getAll.useQuery(
    {
      q: debouncedValue,
    },
    { enabled: !isCreationMode || value.length > 0 }
  );
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4">
      <NavigationBar isBackButtonShown>
        <Button onClick={() => setIsCreationMode(!isCreationMode)}>
          {isCreationMode ? 'Add' : 'Create'}
        </Button>
      </NavigationBar>
      {isCreationMode ? (
        <div className="flex flex-col items-center justify-between w-full gap-2 p-4 bg-white dark:bg-slate-800 rounded text-black shadow-sm">
          <span className="dark:text-white">Item name</span>
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
          <span className="dark:text-white">Category</span>
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
            className="text-white duration-300 disabled:opacity-80 disabled:cursor-not-allowed"
            onClick={() =>
              categoryId && createItem({ name: value, categoryId })
            }
            isDisabled={!!data?.length}
          >
            Create item
          </Button>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2 w-full items-center justify-center p-2 dark:bg-slate-800 shadow-sm dark:shadow-white rounded">
          {data?.map(({ id, name, category }) => (
            <button
              key={id}
              className="flex flex-col items-center border dark:border-white p-3 rounded"
              onClick={() => router.push(`/items/${id}`)}
            >
              <CategoryBlock name={category.name} />
              <span className="dark:text-white">{name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
