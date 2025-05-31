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
          {index < items.length - 1 && <Separator> &gt; </Separator>}
        </span>
      ))}
    </BreadcrumbContainer>
  )
}

const BreadcrumbContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
`

const Separator = styled.span`
  color: #999;
  margin: 0 4px;
`
