'use client';
import { trpc } from '@/client/trpc';
import { Button } from '@/components/button';
import { NavigationBar } from '@/components/navigation-bar';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';

type Props = {
  params: {
    id: string;
  };
};

export default function ItemPage({ params: { id } }: Props) {
  const [name, setName] = useState('');
  const { show, ToastContainer } = useToast();
  const [categoryId, setCategoryId] = useState(1);
  const { data } = trpc.items.getSingle.useQuery(Number(id));
  const { data: categories } = trpc.categories.getAll.useQuery();
  const { mutate } = trpc.items.updateSingle.useMutation({
    onSuccess: () => show('Item updated'),
  });

  useEffect(() => {
    setName(data?.name ?? '');
    setCategoryId(data?.categoryId ?? 1);
  }, [data?.name, data?.categoryId]);

  return (
    <div className="flex flex-col gap-4">
      <NavigationBar isBackButtonShown />
      <div className="flex flex-col gap-4 w-full items-center p-2 dark:bg-slate-800 shadow-sm dark:shadow-white rounded">
        <span className="dark:text-white">Update item</span>
        <input
          className="w-30 h-8 text-black p-4 border rounded-md"
          value={name}
          onChange={({ target }) => setName(target.value)}
        />
        <select
          className="w-52 text-black p-1 border rounded"
          value={categoryId}
          onChange={(e) => setCategoryId(Number(e.target.value))}
        >
          {categories?.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
        <Button
          isDisabled={data?.name === name && data.categoryId === categoryId}
          onClick={() => mutate({ id: Number(id), name, categoryId })}
        >
          Save
        </Button>
      </div>
      <ToastContainer />
    </div>
  );
}
