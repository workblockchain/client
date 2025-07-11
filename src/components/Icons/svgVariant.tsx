// === Auto generated, DO NOT EDIT ABOVE ===
import Arrow from "@/assets/arrow.svg?react"

type SvgProps = React.SVGProps<SVGSVGElement>

const ArrowVariant = {
  Left: (props: SvgProps) => (
    <Arrow style={{transform: "rotate(90deg)", ...props.style}} {...props} />
  ),
  Right: (props: SvgProps) => (
    <Arrow style={{transform: "rotate(-90deg)", ...props.style}} {...props} />
  ),
  Down: (props: SvgProps) => <Arrow {...props} />,
  Up: (props: SvgProps) => (
    <Arrow style={{transform: "rotate(180deg)", ...props.style}} {...props} />
  ),
}
export {ArrowVariant}
