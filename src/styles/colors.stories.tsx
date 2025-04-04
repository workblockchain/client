import type {Meta} from "@storybook/react"
import {colors} from "./colors"

const meta: Meta = {
  title: "styles/Colors",
  parameters: {
    layout: "padded",
  },
}

export default meta

const ColorPalette = ({colorGroup}: {colorGroup: string}) => (
  <div
    style={{
      padding: "20px",
      display: "grid",
      gap: "20px",
      gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    }}
  >
    {Object.entries(colors)
      .filter(([name]) => name.startsWith(colorGroup))
      .map(([name, value]) => (
        <div
          key={name}
          style={{
            padding: "16px",
            borderRadius: "8px",
            backgroundColor: value,
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            color: parseInt(name.slice(-3)) > 500 ? "#fff" : "#333",
          }}
        >
          <div style={{fontWeight: 600}}>{name}</div>
          <div>{value}</div>
        </div>
      ))}
  </div>
)

export const YellowColors = () => <ColorPalette colorGroup="Yellow" />
export const RedColors = () => <ColorPalette colorGroup="Red" />
export const NeutralColors = () => <ColorPalette colorGroup="Neutral" />
