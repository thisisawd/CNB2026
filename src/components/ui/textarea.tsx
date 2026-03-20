import * as React from "react";

import { cn } from "./utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-16 w-full px-3 py-2 text-base bg-transparent border-0 border-b border-[#edebe9] dark:border-[#3d3d3d] transition-all outline-none resize-none",
        "placeholder:text-[#a19f9d] dark:placeholder:text-[#8a8886]",
        "hover:border-b-[#323130] dark:hover:border-b-[#c8c6c4]",
        "focus:border-b-2 focus:border-b-[#0078d4] dark:focus:border-b-[#2899f5] focus:-mb-px",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "md:text-sm",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };