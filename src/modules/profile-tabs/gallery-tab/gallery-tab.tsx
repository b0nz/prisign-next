import FileUpload from '@/components/FileUpload'
import { HiOutlinePlus } from 'react-icons/hi'

const GalleryTab = () => {
  return (
    <div className="card">
      <div className="flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="heading">Gallery Information</h3>
            <p className="sub-heading">Information about your Gallery</p>
          </div>
          <div>
            <FileUpload
              buttonUpload={
                <button className="hover:cursor-pointer">
                  <HiOutlinePlus className="text-privgreen-500" size={24} />
                </button>
              }
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-8">
          {Array(9)
            .fill(
              'https://images.unsplash.com/photo-1665149368357-864968813478?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1vZi10aGUtZGF5fHx8fGVufDB8fHx8&auto=format%2Ccompress&fit=crop&w=1000&h=1000',
            )
            .map((item, idx) => (
              <div
                key={idx}
                style={{
                  backgroundImage: `url(${item})`,
                  backgroundSize: 'cover',
                  height: 260,
                  width: 165,
                }}
              />
            ))}
        </div>
      </div>
    </div>
  )
}

export default GalleryTab
