type IconProps = {
  size?: number;
  whith?: number;
  height?: number;
  className?: string;
};

export default function CopyIcon({
  whith = 18,
  height = 18,
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
      <svg width="100%" height="100%" viewBox="0 0 18 18" fill="none">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M5.81812 4.36363V2.18182C5.81812 1.78182 6.14539 1.45454 6.54539 1.45454H14.5454C14.9454 1.45454 15.2727 1.78182 15.2727 2.18182V12.3636C15.2727 12.7636 14.9454 13.0909 14.5454 13.0909H11.6363V5.09091C11.6363 4.69091 11.309 4.36363 10.909 4.36363H5.81812Z"
          stroke="currentColor"
          stroke-width="0.727273"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M10.9092 16H2.90916C2.50916 16 2.18188 15.6727 2.18188 15.2727V5.0909C2.18188 4.6909 2.50916 4.36363 2.90916 4.36363H10.9092C11.3092 4.36363 11.6364 4.6909 11.6364 5.0909V15.2727C11.6364 15.6727 11.3092 16 10.9092 16Z"
          stroke="currentColor"
          stroke-width="0.727273"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </span>
  );
}
