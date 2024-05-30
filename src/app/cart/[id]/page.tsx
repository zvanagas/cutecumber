'use client';
import { trpc } from '@/client/trpc';
import { BackButton } from '@/components/back-button';
import { Button } from '@/components/button';
import { Dialog } from '@/components/dialog';
import { ItemCardCollapse } from '@/components/item-card-collapse';
import { Items } from '@/components/items/items';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Props = {
  params: {
    id: string;
  };
};

export default function CartPage({ params }: Props) {
  const cartId = Number(params.id);
  const [isOpen, setIsOpen] = useState(false);
  const { data } = trpc.cart.getSingle.useQuery({ cartId });
  const { mutate: remove } = trpc.cart.removeSingle.useMutation();
  const { mutate: updateAmount } = trpc.cart.updateAmount.useMutation();
  const { mutate: addToCart } = trpc.cart.add.useMutation();
  const router = useRouter();

  return (
    <>
      <BackButton
        className="absolute top-2 left-2"
        onClick={() => router.back()}
      />
      <div className="flex flex-col items-center gap-2 w-full">
        <h1 className="text-black text-xl">Edit active cart</h1>
        <div className="w-full p-2 flex flex-col items-center gap-2">
          {data?.items.map((item) => (
            <ItemCardCollapse
              key={item.id}
              item={item.item}
              amount={item.amount}
              onSave={(amount) =>
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
            itemsInCart={data?.items}
            onSave={({ items }) => {
              addToCart({ cartId, items });
              setIsOpen(false);
            }}
          />
        </Dialog>
      </div>
    </>
  );
}
