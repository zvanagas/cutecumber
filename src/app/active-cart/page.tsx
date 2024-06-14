'use client';
import { trpc } from '@/client/trpc';
import { Button } from '@/components/button';
import { ItemCardCollapse } from '@/components/item-card-collapse';
import { ItemCardSelected } from '@/components/item-card-selected';
import { Items } from '@/components/items/items';
import { NavigationBar } from '@/components/navigation-bar';
import { useEffect, useState } from 'react';

export default function ActiveCartPage() {
  const [isEditMode, setIsEditMode] = useState(false);
  const { data, isLoading } = trpc.cart.getLatest.useQuery();
  const { mutate: addToCart } = trpc.cart.add.useMutation();
  const { mutate: remove } = trpc.cart.removeSingle.useMutation();
  const { mutate: togglePickUp } = trpc.cart.togglePickUp.useMutation();
  const { mutate: updateAmount } = trpc.cart.updateAmount.useMutation();

  useEffect(() => {
    if (!isEditMode && !isLoading && !data?.items.length) {
      setIsEditMode(true);
    }
  }, [data?.items.length, isEditMode, isLoading]);

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
      <div className="flex justify-center flex-wrap w-full gap-2 mt-4 p-2">
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
        <div className="flex gap-2">
          {data?.items.map((item) => (
            <ItemCardCollapse
              key={item.id}
              item={item.item}
              amount={item.amount}
              onSave={(id, amount) =>
                updateAmount({
                  cartId: item.cartId,
                  itemId: id,
                  amount,
                })
              }
              onDelete={() =>
                remove({ cartId: item.cartId, itemId: item.itemId })
              }
            />
          ))}
        </div>
      </div>
      <Items
        isBasketMode
        itemsInCart={data?.items}
        onSave={({ items }) => {
          if (!data?.id) {
            return;
          }

          addToCart({ cartId: data?.id, items });
        }}
      />
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
