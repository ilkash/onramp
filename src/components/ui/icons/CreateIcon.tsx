type IconProps = {
  size?: number;
  whith?: number;
  height?: number;
  className?: string;
};

export default function CreateIcon({
  whith = 20,
  height = 16,
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

      <svg width="100%" height="100%" viewBox="0 0 20 16" fill="none">
        <rect
          x="0.5"
          y="0.5"
          width="18.7422"
          height="14.8278"
          rx="1.5"
          stroke="currentColor"
        />
        <path
          d="M14.7273 7.91351L6 7.91351"
          stroke="currentColor"
          stroke-width="1.45455"
        />
        <path
          d="M10.3672 12.2775L10.3672 3.55023"
          stroke="currentColor"
          stroke-width="1.45455"
        />
      </svg>
    </span>
  );
}
