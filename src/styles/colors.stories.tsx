import type {Meta} from "@storybook/react"
import styled from "styled-components"
import {colors} from "./colors"

const meta: Meta = {
  title: "styles/Colors",
  parameters: {
    layout: "padded",
  },
}

export default meta

const Palette = styled.div`
  padding: 20px;
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
`

const Item = styled.div`
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const ColorPalette = ({colorGroup}: {colorGroup: string}) => (
  <Palette>
    {Object.entries(colors)
      .filter(([name]) => name.startsWith(colorGroup))
      .map(([name, value]) => (
        <Item
          key={name}
          style={{
            backgroundColor: value,
            color: parseInt(name.slice(-3)) > 500 ? "#fff" : "#333",
          }}
        >
          <div style={{fontWeight: 600}}>{name}</div>
          <div>{value}</div>
        </Item>
      ))}
  </Palette>
)

export const YellowColors = () => <ColorPalette colorGroup="Yellow" />
export const RedColors = () => <ColorPalette colorGroup="Red" />
export const NeutralColors = () => <ColorPalette colorGroup="Neutral" />
