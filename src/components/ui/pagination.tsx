import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"

function Pagination({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="pagination"
      className={cn("flex items-center justify-between py-[11px]", className)}
      {...props}
    >
      {children}
    </div>
  )
}

interface PaginationInfoProps extends React.HTMLAttributes<HTMLParagraphElement> {
  from: number
  to: number
  total: number
}

function PaginationInfo({
  className,
  from,
  to,
  total,
  ...props
}: PaginationInfoProps) {
  return (
    <p
      data-slot="pagination-info"
      className={cn(
        "m-0 font-sans text-lg font-normal leading-normal text-products-heading-dark",
        className
      )}
      {...props}
    >
      <span className="text-products-text-secondary">Показано </span>
      <span>{from}-</span>
      <span>{to}</span>
      <span> </span>
      <span className="text-products-text-secondary">из</span>
      <span> {total} </span>
    </p>
  )
}

function PaginationNav({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="pagination-nav"
      className={cn("flex items-center gap-4", className)}
      {...props}
    >
      {children}
    </div>
  )
}

interface PaginationPrevProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

function PaginationPrev({ className, ...props }: PaginationPrevProps) {
  return (
    <button
      data-slot="pagination-prev"
      type="button"
      className={cn("cursor-pointer border-0 bg-transparent p-0", className)}
      {...props}
    >
      <ChevronLeft className="size-5 text-products-text" aria-hidden strokeWidth={1.5} />
    </button>
  )
}

interface PaginationNextProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

function PaginationNext({ className, ...props }: PaginationNextProps) {
  return (
    <button
      data-slot="pagination-next"
      type="button"
      className={cn("cursor-pointer border-0 bg-transparent p-0", className)}
      {...props}
    >
      <ChevronRight className="size-5 text-products-text" aria-hidden strokeWidth={1.5} />
    </button>
  )
}

function PaginationPages({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="pagination-pages"
      className={cn("flex items-center gap-2", className)}
      {...props}
    >
      {children}
    </div>
  )
}

const paginationPageVariants = cva(
  "flex size-[30px] items-center justify-center rounded font-heading text-sm font-normal leading-none shadow-[0_20px_50px_rgba(0,0,0,0.12)]",
  {
    variants: {
      active: {
        true: "border-0 bg-products-primary-light text-white",
        false: "border border-solid border-products-border-light text-products-text-muted",
      },
    },
    defaultVariants: {
      active: false,
    },
  }
)

interface PaginationPageProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof paginationPageVariants> {
  page: number
}

function PaginationPage({
  className,
  active,
  page,
  ...props
}: PaginationPageProps) {
  return (
    <button
      data-slot="pagination-page"
      type="button"
      className={cn(paginationPageVariants({ active }), className)}
      {...props}
    >
      {page}
    </button>
  )
}

export {
  Pagination,
  PaginationInfo,
  PaginationNav,
  PaginationPrev,
  PaginationNext,
  PaginationPages,
  PaginationPage,
}
