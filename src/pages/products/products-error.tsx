
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface ProductsErrorProps {
  error: string
  onRefresh: () => void
}

export function ProductsError({ error, onRefresh }: ProductsErrorProps) {
  return (
    <div className="bg-background">
      <div className="container mx-auto py-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h2 className="text-lg font-semibold text-destructive">Ошибка загрузки данных</h2>
              <p className="text-muted-foreground mt-2">{error}</p>
              <Button onClick={onRefresh} className="mt-4">
                Попробовать снова
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}