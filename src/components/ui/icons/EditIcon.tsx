type IconProps = {
  size?: number;
  className?: string;
};

export default function EditIcon({ size = 24, className }: IconProps) {
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

      <svg width="100%" height="100%" viewBox="0 0 24 24">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.40755 18.7638L20.3386 6.84168C21.2204 5.95989 21.2204 4.53824 20.3386 3.65646C19.4568 2.77467 18.0352 2.77467 17.1534 3.65646L5.23132 15.5875L8.40755 18.7638Z"
          fill="#00C48C"
          stroke="#00C48C"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.23146 15.5875L3 20.9952L8.40768 18.7638L5.23146 15.5875Z"
          stroke="#00C48C"
          fill="white"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
