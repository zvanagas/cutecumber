'use client';
import { trpc } from '@/client/trpc';
import { Button } from '@/components/button';
import { Dialog } from '@/components/dialog';
import { ItemCardSelected } from '@/components/item-card-selected';
import { ItemCardWithActions } from '@/components/item-card-with-actions';
import { Items } from '@/components/items/items';
import { NavigationBar } from '@/components/navigation-bar';
import { useState } from 'react';

export default function ActiveCartPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const { data, isLoading } = trpc.cart.getLatest.useQuery();
  const { mutate: addToCart } = trpc.cart.add.useMutation();
  const { mutate: remove } = trpc.cart.removeSingle.useMutation();
  const { mutate: togglePickUp } = trpc.cart.togglePickUp.useMutation();
  const { mutate: updateAmount } = trpc.cart.updateAmount.useMutation();

  const handleMoveToFridge = () => {
    if (!data || data.items.length < 1) {
      return;
    }

    const items = data.items.map(({ itemId, amount }) => ({ itemId, amount }));
    saveToFridge({ items });
  };

  const { mutate: closeActiveCart } = trpc.cart.close.useMutation({
    onSuccess: handleMoveToFridge,
  });
  const { mutate: saveToFridge } = trpc.fridge.save.useMutation();

  const renderSelectableCart = () => (
    <>
      <h1 className="text-black dark:text-white text-xl">{data?.name}</h1>
      <div className="flex flex-col w-full gap-2 mt-4 p-2">
        {isLoading && (
          <span className="dark:text-white text-center">Loading...</span>
        )}
        {!isLoading && !data?.items.length && (
          <span className="dark:text-white text-center">
            No items in basket...
          </span>
        )}
        {data?.items.map((item) => (
          <div key={item.item.name} className="relative">
            <ItemCardSelected
              item={item}
              onToggle={() =>
                togglePickUp({
                  cartId: item.cartId,
                  itemId: item.itemId,
                  isPickedUp: !item.isPickedUp,
                })
              }
            />
          </div>
        ))}
      </div>
      {data &&
        data.items.length > 0 &&
        data.items.every((item) => item.isPickedUp) && (
          <Button
            onClick={() => data?.id && closeActiveCart({ cartId: data.id })}
          >
            Done shopping
          </Button>
        )}
    </>
  );

  const renderEditableCart = () => (
    <>
      <h1 className="text-black dark:text-white text-xl">Edit active cart</h1>
      <div className="w-full p-2 flex flex-col items-center gap-2">
        {data?.items.map((item) => (
          <ItemCardWithActions
            key={item.id}
            item={item.item}
            amount={item.amount}
            onUpdate={(amount) =>
              updateAmount({ cartId: item.cartId, itemId: item.itemId, amount })
            }
            onDelete={() =>
              remove({ cartId: item.cartId, itemId: item.itemId })
            }
          />
        ))}
        <Button onClick={() => setIsOpen(true)}>Add to cart</Button>
      </div>

      <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Items
          isBasketMode
          itemsInCart={data?.items}
          onSave={({ items }) => {
            if (!data?.id) {
              return;
            }

            addToCart({ cartId: data?.id, items });
            setIsOpen(false);
          }}
        />
      </Dialog>
    </>
  );

  return (
    <div className="flex flex-col w-full items-center gap-4">
      <NavigationBar isBackButtonShown>
        <Button onClick={() => setIsEditMode(!isEditMode)}>
          {isEditMode ? 'Shopping mode' : 'Edit mode'}
        </Button>
      </NavigationBar>
      {isEditMode ? renderEditableCart() : renderSelectableCart()}
    </div>
  );
}
