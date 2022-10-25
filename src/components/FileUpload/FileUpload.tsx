import * as DialogPrimitive from '@radix-ui/react-dialog'
import { FC, HTMLAttributes, ReactNode, useEffect, useState } from 'react'
import { IoCloseOutline, IoTrashBin } from 'react-icons/io5'
import { MdAddPhotoAlternate } from 'react-icons/md'
import Button from '@/components/Button'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

interface IContent extends HTMLAttributes<HTMLElement> {
  children?: ReactNode
}

const Content: FC<IContent> = ({ children, ...props }) => {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay
        style={{ backgroundColor: 'rgba(0 0 0 / 0.5)' }}
        className="fixed top-0 left-0 right-0 bottom-0 w-full h-full grid place-items-center overflow-y-auto text-white"
      >
        <DialogPrimitive.Content
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
          className="min-w-[704px] p-8 rounded-lg backdrop-blur-[50px] border border-opacity-30 border-privgreen-500 min-h-[604px]"
        >
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Overlay>
    </DialogPrimitive.Portal>
  )
}

interface IFileUpload {
  buttonUpload?: ReactNode
  onUpload?: (payload: FormData) => void
}

const FILEUPLOAD_SCHEMA = yup.object().shape({
  image: yup.mixed(),
})

const FileUpload: FC<IFileUpload> = ({
  buttonUpload,
  onUpload = (e) => {},
}) => {
  const [open, setOpen] = useState(false)
  const [files, setFiles] = useState([])
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ image: File }>({
    resolver: yupResolver(FILEUPLOAD_SCHEMA),
  })
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
    },
    onDrop: (acceptedFiles: any) => {
      setFiles(
        acceptedFiles.map((file: any) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      )
    },
  })

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () =>
      files.forEach((file: any) => URL.revokeObjectURL(file?.preview))
  }, [files])

  const thumbs = files.map((file: any) => (
    <div key={file?.name}>
      <div className="relative flex justify-end align-middle">
        <Image
          src={file?.preview}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file?.preview)
          }}
          alt="preview"
          width={640}
          height={344}
        />
        <button
          className="absolute text-red-500 bg-white rounded-full p-2"
          onClick={() => setFiles([])}
        >
          <IoTrashBin />
        </button>
      </div>
    </div>
  ))

  return (
    <DialogPrimitive.Root
      open={open}
      onOpenChange={(val) => {
        setFiles([])
        setOpen(val)
      }}
    >
      <DialogPrimitive.Trigger asChild>{buttonUpload}</DialogPrimitive.Trigger>
      <Content>
        <div className="flex flex-col gap-6">
          <div className="flex justify-between align-middle">
            <h3 className="font-roboto font-medium text-2xl">Upload Picture</h3>
            <DialogPrimitive.Close asChild>
              <button aria-label="Close">
                <IoCloseOutline size={24} />
              </button>
            </DialogPrimitive.Close>
          </div>
          <div className="">
            <form
              id="form-file-upload"
              {...getRootProps({ className: 'dropzone ' })}
              onSubmit={(e) => {
                e.preventDefault()
                console.log(e)
              }}
            >
              <input
                className="hidden"
                type="file"
                id="input-file-upload"
                {...getInputProps()}
              />
              <label
                id="label-file-upload"
                htmlFor="input-file-upload"
                className="h-full min-h-[344px] bg-privblack-100"
                {...register('image')}
              >
                {files.length > 0 ? (
                  thumbs
                ) : (
                  <div className="flex flex-col gap-[10px] justify-center align-middle text-xl text-center py-[69px] px-[197px] border border-dashed rounded">
                    <div className="flex justify-center align-middle">
                      <MdAddPhotoAlternate
                        size={50}
                        className="text-privgreen-500"
                      />
                    </div>
                    <p>Drag & Drop your Picture here</p>
                    <p>or</p>
                    <button
                      type="button"
                      className="text-privgreen-500 text-lg"
                    >
                      Upload a file
                    </button>
                  </div>
                )}
              </label>
              {errors?.image && (
                <p className="text-red-500 text-sm">{errors?.image?.message}</p>
              )}
              <div className="flex justify-between align-middle mt-4 tex-xs">
                <p>Maximum File Size : 5 Mb</p>
                <p>PNG, JPG or GIF</p>
              </div>
            </form>
            <Button
              block
              type="button"
              variant="outline"
              style={{ borderColor: '#54B78A', color: '#54B78A' }}
              className="mt-8"
              onClick={handleSubmit((e: any) => {
                console.log(e)
                const data = new FormData()
                data.append('image', e?.image[0])
                onUpload(data)
                setFiles([])
                setOpen(false)
              })}
            >
              UPLOAD
            </Button>
          </div>
        </div>
      </Content>
    </DialogPrimitive.Root>
  )
}

export default FileUpload
