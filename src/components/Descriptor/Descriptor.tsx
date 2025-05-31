import {ReactNode} from "react"
import styled from "styled-components"

interface DescriptorProps {
  labelPosition?: "left" | "right" | "top" | "bottom"
  descriptor?: string
  children: ReactNode
  gap?: string | number
}

export const Descriptor = ({
  children,
  descriptor,
  labelPosition = "left",
  gap = "10px",
}: DescriptorProps) => {
  if (!descriptor) {
    return <>{children}</>
  }

  return (
    <Container
      gap={gap}
      direction={
        labelPosition.includes("top") || labelPosition.includes("bottom")
          ? "column"
          : "row"
      }
    >
      <DescriptorText $labelPosition={labelPosition}>
        {descriptor}
      </DescriptorText>
      <ChildrenWrapper>{children}</ChildrenWrapper>
    </Container>
  )
}

// 动态样式的容器
const Container = styled.div<{
  gap: string | number
  direction: "row" | "column"
}>`
  display: flex;
  flex-direction: ${({direction}) => direction};
  gap: ${({gap}) => (typeof gap === "number" ? `${gap}px` : gap)};
  ${({direction}) =>
    direction === "row" ? "align-items: center;" : "align-content: center;"}

  position: relative;
`

// 描述文本样式，包含动画和位置控制
const DescriptorText = styled.span<{
  $labelPosition: NonNullable<DescriptorProps["labelPosition"]>
}>`
  display: inline-block;
  order: ${({$labelPosition}) =>
    $labelPosition.includes("right") || $labelPosition.includes("bottom")
      ? 1
      : 0};
`

// 子节点包装器，确保样式隔离
const ChildrenWrapper = styled.div`
  display: inline-block;
  order: 0; /* 默认顺序 */
`

export default Descriptor
