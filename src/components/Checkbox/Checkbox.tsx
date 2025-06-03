import Descriptor from "../Descriptor/Descriptor"

type CheckboxProps = {
  descriptor?: string
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void
}

export function Checkbox({descriptor, onClick}: CheckboxProps) {
  return (
    <Descriptor labelPosition="right" descriptor={descriptor}>
      <input type="checkbox" onClick={onClick} />
    </Descriptor>
  )
}

export default Checkbox
