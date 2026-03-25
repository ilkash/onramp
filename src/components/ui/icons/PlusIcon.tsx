type IconProps = {
  size?: number;
  whith?: number;
  height?: number;
  className?: string;
};

export default function PlusIcon({
  whith = 14,
  height = 14,
  className,
}: IconProps) {
  return (
    <span
      className={className}
      style={{
        width: whith,
        height: height,
        display: "inline-flex",
      }}
    >
      <svg width="100%" height="100%" viewBox="0 0 14 14" fill="none">
        <path
          d="M13.8182 6.90918L0 6.90918"
          stroke="currentColor"
          strokeWidth="2.18182"
        />
        <path
          d="M6.91479 13.8183L6.91479 8.7738e-05"
          stroke="currentColor"
          strokeWidth="2.18182"
        />
      </svg>
    </span>
  );
}
