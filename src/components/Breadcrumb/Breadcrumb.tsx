import Vector from "@/assets/vector.svg?react"
import styled from "styled-components"

interface BreadcrumbProps {
  items: Array<{
    title: string
    path?: string
  }>
}

export function Breadcrumb({items}: BreadcrumbProps) {
  return (
    <BreadcrumbContainer>
      {items.map((item, index) => (
        <span key={index}>
          {<span>{item.title}</span>}
          {index < items.length - 1 && (
            <Separator>
              <Vector />
            </Separator>
          )}
        </span>
      ))}
    </BreadcrumbContainer>
  )
}

const BreadcrumbContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  padding-left: 8px;
`

const Separator = styled.div`
  color: #999;
  margin: 0px 8px;
  display: inline-block;
  transform: rotate(-90deg);
`
