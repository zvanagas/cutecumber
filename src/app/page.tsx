'use client';
import { trpc } from '@/client/trpc';
import BasketIcon from '@/icons/basket.icon';
import SaladIcon from '@/icons/salad.icon';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const { data } = trpc.latestCartId.useQuery();

  return (
    <div className="flex flex-col items-center p-4 gap-4">
      <div
        className="flex items-center gap-2 p-4 cursor-pointer bg-white rounded text-black"
        onClick={() => router.push("/active-cart")}
      >
        <span>Shopping cart</span>
        <BasketIcon className="w-14 h-14" />
      </div>
      {!!data && (
        <div
          className="flex items-center gap-2 p-4 cursor-pointer bg-white rounded text-black"
          onClick={() => router.push(`/cart/${data?.cartId}`)}
        >
          <span>Edit active cart</span>
          <BasketIcon className="w-14 h-14" />
        </div>
      )}
      <div
        className="flex items-center gap-2 p-4 cursor-pointer bg-white rounded text-black"
        onClick={() => router.push("/items")}
      >
        <span>Manage items</span>
        <SaladIcon className="w-14 h-14" />
      </div>
    </div>
  );
}
