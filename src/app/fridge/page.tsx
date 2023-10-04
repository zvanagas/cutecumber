'use client';
import { trpc } from '@/client/trpc';
import Button from '@/components/button';
import ItemCardWithAmount from '@/components/item-card-with-amount';
import Items from '@/components/items';
import { useMemo, useState } from 'react';

export default function Fridge() {
  const { data } = trpc.getfridgeItems.useQuery();
  const { mutate } = trpc.saveItemsToFridge.useMutation();
  const { mutate: update } = trpc.updateFridgeItem.useMutation();
  const { mutate: deleteItem } = trpc.deleteFridgeItem.useMutation();
  const [searchValue, setSearchValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const items = useMemo(
    () =>
      data?.filter((it) => it.item.name.toLowerCase().includes(searchValue)),
    [data, searchValue]
  );

  return (
    <div className={`flex flex-col gap-2 w-full items-center p-2`}>
      <h1 className="text-black text-xl">What&apos;s inside a fridge?</h1>
      <input
        className="w-30 h-8 text-black p-1 border rounded"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <div className="flex flex-col items-center w-full gap-2">
        {items?.map(({ item, amount }) => (
          <ItemCardWithAmount
            key={item.id}
            item={item}
            amount={amount}
            onUpdate={(newAmount) => update({ id: item.id, amount: newAmount })}
            onDelete={() => deleteItem({ id: item.id })}
          />
        ))}
      </div>
      <Button onClick={() => setIsOpen(true)}>Add to fridge</Button>

      <dialog
        open={isOpen}
        className="bg-white border p-2 backdrop-blur-lg w-11/12 h-5/6 fixed rounded"
      >
        <button
          className="absolute right-2 border px-2 rounded"
          onClick={() => setIsOpen(false)}
        >
          X
        </button>
        <Items
          onSave={(items) => {
            mutate(items);
            setIsOpen(false);
          }}
        />
      </dialog>
    </div>
  );
}
