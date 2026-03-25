type IconProps = {
  size?: number;
  className?: string;
};

export default function CoursePassedIcon({ size = 16, className }: IconProps) {
  return (
    <span
      className={className}
      style={{
        width: size,
        height: size,
        display: "inline-flex",
      }}
    >
      {/* вставляєш SVG сюди */}

      <svg width="100%" height="100%" viewBox="0 0 16 16">
        <circle cx="8" cy="8" r="8" fill="#FE0000" />
        <path
          d="M4.46313 4.47046L12.037 12.0293"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
        />
        <path
          d="M4.4707 12.0369L12.0295 4.46297"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>
    </span>
  );
}
