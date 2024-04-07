'use client';
import { trpc } from '@/client/trpc';
import { Button } from '@/components/button';
import { NavigationBar } from '@/components/navigation-bar';
import { useState } from 'react';

export default function CreateCategoryPage() {
  const [name, setName] = useState('');
  const { data } = trpc.categories.getAll.useQuery();
  const { mutate } = trpc.categories.create.useMutation({
    onSuccess: () => setName(''),
  });

  return (
    <div className="flex flex-col w-full items-center gap-4">
      <NavigationBar isBackButtonShown />
      {data && data?.length > 0 && (
        <span className="dark:text-white">
          Created categories: {data?.map(({ name }) => name).join(', ')}
        </span>
      )}
      <span className="dark:text-white">Name</span>
      <input
        className="w-30 h-8 text-black p-4 border rounded-md"
        value={name}
        onChange={({ target }) => setName(target.value)}
      />
      <Button
        isDisabled={data?.some((category) => category.name === name)}
        onClick={() => mutate({ name })}
      >
        Create
      </Button>
    </div>
  );
}
