import Input from '@/components/Input'
import Select, { Option } from '@/components/Select'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { IRegisterForm } from './register-form.model'
import codes from 'country-calling-code'
import dynamic from 'next/dynamic'
import createStore from '@/stores/store'

const Button = dynamic(
  () => {
    return import('@/components/Button')
  },
  { ssr: false },
)

const REGISTER_SCHEMA = yup.object().shape({
  country: yup.string().required('Country is required'),
  phone: yup.string().required('Phone number is required'),
  password: yup.string().required('Password is required'),
})

const RegisterForm = () => {
  const { authIsLoading, registerRequest } = createStore()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IRegisterForm>({
    resolver: yupResolver(REGISTER_SCHEMA),
  })

  const onSubmit = (data: IRegisterForm) => {
    console.log('[REGISTER DATA]', {
      ...data,
      phone: `${data.country.replace('+', '')}${data.phone}`,
    })
    registerRequest({
      ...data,
      phone: `${data.country.replace('+', '')}${data.phone}`,
    })
  }

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
      <div className="card">
        <div>
          <h3 className="text-lg font-semibold">Create New Account</h3>
          <p className="text-[#8E8EA3] text-xs">
            Before you can join here, please create new account
          </p>
        </div>
        <div>
          <div className="mb-2">
            <h3 className="text-lg font-semibold">Account Detail</h3>
          </div>
          <div className="flex flex-col gap-6">
            <Select
              label="Select Country"
              errorMessage={errors.country?.message}
              {...register('country', { required: true })}
            >
              {codes.map((code) => (
                <Option
                  key={code.isoCode3}
                  className="w-full"
                  value={`+${code.countryCodes[0]}`}
                >
                  {`${code.country} (+${code.countryCodes[0]})`}
                </Option>
              ))}
            </Select>
            <Input
              label="Phone Number"
              type="text"
              className="w-full"
              onKeyPress={(e) => {
                if (!/[0-9]/.test(e.key)) {
                  e.preventDefault()
                }
              }}
              errorMessage={errors.phone?.message}
              {...register('phone', { required: true })}
            />
            <Input
              label="Password"
              type="password"
              className="w-full"
              errorMessage={errors.password?.message}
              {...register('password', { required: true })}
            />
          </div>
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
          data-testid="register-btn"
          variant="primary"
          className="font-medium"
          type="submit"
          loading={authIsLoading}
          disabled={authIsLoading}
        >
          Register
        </Button>
      </div>
    </form>
  )
}

export default RegisterForm
