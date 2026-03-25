type IconProps = {
  size?: number;
  whith?: number;
  height?: number;
  className?: string;
};

export default function ExportIcon({
  whith = 20,
  height = 20,
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
      <svg width="100%" height="100%" viewBox="0 0 20 20" fill="none">
        <path
          d="M10 2V14"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 10L10 14L6 10"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2 12V16C2 17.1046 2.89543 18 4 18H16C17.1046 18 18 17.1046 18 16V12"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
