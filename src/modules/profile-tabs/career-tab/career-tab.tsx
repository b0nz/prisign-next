import { HiOutlinePlus } from 'react-icons/hi'

const CareerTab = () => {
  return (
    <div className="card">
      <div className="flex justify-between align-middle">
        <div>
          <h3 className="heading">Career Tab</h3>
          <p className="sub-heading">Information about your career</p>
        </div>
        <div className="flex justify-center align-middle">
          <button className="hover:cursor-pointer">
            <HiOutlinePlus className="text-privgreen-500" size={24} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CareerTab
