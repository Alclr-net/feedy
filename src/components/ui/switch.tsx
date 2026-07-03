"use client"

import * as React from "react"
import { Switch as SwitchPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

// function Switch({
//   className,
//   size = "default",
//   ...props
// }: React.ComponentProps<typeof SwitchPrimitive.Root> & {
//   size?: "sm" | "default"
// }) {
//   return (
//     <SwitchPrimitive.Root
//       data-slot="switch"
//       data-size={size}
//       className={cn(
//         "peer group/switch relative inline-flex shrink-0 items-center rounded-full border border-transparent transition-all outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive/20 data-[size=default]:h-[18.4px] data-[size=default]:w-[32px] data-[size=sm]:h-[14px] data-[size=sm]:w-[24px] dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:bg-foreground data-unchecked:bg-foreground dark:data-unchecked:bg-foreground dark:data-checked:bg-foreground data-disabled:cursor-not-allowed data-disabled:opacity-50",
//         className
//       )}
//       {...props}
//     >
//       <SwitchPrimitive.Thumb
//         data-slot="switch-thumb"
//         className="pointer-events-none block rounded-full  data-checked:bg-background data-unchecked:bg-background ring-0 transition-transform group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3 group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-2px)] group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-2px)] dark:data-checked:bg-background group-data-[size=default]/switch:data-unchecked:translate-x-0 group-data-[size=sm]/switch:data-unchecked:translate-x-0 dark:data-unchecked:bg-background"
//       />
//     </SwitchPrimitive.Root>
//   )
// }

// export { Switch }
function Switch({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: "sm" | "default"
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer inline-flex shrink-0 items-center rounded-full border border-transparent transition-colors outline-none",
        "focus-visible:ring-1 focus-visible:ring-ring/50",
        "data-[state=checked]:bg-foreground data-[state=unchecked]:bg-input",
        size === "default" ? "h-[18.4px] w-[32px]" : "h-[14px] w-[24px]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block rounded-full bg-background shadow-sm transition-transform",
          size === "default" ? "size-4 data-[state=checked]:translate-x-[calc(100%-2px)]" : "size-3 data-[state=checked]:translate-x-[calc(100%-2px)]",
          "data-[state=unchecked]:translate-x-0"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
