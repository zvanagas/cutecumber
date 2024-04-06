import { Category } from '@prisma/client';

type Props = {
  onCategoryClick: (id?: number) => void;
  categories?: Category[];
  categoryId?: number;
};

export const Categories = ({
  categories,
  categoryId,
  onCategoryClick,
}: Props) => (
  <div className="flex justify-center gap-2 flex-wrap">
    <label className="cursor-pointer">
      <input
        className="peer sr-only"
        type="radio"
        name="all"
        checked={!categoryId}
        onChange={() => onCategoryClick(undefined)}
      />
      <div className="rounded-md px-2 py-1 box-border border dark:text-white peer-checked:bg-green-600 peer-checked:text-white">
        All
      </div>
    </label>
    {categories?.map(({ id, name }) => (
      <label key={id} className="cursor-pointer">
        <input
          className="peer sr-only"
          type="radio"
          name={name}
          value={id}
          checked={categoryId === id}
          onChange={({ target }) => onCategoryClick(Number(target.value))}
        />
        <div className="rounded-md px-2 py-1 box-border border dark:text-white peer-checked:bg-green-600 peer-checked:text-white">
          {name}
        </div>
      </label>
    ))}
  </div>
);
