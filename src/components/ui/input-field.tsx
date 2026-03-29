import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const inputFieldWrapperVariants = cva('flex w-full items-center gap-3.5 overflow-hidden', {
  variants: {
    variant: {
      default:
        'rounded-lg border border-input bg-transparent px-2.5 py-1 focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50',
      auth: 'rounded-xl border-[1.5px] border-login-input-border bg-login-input-bg px-4 py-3.5',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

const inputFieldInputVariants = cva(
  'min-w-0 flex-1 border-0 bg-transparent outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'h-6 text-base md:text-sm',
        auth: 'text-[18px] font-medium leading-[1.5] tracking-[-0.27px] text-login-heading',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

interface InputFieldProps
  extends
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputFieldWrapperVariants> {
  iconStart?: React.ReactNode
  iconEnd?: React.ReactNode
  wrapperClassName?: string
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ className, variant, iconStart, iconEnd, wrapperClassName, type, ...props }, ref) => {
    return (
      <div
        data-slot="input-field"
        className={cn(inputFieldWrapperVariants({ variant }), wrapperClassName)}
      >
        {iconStart && (
          <span data-slot="input-field-icon-start" className="shrink-0 text-login-muted">
            {iconStart}
          </span>
        )}
        <input
          type={type}
          className={cn(inputFieldInputVariants({ variant }), className)}
          ref={ref}
          {...props}
        />
        {iconEnd && (
          <div
            data-slot="input-field-icon-end"
            className="flex shrink-0 items-center text-login-muted [&_button]:cursor-pointer"
          >
            {iconEnd}
          </div>
        )}
      </div>
    )
  }
)
InputField.displayName = 'InputField'

export { InputField, inputFieldWrapperVariants, inputFieldInputVariants }
