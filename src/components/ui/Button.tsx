import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  styleType: "checkout" | "confirm" | "send" | "toggle";
  children: React.ReactNode;
  className?: string;
  isActive?: boolean;
}

const Button = ({
  children,
  styleType,
  className,
  isActive = false,
  ...props
}: ButtonProps) => {
  const baseStyles = "cursor-pointer transition-colors duration-400";

  const typeStyles = {
    checkout: `
    font-bold 
    ml-auto inline-block
    bg-transparent
    text-widget-sc-primary-text
    font-widget-sc-primary
    font-semibold
    border-0 
    py-2 px-3 -mr-3 -mt-2
    uppercase
    text-[14px]
    sm:text-[24px]
    hover:bg-transparent
    hover:text-widget-sc-accent
    disabled:bg-disabled
    disabled:text-widget-sc-disabled-text
    disabled:cursor-not-allowed
    `,
    confirm: `
      uppercase inline-block font-widget-sc-primary font-medium bg-transparent text-widget-sc-primary-text border-none py-2 px-3 -mr-3 -mt-2 text-[18px] sm:text-[24px] 
      disabled:bg-disabled disabled:text-widget-sc-disabled-text disabled:cursor-not-allowed
      hover:bg-transparent hover:text-widget-sc-accent transition-colors duration-500
    `,
    send: `
       inline-block  font-bold  font-widget-sc-primary bg-transparent text-widget-sc-primary-text border-none py-2 px-3 text-[24px] 
      disabled:bg-disabled disabled:text-widget-sc-disabled-text disabled:cursor-not-allowed
      hover:bg-transparent hover:text-widget-sc-accent transition-colors duration-500
    `,
    toggle: `
      border border-red-500 font-medium bg-transparent text-black text-[14px] p-2 font-mono 
      hover:border-black transition-colors-200
      transition-colors duration-200
    `,
  };

  const activeStyles: Partial<Record<typeof styleType, string>> = {
    toggle:
      "bg-widget-sc-accent text-white text-[12px] font-widget-sc-primary text-[14px]",
  };

  return (
    <button
      className={clsx(
        baseStyles,
        className,
        !isActive || !activeStyles[styleType] ? typeStyles[styleType] : "",

        isActive && activeStyles[styleType],
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
