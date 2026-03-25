type IconProps = {
  size?: number;
  className?: string;
};

export default function StatusSuccessIcon({ size = 16, className }: IconProps) {
  return (
    <span
      className={className}
      style={{
        width: size,
        height: size,
        display: "inline-flex",
      }}
    >
      <svg width="100%" height="100%" viewBox="0 0 16 16">
        <circle cx="8" cy="8" r="8" fill="#00C48C" />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M10.8565 4.88485C11.1959 4.44945 11.8242 4.37093 12.2598 4.71004C12.5287 4.91968 12.6605 5.23944 12.6426 5.55601C12.6382 5.63478 12.6337 5.71382 12.6293 5.79259C12.6186 5.9869 12.5517 6.17995 12.4239 6.34579L8.47561 11.4649C8.31113 11.6781 8.06728 11.8164 7.79983 11.8477C7.53258 11.879 7.26391 11.8011 7.05471 11.6319L3.98342 9.14559C3.55433 8.79806 3.48754 8.16756 3.83499 7.73836C4.18247 7.30958 4.81212 7.24379 5.24124 7.5909L6.88381 8.92098C6.8866 8.92279 6.88983 8.92403 6.8926 8.92586C7.19513 9.12644 7.60108 9.06028 7.82426 8.77403L10.8565 4.88485Z"
          fill="white"
        />
      </svg>
    </span>
  );
}
