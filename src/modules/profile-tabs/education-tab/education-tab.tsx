import Button from '@/components/Button'
import Input from '@/components/Input'
import { yupResolver } from '@hookform/resolvers/yup'
import dayjs from 'dayjs'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { HiOutlinePlus } from 'react-icons/hi'
import { EducationFormProps, EducationTabProps } from './education-tab.model'
import * as yup from 'yup'
import createStore from '@/stores/store'

const EDUCATION_SCHEMA = yup.object().shape({
  school_name: yup.string().required('School name is required'),
  graduation_time: yup.date().required('Graduated time is required'),
})

const EducationTab: FC<EducationTabProps> = ({
  data = null,
  loading = false,
}) => {
  const { postEducation } = createStore()
  const [formIsActive, setFormIsActive] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EducationFormProps>({
    resolver: yupResolver(EDUCATION_SCHEMA),
  })

  const onSubmit = (payload: EducationFormProps) => {
    console.log('[EDUCATION DATA]', payload)
    postEducation({
      ...payload,
      graduation_time: dayjs(payload.graduation_time).format('YYYY-MM-DD'),
    })
    setFormIsActive(false)
  }

  return (
    <div className="card">
      <div className="flex justify-between align-middle">
        <div>
          <h3 className="heading">Education Tab</h3>
          <p className="sub-heading">Information about your Education</p>
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
              label="School Name"
              errorMessage={errors?.school_name?.message}
              {...register('school_name')}
            />
            <Input
              type="date"
              className="w-full"
              label="Graduate Time"
              errorMessage={errors?.graduation_time?.message}
              {...register('graduation_time')}
            />
            <div className="flex gap-4">
              <Button
                variant="outline"
                type="button"
                onClick={() => setFormIsActive(!formIsActive)}
              >
                Discard
              </Button>
              <Button variant="primary" type="submit">
                Add School
              </Button>
            </div>
          </form>
        )}
        {data && data?.school_name ? (
          <div>
            <h4 className="text-white font-bold text-base font-roboto">
              {data?.school_name}
            </h4>
            <p className="text-[#8e8ea3] font-normal font-roboto text-base">
              Graduation at{' '}
              {dayjs(data?.graduation_time).format('MMM DD, YYYY ')}
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

export default EducationTab
