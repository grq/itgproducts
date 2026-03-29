import { Ellipsis, Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'

export const ColumnCellActions = () => (
  <div className="space-x-2">
    <Button size="icon-rounded">
      <Plus />
    </Button>
    <Button variant="outline" size="icon-rounded">
      <Ellipsis />
    </Button>
  </div>
)