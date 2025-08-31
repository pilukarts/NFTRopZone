
"use client";

import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";

export function ProtectedImage({ className, ...props }: ImageProps) {
  return (
    <Image
      className={cn(
        "filter blur-sm hover:blur-none transition-all",
        className
      )}
      onContextMenu={(e) => e.preventDefault()}
      {...props}
    />
  );
}
