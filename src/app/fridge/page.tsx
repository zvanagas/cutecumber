'use client';
import { trpc } from '@/client/trpc';
import { Button } from '@/components/button';
import { Dialog } from '@/components/dialog';
import { ItemCardWithActions } from '@/components/item-card-with-actions';
import { Items } from '@/components/items/items';
import { NavigationBar } from '@/components/navigation-bar';
import { Fragment, useMemo, useState } from 'react';

export default function FridgePage() {
  const { data, isLoading } = trpc.fridge.getAll.useQuery();
  const { mutate } = trpc.fridge.save.useMutation();
  const { mutate: update } = trpc.fridge.updateSingle.useMutation();
  const { mutate: deleteItem } = trpc.fridge.deleteSingle.useMutation();
  const [searchValue, setSearchValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const items = useMemo(
    () =>
      data?.filter(({ item }) =>
        item.name.toLowerCase().includes(searchValue)
      ) ?? [],
    [data, searchValue]
  );

  return (
    <div className="flex flex-col gap-4">
      <NavigationBar isBackButtonShown>
        <Button onClick={() => setIsOpen(true)}>Add to fridge</Button>
      </NavigationBar>
      <div className="px-1">
        <div className="flex flex-col gap-4 w-full items-center p-2 dark:bg-slate-800 shadow-sm dark:shadow-white rounded">
          <div className="flex flex-col gap-4">
            <h1 className="text-black dark:text-white text-xl">
              What&apos;s inside a fridge?
            </h1>
            <input
              className="w-30 h-8 text-black p-4 border rounded-md"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
          <div className="w-60 h-0.5 bg-white opacity-10 rounded" />
          <div className="flex flex-col items-center w-full gap-2">
            {isLoading && <span className="dark:text-white">Loading...</span>}
            {!isLoading && items.length < 1 && (
              <span className="dark:text-white">No items in the fridge...</span>
            )}
            {items.map(({ item, amount }, index) => (
              <Fragment key={item.id}>
                <ItemCardWithActions
                  item={item}
                  amount={amount}
                  onUpdate={(newAmount) =>
                    update({ id: item.id, amount: newAmount })
                  }
                  onDelete={() => deleteItem({ id: item.id })}
                />
                {items.length - 1 > index && (
                  <div className="w-60 h-0.5 bg-white opacity-10 rounded" />
                )}
              </Fragment>
            ))}
          </div>
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
