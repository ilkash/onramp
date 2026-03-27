"use client";

type Props = {
  checked: boolean;
  onChange: (val: boolean) => void;
};

export default function Checkbox({ checked, onChange }: Props) {
  return (
    <div
      onClick={() => onChange(!checked)}
      className={`w-[20px] h-[20px] flex items-center justify-center cursor-pointer shrink-0 ${
        checked
          ? "bg-[var(--color-red)]"
          : "bg-white border-2 border-[var(--color-red)]"
      }`}
    >
      {checked && (
        <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
          <path
            d="M1 5L4.5 8.5L11 1"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
}
