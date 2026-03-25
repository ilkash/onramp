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
        <circle cx="19.1598" cy="15.6073" r="5.35982" fill="white" />
        <path d="M23.5234 15.6069L14.7961 15.6069" stroke="currentColor" />
        <path d="M19.1633 19.9709L19.1633 11.2436" stroke="currentColor" />
      </svg>
    </span>
  );
}
