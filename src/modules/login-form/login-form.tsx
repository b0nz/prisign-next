import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import type { ILoginForm } from './login-form.model'
import Input from '@/components/Input'
import createStore from '@/stores/store'
import dynamic from 'next/dynamic'

const Button = dynamic(
  () => {
    return import('@/components/Button')
  },
  { ssr: false },
)

const LOGIN_SCHEMA = yup.object().shape({
  phone: yup.string().required('Phone number is required'),
  password: yup.string().required('Password is required'),
})

const LoginForm = () => {
  const { loginRequest, authIsLoading } = createStore()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ILoginForm>({
    resolver: yupResolver(LOGIN_SCHEMA),
  })

  const onSubmit = (data: ILoginForm) => {
    console.log('[LOGIN DATA]', data)
    loginRequest({
      ...data,
      latlong: null,
      device_type: '2',
      device_token: '123',
    })
  }

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
      <div className="card">
        <div>
          <h3 className="text-lg font-semibold">Login Account</h3>
        </div>
        <div className="flex flex-col gap-6">
          <Input
            label="Phone Number"
            id="phone"
            data-testid="phone"
            type="text"
            className="w-full"
            errorMessage={errors.phone?.message}
            onKeyPress={(e) => {
              if (!/[0-9]/.test(e.key)) {
                e.preventDefault()
              }
            }}
            {...register('phone')}
          />
          <Input
            label="Password"
            id="password"
            data-testid="password"
            type="password"
            className="w-full"
            errorMessage={errors.password?.message}
            {...register('password')}
          />
        </div>
      </div>
      <div className="flex align-middle gap-2">
        <Button
          type="button"
          data-testid="reset-btn"
          variant="outline"
          className="font-medium"
          onClick={() => reset()}
        >
          Reset
        </Button>
        <Button
          data-testid="login-btn"
          variant="primary"
          className="font-medium"
          type="submit"
          loading={authIsLoading}
          disabled={authIsLoading}
        >
          Login
        </Button>
      </div>
    </form>
  )
}

export default LoginForm
