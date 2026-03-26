"use client";

type Props = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  totalItems: number;
  visibleItems: number;
  onShowAll: () => void;
};

export default function Pagination({
  page,
  totalPages,
  onChange,
  totalItems,
  visibleItems,
  onShowAll,
}: Props) {
  const isShowAll = visibleItems >= totalItems;

  if (isShowAll) return null;

  const getPages = () => {
    const delta = 1;
    const range: (number | string)[] = [];

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= page - delta && i <= page + delta)
      ) {
        range.push(i);
      } else if (range[range.length - 1] !== "...") {
        range.push("...");
      }
    }

    return range;
  };

  const pages = getPages();

  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      <button
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className="px-2 disabled:opacity-30 cursor-pointer hover:text-black transition-colors disabled:cursor-default text-[20px] font-mono font-bold"
      >
        {"<"}
      </button>

      {pages.map((p, index) =>
        p === "..." ? (
          <span key={`dots-${index}`} className="px-2 text-gray-400">
            ...
          </span>
        ) : (
          <button
            key={`${p}-${index}`}
            onClick={() => onChange(p as number)}
            className={`px-2 cursor-pointer hover:text-black transition-colors text-[20px] font-mono font-bold ${
              p === page ? "font-semibold text-black" : "text-black/40"
            }`}
          >
            {p}
          </button>
        ),
      )}

      <button
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        className="px-2 disabled:opacity-30 cursor-pointer hover:text-black transition-colors disabled:cursor-default text-[20px] font-mono font-bold"
      >
        {">"}
      </button>

      <button
        onClick={onShowAll}
        className="flex items-center justify-center text-[20px] text-black font-mono font-bold cursor-pointer transition-transform hover:scale-105 "
      >
        [SHOW ALL]
      </button>
    </div>
  );
}
