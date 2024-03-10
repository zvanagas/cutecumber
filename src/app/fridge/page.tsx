'use client';
import { trpc } from '@/client/trpc';
import Button from '@/components/button';
import Dialog from '@/components/dialog';
import ItemCardWithActions from '@/components/item-card-with-actions';
import Items from '@/components/items/items';
import NavigationBar from '@/components/navigation-bar';
import { useMemo, useState } from 'react';

export default function FridgePage() {
  const { data } = trpc.getfridgeItems.useQuery();
  const { mutate } = trpc.saveItemsToFridge.useMutation();
  const { mutate: update } = trpc.updateFridgeItem.useMutation();
  const { mutate: deleteItem } = trpc.deleteFridgeItem.useMutation();
  const [searchValue, setSearchValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const items = useMemo(
    () =>
      data?.filter((it) => it.item.name.toLowerCase().includes(searchValue)) ??
      [],
    [data, searchValue]
  );

  return (
    <div className="flex flex-col gap-4">
      <NavigationBar isBackButtonShown />
      <div className="px-4">
        <div className="flex flex-col gap-2 w-full items-center p-4 rounded shadow-md">
          <h1 className="text-black text-xl">What&apos;s inside a fridge?</h1>
          <input
            className="w-30 h-8 text-black p-4 border rounded-md"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <div className="flex flex-col items-center w-full gap-2">
            {items.length < 1 && <span>No items in the fridge...</span>}
            {items.map(({ item, amount }) => (
              <ItemCardWithActions
                key={item.id}
                item={item}
                amount={amount}
                onUpdate={(newAmount) =>
                  update({ id: item.id, amount: newAmount })
                }
                onDelete={() => deleteItem({ id: item.id })}
              />
            ))}
          </div>
          <Button onClick={() => setIsOpen(true)}>Add to fridge</Button>
        </div>
      </div>
      <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Items
          isBasketMode
          onSave={(items) => {
            mutate(items);
            setIsOpen(false);
          }}
        />
      </Dialog>
    </div>
  );
}
