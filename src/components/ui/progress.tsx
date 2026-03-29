import * as React from "react"
import { Progress as ProgressPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

type ProgressProps = React.ComponentProps<typeof ProgressPrimitive.Root> & {
  indeterminate?: boolean
}

function Progress({ className, value, indeterminate, ...props }: ProgressProps) {
  if (indeterminate) {
    return (
      <ProgressPrimitive.Root
        data-slot="progress"
        data-state="indeterminate"
        value={null}
        className={cn(
          "relative flex h-1 w-full items-center overflow-x-hidden rounded-full bg-muted",
          className
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator
          data-slot="progress-indicator"
          className="absolute inset-y-0 left-0 w-1/3 bg-primary motion-safe:animate-[progress-indeterminate_1.2s_ease-in-out_infinite]"
        />
      </ProgressPrimitive.Root>
    )
  }

  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "relative flex h-1 w-full items-center overflow-x-hidden rounded-full bg-muted",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="size-full flex-1 bg-primary transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
