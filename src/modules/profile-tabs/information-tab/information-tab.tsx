import Input from '@/components/Input'
import Select, { Option } from '@/components/Select'
import TextArea from '@/components/TextArea'
import dynamic from 'next/dynamic'
import * as yup from 'yup'
import Image from 'next/image'
import { FC, useState } from 'react'
import { RiEdit2Line } from 'react-icons/ri'
import {
  InformationFormProps,
  InformationTabProps,
} from './information-tab.model'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import createStore from '@/stores/store'
import FileUpload from '@/components/FileUpload'

const Button = dynamic(() => import('@/components/Button'), {
  ssr: false,
})

const INFORMATION_SCHEMA = yup.object().shape({
  name: yup.string().required('Name is required'),
  gender: yup.number(),
  birthday: yup.string(),
  hometown: yup.string(),
  bio: yup.string(),
})

const InformationTab: FC<InformationTabProps> = ({
  data = null,
  loading = false,
}) => {
  const { postInformation, uploadProfile } = createStore()
  const [formIsActive, setFormIsActive] = useState(false)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<InformationFormProps>({
    resolver: yupResolver(INFORMATION_SCHEMA),
    defaultValues: {
      name: data?.name as string,
      gender: data?.gender as number,
      birthday: data?.birthday as string,
      hometown: data?.hometown as string,
      bio: data?.bio as string,
    },
  })

  const onSubmit = (payload: InformationFormProps) => {
    console.log('[INFORMATION DATA]', payload)
    postInformation(payload)
    setFormIsActive(false)
  }

  return (
    <div className="card">
      <div className="flex justify-between align-middle">
        <div>
          <h3 className="heading">Information Tab</h3>
          <p className="sub-heading">Your personal data</p>
        </div>
        <div className="flex justify-center align-middle">
          {!formIsActive && (
            <button
              className="text-privgreen-500 hover:text-privgreen-300 cursor-pointer"
              onClick={() => setFormIsActive(!formIsActive)}
            >
              <RiEdit2Line size={20} />
            </button>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[72px]">
        <div className="order-last md:order-1">
          <form
            className="flex flex-col gap-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h3 className="heading">Information Detail</h3>
            <Input
              type="text"
              label="Name*"
              className="w-full"
              disabled={!formIsActive || loading}
              errorMessage={errors?.name?.message}
              {...register('name')}
            />
            <Select
              label="Gender"
              disabled={!formIsActive || loading}
              errorMessage={errors?.gender?.message}
              {...register('gender')}
            >
              <Option value="0">Male</Option>
              <Option value="1">Female</Option>
            </Select>
            <Input
              type="date"
              label="Date of Birth"
              className="w-full"
              disabled={!formIsActive || loading}
              errorMessage={errors?.birthday?.message}
              {...register('birthday')}
            />
            <Input
              type="text"
              label="Home Town"
              className="w-full"
              disabled={!formIsActive || loading}
              errorMessage={errors?.hometown?.message}
              {...register('hometown')}
            />
            <TextArea
              className="min-h-[167px] w-full"
              label="Bio"
              placeholder="Write your bio here"
              disabled={!formIsActive || loading}
              errorMessage={errors?.bio?.message}
              {...register('bio')}
            />
            {formIsActive && (
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setFormIsActive(!formIsActive)
                    setValue('name', data?.name as string)
                    setValue('gender', data?.gender as number)
                    setValue('birthday', data?.birthday as string)
                    setValue('hometown', data?.hometown as string)
                    setValue('bio', data?.bio as string)
                  }}
                >
                  Discard
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  loading={loading}
                  disabled={loading}
                >
                  Update
                </Button>
              </div>
            )}
          </form>
        </div>
        <div className="md:order-2">
          <div className="flex flex-col gap-8">
            <h3 className="heading">Profile Picture</h3>
            <div className="flex flex-col gap-6 text-center">
              <Image
                src={data?.user_picture?.picture?.url || '/no-image.png'}
                alt="profile"
                height="224px"
                width="224px"
                className={
                  data?.user_picture?.picture?.url
                    ? 'object-cover'
                    : 'object-cover blur-lg'
                }
              />
              <div className="flex flex-col gap-2">
                <FileUpload
                  buttonUpload={
                    <Button block disabled={loading}>
                      Upload Media
                    </Button>
                  }
                  onUpload={uploadProfile}
                />
                <p className="sub-heading">PNG, JPG or GIF up to 2MB</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InformationTab
