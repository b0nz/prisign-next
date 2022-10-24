import * as DialogPrimitive from '@radix-ui/react-dialog'
import { DragEvent, FC, HTMLAttributes, ReactNode, useState } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import { MdAddPhotoAlternate } from 'react-icons/md'
import Button from '@/components/Button'

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
}

const FileUpload: FC<IFileUpload> = ({ buttonUpload }) => {
  const [open, setOpen] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  // handle drag events
  const handleDrag = (e: DragEvent) =>  {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
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
              className="flex flex-col gap-2  h-64 w-full text-center"
              id="form-file-upload"
              // onDragEnter={handleDrag}
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                className="hidden"
                type="file"
                id="input-file-upload"
                multiple={true}
              />
              <label
                id="label-file-upload"
                htmlFor="input-file-upload"
                className="h-full min-h-[344px] border border-dashed bg-privblack-100 "
              >
                <div className="flex flex-col gap-[10px] justify-center align-middle text-xl text-center py-[69px] px-[197px]">
                  <div className="flex justify-center align-middle">
                    <MdAddPhotoAlternate
                      size={50}
                      className="text-privgreen-500"
                    />
                  </div>
                  <p>Drag & Drop your Picture here</p>
                  <p>or</p>
                  <button className="text-privgreen-500 text-lg">
                    Upload a file
                  </button>
                </div>
              </label>
              <div className="flex justify-between align-middle mt-4 tex-xs">
                <p>Maximum File Size : 5 Mb</p>
                <p>PNG, JPG or GIF</p>
              </div>
              <Button
                block
                type="submit"
                variant="outline"
                style={{ borderColor: '#54B78A', color: '#54B78A' }}
                className="mt-8"
              >
                UPLOAD
              </Button>
            </form>
          </div>
        </div>
      </Content>
    </DialogPrimitive.Root>
  )
}

export default FileUpload
