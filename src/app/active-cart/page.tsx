'use client';
import { trpc } from '@/client/trpc';
import BackButton from '@/components/back-button';
import Button from '@/components/button';
import ItemCardSelected from '@/components/item-card-selected';
import { useRouter } from 'next/navigation';

export default function ActiveCart() {
  const { data } = trpc.latestCart.useQuery();
  const { mutate } = trpc.togglePickUp.useMutation();
  const { mutate: closeActiveCart } = trpc.closeActiveCart.useMutation();
  const { mutate: saveToFridge } = trpc.saveItemsToFridge.useMutation({
    onSuccess: () => closeActiveCart(),
  });
  const router = useRouter();

  const handleMoveToFridge = () => {
    if (!data || data.length < 1) {
      return;
    }

    const items = data.map(({ itemId, amount }) => ({ itemId, amount }));
    saveToFridge({ items });
  };

  return (
    <div className="flex flex-col w-full items-center">
      <BackButton
        className="absolute top-2 left-2"
        onClick={() => router.back()}
      />
      <h1 className="text-black text-xl">Basket</h1>
      <div className="flex flex-col w-full gap-2 mt-4 p-2">
        {data?.map((item) => (
          <div key={item.item.name} className="relative">
            <ItemCardSelected
              item={item}
              onToggle={() =>
                mutate({
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
    </div>
  );
}
