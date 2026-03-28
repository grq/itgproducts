import { useCallback, useRef, useState, type RefCallback } from 'react'
import { Link } from '@tanstack/react-router'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import {
  AuthCard,
  AuthCardLogo,
  AuthCardHeader,
  AuthCardTitle,
  AuthCardDescription,
  AuthCardContent,
  AuthCardFooter,
  AuthCardDivider,
} from '@/components/ui/auth-card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { InputField } from '@/components/ui/input-field'
import { Alert, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'

import { Eye, EyeOff, Lock, User, X } from 'lucide-react'
import { useLogin } from '@/hooks/use-login.ts'

const loginSchema = z.object({
  login: z.string().min(1, 'Логин обязателен'),
  password: z.string().min(1, 'Пароль обязателен'),
  remember: z.boolean(),
})

type LoginValues = z.infer<typeof loginSchema>

export function LoginPage() {
  const { mutate: login, isPending, error, reset } = useLogin()
  const [showPassword, setShowPassword] = useState(false)
  const loginInputRef = useRef<HTMLInputElement | null>(null)

  const formMethods = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      login: '',
      password: '',
      remember: false,
    },
  })

  const onSubmit = useCallback(
    (values: LoginValues) => {
      login({
        username: values.login,
        password: values.password,
        remember: values.remember,
      })
    },
    [login]
  )

  const handleClearLogin = useCallback(() => {
    reset()
    formMethods.setValue('login', '', { shouldDirty: true, shouldTouch: true, shouldValidate: true })
    loginInputRef.current?.focus()
  }, [formMethods, reset])

  const handleFieldChange = useCallback(() => {
    if (error) {
      reset()
    }
  }, [error, reset])

  const handleTogglePasswordVisibility = useCallback(() => {
    setShowPassword((v) => !v)
  }, [])

  const handleRememberChange = useCallback(
    (checked: boolean | 'indeterminate') => {
      formMethods.setValue('remember', checked === true, { shouldDirty: true, shouldTouch: true })
    },
    [formMethods]
  )

  const mergeLoginInputRef = useCallback(
    (fieldRef: RefCallback<HTMLInputElement>) => (el: HTMLInputElement | null) => {
      fieldRef(el)
      loginInputRef.current = el
    },
    []
  )

  const getErrorMessage = useCallback((message: string) => {
    const MSG_MAP: Record<string, string> = {
      'Invalid credentials': 'Неверный логин или пароль.',
    }
    return MSG_MAP[message] ?? 'Не удалось выполнить вход. Попробуйте ещё раз.'
  }, [])

  return (
    <Form {...formMethods}>
      <main className="flex min-h-svh flex-col items-center justify-center bg-login-canvas p-4">
        <AuthCard>
          <AuthCardLogo>
            <img
              className="block h-[34px] w-[35px]"
              src="/logo.svg"
              alt=""
            />
          </AuthCardLogo>

          <AuthCardHeader>
            <AuthCardTitle>Добро пожаловать!</AuthCardTitle>
            <AuthCardDescription>
              Пожалуйста, авторизируйтесь
            </AuthCardDescription>
          </AuthCardHeader>

          <AuthCardContent>
            {error && (
              <Alert
                variant="destructive"
                className="rounded-xl border-destructive/40 bg-destructive/10 px-4 py-3 text-center **:data-[slot=alert-title]:text-center **:data-[slot=alert-description]:text-center [&>svg]:mx-auto [&>svg]:translate-y-0"
              >
                <AlertCircle className="size-4" />
                <AlertTitle className="text-[15px] font-medium leading-relaxed">
                {getErrorMessage(error.message)}
                </AlertTitle>
              </Alert>
            )}
            <form
              className="flex flex-col gap-5"
              onSubmit={formMethods.handleSubmit(onSubmit)}
            >
              <div className="flex flex-col gap-4">
                <FormField
                  control={formMethods.control}
                  name="login"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel variant="auth">Логин</FormLabel>
                      <FormControl>
                        <InputField
                          {...field}
                          onChange={(e) => {
                            field.onChange(e)
                            handleFieldChange()
                          }}
                          ref={mergeLoginInputRef(field.ref)}
                          variant="auth"
                          iconStart={<User className="size-6" aria-hidden />}
                          iconEnd={
                            field.value ? (
                              <button
                                type="button"
                                className="inline-flex border-0 bg-transparent p-0 text-login-muted"
                                onClick={handleClearLogin}
                                aria-label="Очистить поле"
                              >
                                <X className="size-3.5" strokeWidth={1.5} aria-hidden />
                              </button>
                            ) : null
                          }
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={formMethods.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel variant="auth">Пароль</FormLabel>
                      <FormControl>
                        <InputField
                          {...field}
                          onChange={(e) => {
                            field.onChange(e)
                            handleFieldChange()
                          }}
                          type={showPassword ? 'text' : 'password'}
                          variant="auth"
                          iconStart={<Lock className="size-6" aria-hidden />}
                          iconEnd={
                            <button
                              type="button"
                              className="inline-flex border-0 bg-transparent p-0 text-login-muted"
                              onClick={handleTogglePasswordVisibility}
                              aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
                              aria-pressed={showPassword}
                            >
                              {showPassword ? (
                                <Eye className="size-6" aria-hidden />
                              ) : (
                                <EyeOff className="size-6" aria-hidden />
                              )}
                            </button>
                          }
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={formMethods.control}
                name="remember"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center gap-2.5">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={handleRememberChange}
                        variant="auth"
                        size="auth"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormLabel className="cursor-pointer text-base font-medium text-login-muted">
                      Запомнить данные
                    </FormLabel>
                  </FormItem>
                )}
              />

              <div className="flex flex-col gap-4">
                <Button type="submit" variant="auth" size="auth" disabled={isPending}>
                  <span>{isPending ? 'Вход...' : 'Войти'}</span>
                </Button>
                <AuthCardDivider>или</AuthCardDivider>
              </div>
            </form>
          </AuthCardContent>

          <AuthCardFooter>
            Нет аккаунта?{' '}
            <span className="cursor-default font-semibold text-login-link underline decoration-skip-ink-none">
              Создать
            </span>
          </AuthCardFooter>
        </AuthCard>

        <nav className="fixed right-3 bottom-3 z-10 text-xs text-login-link underline" aria-label="Макеты">
          <Link to="/">Товары</Link>
        </nav>
      </main>
    </Form>
  )
}
