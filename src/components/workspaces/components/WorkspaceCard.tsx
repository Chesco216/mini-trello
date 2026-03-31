import { useNavigate } from "react-router"

interface Props {
  name: string,
  description: string,
  lastUpdated: Date
}

export const WorkspaceCard = ({name, description, lastUpdated}: Props) => {

  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/dashboard')
  }
  
  return (
    <div 
    onClick={handleClick} 
    className="flex flex-col items-center justify-center bg-lblue py-15 gap-2 rounded-xl">
      <h3 className="font-bold text-lg text-white">{name}</h3>
      <p className="font-light text-md text-white">{description}</p>
      <p className="font-light text-sm">{lastUpdated.getDate()}</p>
    </div>
  )
}

