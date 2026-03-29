import {
  TableCell, TableRow
} from '@/components/ui/table'

export function ProductsTableSkeleton({ rowCount }: { rowCount: number }) {
  return (
    <>
      {Array.from({ length: rowCount }, (_, rowIndex) => (
        <TableRow key={`sk-${rowIndex}`} className="hover:bg-transparent">
          <TableCell className="h-16">
            <div className="mx-auto h-4 w-4 animate-pulse rounded-sm bg-muted" />
          </TableCell>
          <TableCell className="h-16">
            <div className="flex items-center gap-3">
              <div className="size-12 shrink-0 animate-pulse rounded-lg bg-muted" />
              <div className="min-w-0 flex-1 space-y-2">
                <div className="h-4 w-full max-w-[min(100%,20rem)] animate-pulse rounded-md bg-muted" />
                <div className="h-3 w-2/3 animate-pulse rounded-md bg-muted" />
              </div>
            </div>
          </TableCell>
          <TableCell className="h-16">
            <div className="mx-auto h-4 w-16 animate-pulse rounded-md bg-muted" />
          </TableCell>
          <TableCell className="h-16">
            <div className="mx-auto h-4 w-20 animate-pulse rounded-md bg-muted" />
          </TableCell>
          <TableCell className="h-16">
            <div className="mx-auto h-7 w-14 animate-pulse rounded-full bg-muted" />
          </TableCell>
          <TableCell className="h-16">
            <div className="mx-auto h-4 w-full max-w-22 animate-pulse rounded-md bg-muted" />
          </TableCell>
          <TableCell className="h-16">
            <div className="ms-auto h-8 w-8 animate-pulse rounded-md bg-muted" />
          </TableCell>
        </TableRow>
      ))}
    </>
  )
}