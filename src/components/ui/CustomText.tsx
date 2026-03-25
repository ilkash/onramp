import React from "react";
interface TextProps {
  children: React.ReactNode;
  styleType:
    | "error"
    | "logo"
    | "label"
    | "success"
    | "title"
    | "rate"
    | "default"
    | "success_failed"
    | "failed_data"
    | "failed_amount"
    | "logo_sm";
  className?: string;
}

const CustomText: React.FC<TextProps> = ({
  children,
  styleType,
  className,
  ...props
}) => {
  const baseStyles = `font-widget-sc-primary font-regular`;
  const styles = {
    error: "text-widget-sc-error text-[10px] text-left mb-4 inline-block",
    logo: "text-sm text-[#D9D9D9] font-medium mb-2 text-left text-[18px] tracking-wider",
    logo_sm:
      "text-[16px] text-[#D9D9D9] font-medium mb-2 text-left tracking-wider",
    label: "text-[16px] text-label text-left leading-none",
    default: "text-[#D9D9D9] text-[12px]",
    success: "text-[#2AB874] text-[10px] text-center inline-block mt-3 w-full",
    title: "text-[16px] font-medium text-center tracking-wide",
    rate: "text-[12px] text-label text-left",
    success_failed:
      "text-[32px] font-widget-sc-primary text-widget-sc-accent font-medium  text-center leading-[28px]",
    failed_data: "text-[15px] text-black  font-widget-sc-primary ",
    failed_amount: "text-[15px] font-widget-sc-primary text-widget-sc-accent",
  };

  const appliedStyles = `${baseStyles} ${styles[styleType] || ""} ${className}`;
  return (
    <p className={appliedStyles} {...props}>
      {children}
    </p>
  );
};

export default CustomText;
