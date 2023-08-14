"use client";
import { trpc } from "@/client/trpc";
import ItemCardWithAmount from "@/components/item-card-with-amount";
import Items from "@/components/items";
import Link from "next/link";

type Props = {
  params: {
    id: string;
  };
};

export default function Cart({ params }: Props) {
  const cartId = Number(params.id);
  const { data } = trpc.cart.useQuery({ cartId });
  const { mutate: remove } = trpc.removeFromCart.useMutation();
  const { mutate: updateAmount } = trpc.updateItemAmount.useMutation();

  return (
    <div className="flex flex-col items-center gap-2 w-full">
      <Link href="/">Go back to home</Link>
      <div className="w-full p-2 flex flex-col items-center gap-2">
        {data?.map((item) => (
          <ItemCardWithAmount
            key={item.id}
            item={item.item}
            amount={item.amount}
            onUpdate={(amount) =>
              updateAmount({ cartId, itemId: item.itemId, amount })
            }
            onDelete={() => remove({ cartId, itemId: item.itemId })}
          />
        ))}
      </div>
      <Items itemsInCart={data} />
    </div>
  );
}
