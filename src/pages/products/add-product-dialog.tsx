import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { PlusCircle } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from '@/components/ui/input-group'

const emptyForm = {
  title: '',
  price: '',
  vendor: '',
  sku: '',
} as const

const productFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Укажите наименование'),
  price: z
    .string()
    .trim()
    .min(1, 'Укажите цену')
    .refine(
      (v) => {
        const n = Number(v.replace(',', '.'))
        console.log(n)
        return !Number.isNaN(n) && n >= 0
      },
      { message: 'Введите корректную цену' },
    ),
  vendor: z.string().min(1, 'Укажите вендора'),
  sku: z.string().min(1, 'Укажите артикул'),
})

type ProductFormValues = z.infer<typeof productFormSchema>

export function AddProductDialog() {
  const [open, setOpen] = useState(false)
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: { ...emptyForm },
  })

  const handleOpenChange = (next: boolean) => {
    setOpen(next)
    if (!next) {
      form.reset({ ...emptyForm })
      form.clearErrors()
    }
  }

  const onSubmit = (values: ProductFormValues) => {
    const priceNum = Number.parseFloat(values.price.replace(',', '.'))
    toast.success('Товар добавлен', {
      description: `${values.title} · ${priceNum.toFixed(2)}`,
    })
    form.reset({ ...emptyForm })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          type="button"
          onClick={() => {
            form.reset({ ...emptyForm })
            form.clearErrors()
          }}
        >
          <PlusCircle />
          Добавить
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader className="pb-4">
              <DialogTitle>Новый товар</DialogTitle>
            </DialogHeader>

            <div className="grid gap-4 py-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Наименование</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="off"
                        placeholder="Например, Смартфон X"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Цена</FormLabel>
                    <InputGroup>
                      <InputGroupAddon align="inline-start">
                        <InputGroupText>$</InputGroupText>
                      </InputGroupAddon>
                      <FormControl>
                        <InputGroupInput
                          inputMode="decimal"
                          autoComplete="off"
                          placeholder="0.00"
                          {...field}
                        />
                      </FormControl>
                    </InputGroup>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="vendor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Вендор</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="organization"
                        placeholder="Бренд или поставщик"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sku"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Артикул</FormLabel>
                    <FormControl>
                      <Input autoComplete="off" placeholder="SKU-0001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
                Отмена
              </Button>
              <Button type="submit">Сохранить</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
