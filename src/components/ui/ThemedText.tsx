import { cn } from "@/utils";
import React from "react";

export type textEnum =
  | "page_title"
  | "sidebar_section"
  | "sidebar_item"
  | "table_header"
  | "table_cell"
  | "button"
  | "status"
  | "input_individual"
  | "auth"
  | "formModal";

export type ThemedTextProps = React.HTMLAttributes<HTMLSpanElement> & {
  type?: textEnum;
  className?: string;
};

export function ThemedText({
  type = "table_cell",
  className = "",
  ...rest
}: ThemedTextProps) {
  return (
    <span
      className={cn(
        `
        ${
          type === "page_title" &&
          "text-[24px] font-semibold font-open-sans text-black"
        }

        ${
          type === "sidebar_section" &&
          "text-[18px] font-semibold font-open-sans text-black"
        }

        ${
          type === "sidebar_item" &&
          "text-[16px] font-semibold font-open-sans text-black"
        }

        ${
          type === "table_header" &&
          "text-[14px] font-normal font-open-sans text-black"
        }

        ${
          type === "table_cell" &&
          "text-[14px] font-normal font-open-sans text-black"
        }

        ${
          type === "button" &&
          "text-[14px] font-semibold font-fira-code text-white"
        }
        ${type === "input_individual" && "text-[12px] font-poppins leading-[1.35] text-[#E60A14]"}

        ${type === "status" && "text-[14px] font-semibold font-open-sans"}

       ${type === "auth" && "text-[18px] font-medium font-mono text-[#E60A14]"}
       ${type === "formModal" && " text-[var(--color-dark-red)] text-[10px] font-poppins"}
        `,
        className,
      )}
      {...rest}
    />
  );
}
