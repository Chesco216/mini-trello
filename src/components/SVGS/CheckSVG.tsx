interface Props {
  w: number
  h: number
  c: string
}
export const CheckSVG = ({ w, h, c }: Props) => {
  return (
    <svg width={`${w}px`} height={`${h}px`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="SVGRepo_bgCarrier" stroke-width="0">
      </g>
      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round">
      </g>
      <g id="SVGRepo_iconCarrier">
        <path d="M4 12.6111L8.92308 17.5L20 6.5" stroke={c} stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        </path>
      </g>
    </svg>
  )
}


