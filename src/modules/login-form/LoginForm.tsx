import Button from '@/components/Button'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import type { ILoginForm } from './LoginForm.model'
import Input from '@/components/Input'

const LOGIN_SCHEMA = yup.object().shape({
  phone: yup.string().required('Phone number is required'),
  password: yup.string().required('Password is required'),
})

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ILoginForm>({
    resolver: yupResolver(LOGIN_SCHEMA),
  })

  const onSubmit = (data: any) => {
    console.log(data, 'ini data')
  }

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-8 border rounded-lg border-privblack-0 p-8">
        <div>
          <h3 className="text-lg font-semibold">Login Account</h3>
        </div>
        <div className="flex flex-col gap-6">
          <Input
            label="Phone Number"
            id="phone"
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
            type="password"
            className="w-full"
            errorMessage={errors.password?.message}
            {...register('password')}
          />
        </div>
      </div>
      <div className="flex align-middle gap-2">
        <Button
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
        >
          Login
        </Button>
      </div>
    </form>
  )
}

export default LoginForm
