import { useState, type Dispatch, type SetStateAction } from "react"
import { toast } from "sonner"

interface MembersProps {
  members: string[],
  setMembers: Dispatch<SetStateAction<string[]>>
}

export const MembersList = ({members, setMembers}: MembersProps) => {

  const [newMember, setNewMember] = useState('')

  const handleAddMember = () => {
    const duplicated = members.find(m => m === newMember)
    console.log({duplicated})
    if(duplicated){
      toast.error('member duplicated')
      setNewMember('')
      return
    } 
    if(!newMember) {
      toast.error('Member cannot be emppty')
      return
    }
    setMembers((prev: string[]) => [...prev, newMember])
    setNewMember('')
  }

  const handleRemoveMember = (member: string) => {
    const renewedMembers = members.filter((m) => m != member)
    setMembers([...renewedMembers])
    console.log({renewedMembers})
  }

  return (
    <fieldset className="mb-5">
    <legend className="text-lg text-gray-500 mb-5">Add Members</legend>
      <ul className="flex flex-wrap gap-2 mb-5">
      {
        members.map((member) =>
                    <li className="w-fit flex flex-row gap-3 font-light text-gray-500 border-1 border-lblue px-3 rounded-xl">
                      {member}
                      <button
                        type="button"
                        onClick={() => handleRemoveMember(member)}
                      >
                        x
                      </button>
                    </li>
                   )
      }
      </ul>
      <div className="flex flex-row gap-3">
        <input
          className="w-full py-2 px-5 border-1 border-lblue rounded-lg"
          value={newMember}
          onChange={(e) => setNewMember(e.target.value)}
        />
        <button
        className="py-2 px-4 font-semibold text-white bg-lblue rounded-lg"
          type="button"
          onClick={handleAddMember}
        >
          Add
        </button>
      </div>
    </fieldset>
  )
}
