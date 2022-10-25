import Input from '@/components/Input'
import dayjs from 'dayjs'
import { FC, useState } from 'react'
import { HiOutlinePlus } from 'react-icons/hi'
import { CareerFormProps, CareerTabProps } from './career-tab.model'
import * as yup from 'yup'
import dynamic from 'next/dynamic'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import createStore from '@/stores/store'

const Button = dynamic(() => import('@/components/Button'), { ssr: false })

const CAREER_SCHEMA = yup.object().shape({
  company_name: yup.string().required('Company name is required'),
  position: yup.string().required('Position is required'),
  starting_from: yup.date().required('Starting From is required'),
  ending_in: yup.date().required('Ending In is required'),
})

const CareerTab: FC<CareerTabProps> = ({ data = null, loading = false }) => {
  const { postCareer } = createStore()
  const [formIsActive, setFormIsActive] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CareerFormProps>({
    resolver: yupResolver(CAREER_SCHEMA),
  })

  const onSubmit = (payload: CareerFormProps) => {
    console.log('[CAREER DATA]', {
      ...payload,
      starting_from: dayjs(payload.starting_from).format('YYYY-MM-DD'),
      ending_in: dayjs(payload.ending_in).format('YYYY-MM-DD'),
    })
    postCareer({
      ...payload,
      starting_from: dayjs(payload.starting_from).format('YYYY-MM-DD'),
      ending_in: dayjs(payload.ending_in).format('YYYY-MM-DD'),
    })
    setFormIsActive(false)
  }

  return (
    <div className="card">
      <div className="flex justify-between align-middle">
        <div>
          <h3 className="heading">Career Tab</h3>
          <p className="sub-heading">Information about your career</p>
        </div>
        <div className="flex justify-center align-middle">
          {!formIsActive && (
            <button
              className="hover:cursor-pointer"
              onClick={() => setFormIsActive(!formIsActive)}
            >
              <HiOutlinePlus className="text-privgreen-500" size={24} />
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-28">
        {formIsActive && (
          <form
            className="flex flex-col gap-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              type="text"
              className="w-full"
              label="Company Name"
              errorMessage={errors?.company_name?.message}
              {...register('company_name')}
            />
            <Input
              type="text"
              className="w-full"
              label="Position"
              errorMessage={errors?.position?.message}
              {...register('position')}
            />
            <Input
              type="date"
              className="w-full"
              label="Start From"
              errorMessage={errors?.starting_from?.message}
              {...register('starting_from')}
            />
            <Input
              type="date"
              className="w-full"
              label="Ending In"
              errorMessage={errors?.ending_in?.message}
              {...register('ending_in')}
            />
            <div className="flex gap-4">
              <Button
                variant="outline"
                type="button"
                onClick={() => setFormIsActive(!formIsActive)}
              >
                Discard
              </Button>
              <Button
                variant="primary"
                type="submit"
                disabled={loading}
                loading={loading}
              >
                Add Career
              </Button>
            </div>
          </form>
        )}
        {data && data?.company_name ? (
          <div>
            <h4 className="text-white font-bold text-base font-roboto">
              {data?.company_name}
            </h4>
            <p className="text-[#8e8ea3] font-normal font-roboto text-base">
              {`${dayjs(data?.starting_from).format('MMM DD, YYYY ')} - ${dayjs(
                data?.ending_in,
              ).format('MMM DD, YYYY ')}`}
            </p>
          </div>
        ) : (
          <div className="text-center ">
            <p className="text-[#8e8ea3] font-normal font-roboto text-base">
              No Data
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CareerTab
