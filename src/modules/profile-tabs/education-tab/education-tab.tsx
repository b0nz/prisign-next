import { HiOutlinePlus } from 'react-icons/hi'

const EducationTab = () => {
  return (
    <div className="card">
      <div className="flex justify-between align-middle">
        <div>
          <h3 className="heading">Education Tab</h3>
          <p className="sub-heading">Information about your Education</p>
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

export default EducationTab
