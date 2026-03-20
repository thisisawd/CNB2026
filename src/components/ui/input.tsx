import * as React from "react";

import { cn } from "./utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-9 w-full min-w-0 px-3 py-1 text-base bg-transparent border-0 border-b-2 border-[#b3b3b3] dark:border-[#5d5d5d] transition-all outline-none",
        "placeholder:text-[#a19f9d] dark:placeholder:text-[#8a8886]",
        "hover:border-b-[#323130] dark:hover:border-b-[#c8c6c4]",
        "focus:border-b-2 focus:border-b-[#7719aa] dark:focus:border-b-[#8661c5]",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "md:text-sm",
        className,
      )}
      {...props}
    />
  );
}

export { Input };