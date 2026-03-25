type IconProps = {
  size?: number;
  whith?: number;
  height?: number;
  className?: string;
};

export default function LogoutIcon({
  whith = 19,
  height = 19,
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
      <svg width="100%" height="100%" viewBox="0 0 19 19" fill="none">
        <path
          d="M6.5 18.5H2.5C1.96957 18.5 1.46086 18.2893 1.08579 17.9142C0.710714 17.5391 0.5 17.0304 0.5 16.5V2.5C0.5 1.96957 0.710714 1.46086 1.08579 1.08579C1.46086 0.710714 1.96957 0.5 2.5 0.5H6.5"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M13.5 14.5L18.5 9.5L13.5 4.5"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M18.5 9.5H6.5"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </span>
  );
}
