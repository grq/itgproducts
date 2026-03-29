'use client'

import * as React from 'react'
import { Checkbox as CheckboxPrimitive } from 'radix-ui'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { CheckIcon } from 'lucide-react'

const checkboxVariants = cva(
  'peer relative flex shrink-0 items-center justify-center border transition-colors outline-none group-has-disabled/field:opacity-50 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary cursor-pointer',
  {
    variants: {
      variant: {
        default: 'rounded-[4px] border-border dark:bg-input/30',
        auth: 'rounded-[4px] border-muted-foreground bg-login-input-bg',
      },
      size: {
        default: 'size-5',
        auth: 'size-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

const checkboxIndicatorVariants = cva('grid place-content-center text-current transition-none', {
  variants: {
    size: {
      default: '[&>svg]:size-3.5',
      auth: '[&>svg]:size-5',
    },
  },
  defaultVariants: {
    size: 'default',
  },
})

interface CheckboxProps
  extends
  React.ComponentProps<typeof CheckboxPrimitive.Root>,
  VariantProps<typeof checkboxVariants> { }

function Checkbox({ className, variant, size, ...props }: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(checkboxVariants({ variant, size }), className)}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className={checkboxIndicatorVariants({ size })}
      >
        <CheckIcon />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
