import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const pageLayoutVariants = cva("min-h-screen", {
  variants: {
    variant: {
      default: "bg-background",
      products: "bg-products-canvas",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

interface PageLayoutProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pageLayoutVariants> {}

function PageLayout({ className, variant, children, ...props }: PageLayoutProps) {
  return (
    <div
      data-slot="page-layout"
      className={cn(pageLayoutVariants({ variant }), className)}
      {...props}
    >
      <div className="mx-auto box-border w-[1920px] max-w-full px-[30px] pb-10 pt-5">
        <div className="flex flex-col gap-[30px]">{children}</div>
      </div>
    </div>
  )
}

const pageHeaderVariants = cva(
  "flex items-center justify-between rounded-[10px] bg-products-card px-[30px]",
  {
    variants: {
      size: {
        default: "h-[105px]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

interface PageHeaderProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof pageHeaderVariants> {
  title?: string
}

function PageHeader({
  className,
  size,
  title,
  children,
  ...props
}: PageHeaderProps) {
  return (
    <header
      data-slot="page-header"
      className={cn(pageHeaderVariants({ size }), className)}
      {...props}
    >
      {title && (
        <h1 className="m-0 font-heading text-2xl font-bold leading-none text-products-heading">
          {title}
        </h1>
      )}
      {children}
    </header>
  )
}

const contentCardVariants = cva(
  "flex flex-col gap-10 rounded-xl bg-products-card p-[30px]",
  {
    variants: {
      size: {
        default: "min-h-[669px]",
        auto: "",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

interface ContentCardProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof contentCardVariants> {}

function ContentCard({ className, size, ...props }: ContentCardProps) {
  return (
    <section
      data-slot="content-card"
      className={cn(contentCardVariants({ size }), className)}
      {...props}
    />
  )
}

function SectionHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="section-header"
      className={cn("flex items-center justify-between", className)}
      {...props}
    >
      {children}
    </div>
  )
}

function SectionTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      data-slot="section-title"
      className={cn(
        "m-0 font-heading text-xl font-bold leading-5 text-products-heading-dark",
        className
      )}
      {...props}
    />
  )
}

function SectionActions({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="section-actions"
      className={cn("flex items-start gap-2", className)}
      {...props}
    />
  )
}

export {
  PageLayout,
  PageHeader,
  ContentCard,
  SectionHeader,
  SectionTitle,
  SectionActions,
}
