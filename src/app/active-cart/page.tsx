'use client';
import { trpc } from '@/client/trpc';
import ItemCardSelected from '@/components/item-card-selected';
import Link from 'next/link';

export default function ActiveCart() {
  const { data } = trpc.latestCart.useQuery();
  const { mutate } = trpc.togglePickUp.useMutation();

  return (
    <div className="flex flex-col w-full items-center">
      <h1 className="text-blue-200 text-xl">Basket</h1>
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
      <div>
        <Link href="/items">Add items</Link>
      </div>
    </div>
  );
}
