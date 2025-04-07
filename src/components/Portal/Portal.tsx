import {useEffect, useLayoutEffect, useState} from "react"
import {createPortal} from "react-dom"
import styled from "styled-components"
import {usePortalStore} from "./usePortalStore"

type PortalProps = {
  id?: string
  children: React.ReactNode
}

export const Portal = ({id = "root", children}: PortalProps) => {
  const {addPortal, removePortal} = usePortalStore()
  const [element, setElement] = useState<HTMLElement | null>(null)

  useLayoutEffect(() => {
    addPortal(id)
    return () => removePortal(id)
  }, [id, addPortal, removePortal])

  useEffect(() => {
    let container = document.getElementById(id)
    if (!container) {
      container = document.createElement("div")
      container.id = id
      document.body.appendChild(container)
    }
    setElement(container)

    return () => {
      if (container && container.childElementCount === 0) {
        container.remove()
      }
    }
  }, [id])

  return element ? createPortal(children, element) : null
}

export const PortalContainers = () => {
  const {getPortals} = usePortalStore()
  return (
    <Container>
      {Array.from(getPortals()).map((id) => (
        <PortalElement key={id} id={id} />
      ))}
    </Container>
  )
}

const Container = styled.div``

const PortalElement = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
`
