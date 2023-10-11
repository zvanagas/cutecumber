'use client';
import { trpc } from '@/client/trpc';
import Card from '@/components/card';
import BasketIcon from '@/icons/basket.icon';
import MilkIcon from '@/icons/milk.icon';
import SaladIcon from '@/icons/salad.icon';
import WatermelonIcon from '@/icons/watermelon.icon';

export default function Home() {
  const { data } = trpc.latestCartId.useQuery();

  return (
    <div className="flex flex-col items-center w-full p-2 gap-4">
      <Card link="/fridge" label="What's inside a fridge?" Icon={MilkIcon} />
      <Card link="/active-cart" label="Active cart" Icon={BasketIcon} />
      {!!data && (
        <Card
          link={`/cart/${data?.cartId}`}
          label="Edit active cart"
          Icon={WatermelonIcon}
        />
      )}
      <Card link="/items" label="Manage items" Icon={SaladIcon} isDisabled />
    </div>
  );
}
