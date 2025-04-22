import {useEffect} from "react"
import {createPortal} from "react-dom"
import styled from "styled-components"

type PortalProps = {
  id?: string
  children: React.ReactNode
}

export const Portal = ({id = PORTAL_CONTAINER_ID, children}: PortalProps) => {
  useEffect(() => {
    const rootContainer = document.getElementById(PORTAL_CONTAINER_ID)
    let container = document.getElementById(id)

    if (import.meta.env.DEV && !rootContainer) {
      console.error(
        `Portal根容器未找到。\n` +
          `请确保在应用根组件中包含 <PortalContainers/> 组件`
      )
      return
    }

    if (!container && rootContainer) {
      container = document.createElement("div")
      container.id = id
      rootContainer.appendChild(container)
    }

    return () => {
      if (container && rootContainer?.contains(container)) {
        rootContainer.removeChild(container)
      }
    }
  }, [id])

  const container = document.getElementById(id)
  return container ? createPortal(children, container) : null
}

const PORTAL_CONTAINER_ID = "root-portal-container"
export const PortalContainers = () => {
  return <Container id={PORTAL_CONTAINER_ID} />
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
`
