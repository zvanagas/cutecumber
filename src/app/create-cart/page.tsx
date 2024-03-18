'use client';
import { trpc } from '@/client/trpc';
import Button from '@/components/button';
import NavigationBar from '@/components/navigation-bar';
import { useState } from 'react';

export default function CreateCartPage() {
  const [name, setName] = useState('');
  const { mutate } = trpc.cart.create.useMutation({
    onSuccess: () => setName(''),
  });

  return (
    <div className="flex flex-col w-full items-center gap-4">
      <NavigationBar isBackButtonShown />
      <span className="dark:text-white">Name</span>
      <input
        className="w-30 h-8 text-black p-4 border rounded-md"
        value={name}
        onChange={({ target }) => setName(target.value)}
      />
      <Button onClick={() => mutate({ name })}>Create</Button>
    </div>
  );
}
