type StatusBadgeProps = {
  status: "active" | "inactive";
  children: React.ReactNode;
};

export default function StatusBadge({ status, children }: StatusBadgeProps) {
  const isActive = status === "active";

  return (
    <div
      className={`
        inline-flex items-center
        h-[29px]
        rounded-full
        text-white
        font-[600]
        text-[14px]
        px-[3px]
        py-[10px]
        ${isActive ? "pr-2" : ""}
        gap-1
        ${isActive ? "bg-[var(--color-green)]" : "bg-[var(--color-red)]"}
      `}
    >
      {/* іконка зліва */}
      {isActive && (
        <div className="flex items-center justify-center w-[25px] h-[25px] bg-white rounded-full shrink-0">
          {children}
        </div>
      )}

      {/* текст */}
      <span className="leading-none whitespace-nowrap">
        {isActive ? "Active" : "Inactive"}
      </span>

      {/* іконка справа */}
      {!isActive && (
        <div className="flex items-center justify-center w-[25px] h-[25px] bg-white rounded-full shrink-0">
          {children}
        </div>
      )}
    </div>
  );
}
