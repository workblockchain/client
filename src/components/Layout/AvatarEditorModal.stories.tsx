import type {Meta, StoryObj} from "@storybook/react"
import {useRef} from "react"
import AvatarEditor from "react-avatar-editor"
import {AvatarEditorModal} from "./AvatarEditorModal"

const meta: Meta<typeof AvatarEditorModal> = {
  title: "Components/AvatarEditorModal",
  component: AvatarEditorModal,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof AvatarEditorModal>

const DefaultRenderer = (args: any) => {
  const editorRef = useRef<AvatarEditor>(null)
  return <AvatarEditorModal {...args} editorRef={editorRef} />
}

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log("closed"),
    onSave: () => console.log("saved"),
    uploadedImage: null,
  },
  render: DefaultRenderer,
}

export const CustomSize: Story = {
  args: {
    ...Default.args,
    width: 300,
    height: 300,
    border: 30,
  },
}

export const CustomColorAndScale: Story = {
  args: {
    ...Default.args,
    color: [255, 0, 0, 0.8],
    scale: 1.5,
  },
}

export const Rotated: Story = {
  args: {
    ...Default.args,
    rotate: 45,
  },
}
