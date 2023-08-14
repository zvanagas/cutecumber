import ItemCard from "./item-card";
import CheckIcon from "@/icons/check.icon";
import { CartItemWithCategory } from "@/types/item";

type Props = {
  item: CartItemWithCategory;
  onToggle: () => void;
};

const ItemCardSelected = ({ item, onToggle }: Props) => (
  <ItemCard
    item={item.item}
    amount={item.amount}
    className={`cursor-pointer transition-all ${
      item.isPickedUp ? "opacity-50" : undefined
    }`}
    onClick={onToggle}
    renderContent={() => item.isPickedUp && <CheckIcon />}
  />
);

export default ItemCardSelected;
