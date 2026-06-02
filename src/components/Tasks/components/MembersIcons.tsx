interface Props {
  members: string[]
}

export const MembersIcons = ({ members }: Props) => {
  return (
    <ul className="flex flex-row gap-0 ml-2.5">
      {
        members.map(member =>
          <li className="rounded-2xl px-2 rounded-2xl bg-bgslblue border-1 border-lblue">{member[0].toUpperCase() + member[1].toUpperCase()}</li>
        )
      }
    </ul>
  )
}

