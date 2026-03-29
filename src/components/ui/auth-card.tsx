import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const authCardOuterVariants = cva('bg-white shadow-login-card', {
  variants: {
    size: {
      default: 'w-full max-w-[527px] rounded-login-card-outer p-[6px]',
    },
  },
  defaultVariants: {
    size: 'default',
  },
})

const authCardInnerVariants = cva(
  [
    'flex flex-col gap-8 overflow-hidden bg-white',
    'border border-login-input-border',
    'rounded-login-card-inner p-12',
    'bg-gradient-to-b from-[rgba(35,35,35,0.03)] from-0% to-[rgba(35,35,35,0)] to-50%',
  ].join(' '),
  {
    variants: {
      size: {
        default: '',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
)

interface AuthCardProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof authCardOuterVariants> {}

function AuthCard({ className, size, children, ...props }: AuthCardProps) {
  return (
    <div
      data-slot="auth-card"
      className={cn(authCardOuterVariants({ size }), className)}
      {...props}
    >
      <div className={authCardInnerVariants({ size })}>{children}</div>
    </div>
  )
}

const authCardLogoVariants = cva(
  [
    'mx-auto flex size-[52px] items-center justify-center rounded-full',
    'border border-[rgba(237,237,237,0.7)] bg-white',
    'bg-gradient-to-b from-[rgba(35,35,35,0.06)] from-0% to-[rgba(35,35,35,0)] to-50%',
    'shadow-[0_0_0_2px_white,0_12px_8px_0_rgba(0,0,0,0.03)]',
  ].join(' ')
)

function AuthCardLogo({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div data-slot="auth-card-logo" className={cn(authCardLogoVariants(), className)} {...props}>
      {children}
    </div>
  )
}

function AuthCardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="auth-card-header"
      className={cn('flex flex-col gap-3 text-center', className)}
      {...props}
    />
  )
}

function AuthCardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      data-slot="auth-card-title"
      className={cn(
        'font-heading text-[40px] font-semibold leading-[1.1] tracking-[-0.6px] text-login-heading',
        className
      )}
      {...props}
    />
  )
}

function AuthCardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      data-slot="auth-card-description"
      className={cn('text-[18px] font-medium leading-normal text-login-subtitle', className)}
      {...props}
    />
  )
}

function AuthCardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="auth-card-content"
      className={cn('mx-auto flex w-full max-w-[399px] flex-col gap-5', className)}
      {...props}
    />
  )
}

function AuthCardFooter({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      data-slot="auth-card-footer"
      className={cn('text-center text-[18px] leading-normal text-login-footer', className)}
      {...props}
    />
  )
}

function AuthCardDivider({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="auth-card-divider"
      className={cn('flex w-full items-center gap-2.5', className)}
      {...props}
    >
      <div className="h-px flex-1 bg-login-separator" />
      <span className="text-base font-medium text-login-separator">{children}</span>
      <div className="h-px flex-1 bg-login-separator" />
    </div>
  )
}

export {
  AuthCard,
  AuthCardLogo,
  AuthCardHeader,
  AuthCardTitle,
  AuthCardDescription,
  AuthCardContent,
  AuthCardFooter,
  AuthCardDivider,
}
