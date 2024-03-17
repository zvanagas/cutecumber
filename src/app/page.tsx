'use client';
import Card from '@/components/card';
import NavigationBar from '@/components/navigation-bar';
import { BasketIcon } from '@/icons/basket.icon';
import { BowlIcon } from '@/icons/bowl.icon';
import { EmptyBasketIcon } from '@/icons/empty-basket';
import { MilkIcon } from '@/icons/milk.icon';
import { SaladIcon } from '@/icons/salad.icon';

export default function Home() {
  return (
    <>
      <NavigationBar />
      <div className="flex flex-col items-center w-full p-2 gap-4">
        <Card link="/fridge" label="What's inside a fridge?" Icon={MilkIcon} />
        <Card link="/active-cart" label="Active cart" Icon={BasketIcon} />
        <Card link="/create-cart" label="Create cart" Icon={EmptyBasketIcon} />
        <Card link="/create-category" label="Create category" Icon={BowlIcon} />
        <Card link="/items" label="Manage items" Icon={SaladIcon} />
      </div>
    </>
  );
}
