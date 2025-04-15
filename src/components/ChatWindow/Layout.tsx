import styled from "styled-components"

interface Props {
  children?: React.ReactNode
  className?: string
}

export const Layout = ({children, className}: Props) => {
  return <Container className={className}>{children}</Container>
}

const Container = styled.div`
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: #f0f8ff;
  overflow: hidden;

  width: 258px;
  height: 100%;
  min-height: 350px;
`
