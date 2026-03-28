"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */

import * as React from "react"
import { Slot } from "radix-ui"
import { Controller, FormProvider, useFormContext } from "react-hook-form"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

type FormItemContextValue = {
  id: string
}

type FormFieldContextValue = {
  name: string
}

const FormItemContext = React.createContext<FormItemContextValue | null>(null)
const FormFieldContext = React.createContext<FormFieldContextValue | null>(null)

function useFormItem() {
  const ctx = React.useContext(FormItemContext)
  if (!ctx) {
    throw new Error("useFormItem must be used within <FormItem />")
  }
  return ctx
}

function useFormField() {
  const ctx = React.useContext(FormFieldContext)
  if (!ctx) {
    throw new Error("useFormField must be used within <FormField />")
  }
  return ctx
}

function getFieldError(formState: any, name: string) {
  return name
    .split(".")
    .reduce((acc: any, key: string) => acc?.[key], formState?.errors)
}

export function Form({
  children,
  ...props
}: {
  children: React.ReactNode
} & Record<string, any>) {
  return <FormProvider {...(props as any)}>{children}</FormProvider>
}

export function FormField({
  name,
  control,
  render,
}: {
  name: string
  control: any
  render: (props: any) => any
}) {
  return (
    <FormFieldContext.Provider value={{ name }}>
      <Controller control={control} name={name} render={render as any} />
    </FormFieldContext.Provider>
  )
}

export function FormItem({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const id = React.useId()
  return (
    <FormItemContext.Provider value={{ id }}>
      <div className={cn("flex flex-col gap-1.5", className)} {...props} />
    </FormItemContext.Provider>
  )
}

export function FormLabel({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof Label> & {
  variant?: "default" | "auth"
}) {
  const { id } = useFormItem()
  return (
    <Label
      htmlFor={`${id}-form-control`}
      className={cn(
        variant === "auth" &&
          "text-[18px] font-medium leading-normal tracking-[-0.27px] text-login-heading",
        className
      )}
      {...props}
    />
  )
}

export function FormControl({
  children,
  ...props
}: {
  children?: React.ReactNode
} & Record<string, unknown>) {
  const { id } = useFormItem()
  const { name } = useFormField()
  const form = useFormContext()
  const fieldState = form.getFieldState(name as any)
  const describedBy = fieldState.error ? `${id}-form-message` : undefined

  return (
    <Slot.Root
      id={`${id}-form-control`}
      aria-invalid={!!fieldState.error}
      aria-describedby={describedBy}
      {...props}
    >
      {children}
    </Slot.Root>
  )
}

export function FormMessage({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  const { id } = useFormItem()
  const { name } = useFormField()
  const form = useFormContext()
  const error = getFieldError(form.formState, name as string) as
    | { message?: string }
    | undefined

  const message = error?.message
  if (!message) return null

  return (
    <p
      id={`${id}-form-message`}
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {String(message)}
    </p>
  )
}

// Нужен реальный component в рамках shadcn-конвенций, но в этой задаче он
// не используется на странице логина (можно добавить позже).
export function FormDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  const { id } = useFormItem()
  return (
    <p id={`${id}-form-description`} className={cn("text-sm text-muted-foreground", className)} {...props} />
  )
}

