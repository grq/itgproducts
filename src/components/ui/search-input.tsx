import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Search } from "lucide-react"

const searchInputVariants = cva(
  "flex items-center gap-2 rounded-lg bg-products-search-bg px-5 py-3",
  {
    variants: {
      size: {
        default: "w-full max-w-[1023px]",
        sm: "w-full max-w-[600px]",
        full: "w-full",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

interface SearchInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof searchInputVariants> {
  wrapperClassName?: string
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, size, wrapperClassName, placeholder = "Найти", ...props }, ref) => {
    return (
      <div
        data-slot="search-input"
        className={cn(searchInputVariants({ size }), wrapperClassName)}
      >
        <Search className="size-6 shrink-0 text-products-text-muted" aria-hidden strokeWidth={1.5} />
        <input
          type="search"
          placeholder={placeholder}
          className={cn(
            "min-w-0 flex-1 border-0 bg-transparent text-sm font-normal leading-6 text-products-text outline-none placeholder:text-products-text-secondary",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
SearchInput.displayName = "SearchInput"

export { SearchInput, searchInputVariants }
