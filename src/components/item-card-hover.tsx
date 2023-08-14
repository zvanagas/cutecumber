import { ItemWithCategory } from "@/types/item";
import { useState } from "react";

type Props = {
  item: ItemWithCategory;
  onAddToCard?: (item: ItemWithCategory, amount: number) => void;
};

const ItemCardHover = ({ item, onAddToCard }: Props) => {
  const [amount, setAmount] = useState<number>(1);

  return (
    <div className="w-full h-full opacity-0 absolute hover:opacity-80 bg-white text-black flex flex-col justify-center items-center">
      <div className="flex gap-2">
        <button
          className="px-2 border"
          disabled={amount === 1}
          onClick={() => setAmount(amount - 1)}
        >
          -
        </button>
        <span>{amount}</span>
        <button className="px-2 border" onClick={() => setAmount(amount + 1)}>
          +
        </button>
      </div>
      <button
        className="mt-3 border px-2"
        onClick={() => onAddToCard?.(item, amount)}
      >
        Add
      </button>
    </div>
  );
};

export default ItemCardHover;
