import React from "react"

interface Props {
  width?: number
  height?: number
  color?: string
}

export const LeftArrow: React.FC<Props> = ({
  width = 24,
  height = 24,
  color = "currentColor",
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15 18L9 12L15 6"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
