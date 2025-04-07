import type {Meta} from "@storybook/react"
import {useRef, useState} from "react"
import {Dropdown} from "./Dropdown"

const meta: Meta<typeof Dropdown> = {
  title: "Components/Dropdown",
  component: Dropdown,
  argTypes: {
    visible: {
      control: "boolean",
    },
  },
}

export default meta

export const Default = () => {
  const [visible, setVisible] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  return (
    <div style={{padding: 40}}>
      <button
        ref={triggerRef}
        onClick={() => setVisible(!visible)}
        style={{
          marginBottom: 16,
          border: "1px solid #ddd",
          padding: "8px 16px",
        }}
      >
        Toggle Dropdown
      </button>
      <Dropdown visible={visible} triggerRef={triggerRef}>
        <div>Option 1</div>
        <div>Option 2</div>
        <div>Option 3</div>
      </Dropdown>
    </div>
  )
}

const PositionCombination = ({
  position,
  align,
}: {
  position: "top" | "bottom" | "left" | "right"
  align: "start" | "center" | "end"
}) => {
  const [visible, setVisible] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)

  return (
    <div style={{position: "relative"}}>
      <button
        ref={triggerRef}
        onClick={() => setVisible(!visible)}
        style={{
          padding: "10px 20px",
          border: "1px solid #e0e0e0",
          borderRadius: "6px",
          backgroundColor: visible ? "#f8f8f8" : "#fff",
          cursor: "pointer",
          transition: "all 0.2s",
          width: "160px",
          whiteSpace: "nowrap",
        }}
      >
        {`${position} - ${align}`}
      </button>

      <Dropdown
        visible={visible}
        position={position}
        align={align}
        triggerRef={triggerRef}
      >
        <div>Menu Item 1</div>
        <div>Menu Item 2</div>
        <div>Menu Item 3</div>
      </Dropdown>
    </div>
  )
}

export const PositionVariations = () => {
  const combinations = [
    {position: "top", align: "start"},
    {position: "top", align: "center"},
    {position: "top", align: "end"},
    {position: "bottom", align: "start"},
    {position: "bottom", align: "center"},
    {position: "bottom", align: "end"},
    {position: "left", align: "start"},
    {position: "left", align: "center"},
    {position: "left", align: "end"},
    {position: "right", align: "start"},
    {position: "right", align: "center"},
    {position: "right", align: "end"},
  ] as const

  return (
    <div
      style={{
        padding: 40,
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 32,
        alignItems: "start",
        justifyItems: "center",
        minHeight: "100vh",
      }}
    >
      {combinations.map(({position, align}) => (
        <PositionCombination
          key={`${position}-${align}`}
          position={position}
          align={align}
        />
      ))}
    </div>
  )
}

export const EdgeCases = () => {
  const [visible, setVisible] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)

  return (
    <div style={{padding: 40}}>
      <button
        ref={triggerRef}
        onClick={() => setVisible(!visible)}
        style={{position: "fixed", bottom: 10, right: 10}}
      >
        Show Edge Dropdown
      </button>
      <Dropdown
        visible={visible}
        triggerRef={triggerRef}
        position="top"
        align="end"
      >
        <div>Edge Case</div>
        <div>Option X</div>
        <div>Option Y</div>
      </Dropdown>
    </div>
  )
}
