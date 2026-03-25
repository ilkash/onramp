type IconProps = {
  size?: number;
  whith?: number;
  height?: number;
  className?: string;
};

export default function CreateIcon({
  whith = 25,
  height = 21,
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
      {/* вставляєш SVG сюди */}

      <svg width="100%" height="100%" viewBox="0 0 25 21" fill="none">
        <rect
          x="0.5"
          y="0.5"
          width="18.7422"
          height="14.8278"
          rx="1.5"
          stroke="currentColor"
        />
        <path
          d="M11.9584 9.73402C12.2713 9.85233 12.6219 9.70347 12.754 9.39617L15.059 4.03579C15.1954 3.71857 15.0488 3.35082 14.7316 3.2144C14.4143 3.07798 14.0466 3.22456 13.9102 3.54182L11.8414 8.35281L7.38025 6.66574C7.08813 6.55527 6.75929 6.6773 6.60995 6.95158L4.49704 10.832C4.3319 11.1352 4.44389 11.515 4.74716 11.6801C5.05044 11.8453 5.43017 11.7333 5.59531 11.43L7.44761 8.02817L11.9584 9.73402Z"
          fill="currentColor"
        />
      </svg>
    </span>
  );
}
