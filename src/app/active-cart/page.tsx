'use client';
import { trpc } from '@/client/trpc';
import Button from '@/components/button';
import Dialog from '@/components/dialog';
import ItemCardSelected from '@/components/item-card-selected';
import ItemCardWithActions from '@/components/item-card-with-actions';
import Items from '@/components/items/items';
import NavigationBar from '@/components/navigation-bar';
import { useState } from 'react';

export default function ActiveCartPage() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const { data } = trpc.latestCart.useQuery();
  const { mutate: addToCart } = trpc.addToCart.useMutation();
  const { mutate: remove } = trpc.removeFromCart.useMutation();
  const { mutate: togglePickUp } = trpc.togglePickUp.useMutation();
  const { mutate: updateAmount } = trpc.updateItemAmount.useMutation();
  const { mutate: closeActiveCart } = trpc.closeActiveCart.useMutation();
  const { mutate: saveToFridge } = trpc.saveItemsToFridge.useMutation({
    onSuccess: () => closeActiveCart(),
  });
  const cartId = data?.[0]?.cartId ?? 1;

  const handleMoveToFridge = () => {
    if (!data || data.length < 1) {
      return;
    }

    const items = data.map(({ itemId, amount }) => ({ itemId, amount }));
    saveToFridge({ items });
  };

  const renderSelectableCart = () => (
    <>
      <h1 className="text-black text-xl">Basket</h1>
      <div className="flex flex-col w-full gap-2 mt-4 p-2">
        {!data?.length && <span>No items in basket...</span>}
        {data?.map((item) => (
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
      {data && data.length > 0 && data.every((item) => item.isPickedUp) && (
        <Button onClick={handleMoveToFridge}>Move to fridge</Button>
      )}
    </>
  );

  const renderEditableCart = () => (
    <>
      <h1 className="text-black text-xl">Edit active cart</h1>
      <div className="w-full p-2 flex flex-col items-center gap-2">
        {data?.map((item) => (
          <ItemCardWithActions
            key={item.id}
            item={item.item}
            amount={item.amount}
            onUpdate={(amount) =>
              updateAmount({ cartId, itemId: item.itemId, amount })
            }
            onDelete={() => remove({ cartId, itemId: item.itemId })}
          />
        ))}
        <Button onClick={() => setIsOpen(true)}>Add to cart</Button>
      </div>

      <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Items
          isBasketMode
          itemsInCart={data}
          onSave={(items) => {
            addToCart(items);
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
