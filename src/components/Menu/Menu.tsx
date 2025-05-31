import {DividerHorizontal} from "@/components/Divider"
import React, {ReactNode, useState} from "react"
import styled from "styled-components"

export interface MenuItem {
  id: string
  label: string
  icon?: ReactNode
  url: string
  children?: MenuItem[]
  show?: boolean
  disabled?: boolean
  onUpdate?: () => void
  expand?: boolean
}

interface MenuProps {
  items?: MenuItem[]
}

export function Menu({items}: MenuProps) {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    items?.reduce(
      (acc, item) => {
        acc[item.id] = item.expand ?? false
        return acc
      },
      {} as Record<string, boolean>
    ) ?? {}
  )

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const handleItemClick = (item: MenuItem) => {
    if (item.children) {
      toggleExpand(item.id)
    } else {
      window.location.href = item.url
      item.onUpdate?.()
    }
  }

  const renderMenuItem = (item: MenuItem) => {
    if (item.show === false) return null

    const hasChildren = !!(item.children && item.children.length > 0)
    const isExpanded = expandedItems[item.id] ?? item.expand ?? false

    return (
      <MenuItem key={item.id}>
        <MenuItemContent
          hasChildren={hasChildren}
          disabled={item.disabled ?? false}
          onClick={() => !item.disabled && handleItemClick(item)}
        >
          {item.icon && <MenuItemIcon>{item.icon}</MenuItemIcon>}
          <MenuItemTitle>{item.label}</MenuItemTitle>
          {hasChildren && (
            <MenuItemArrow isExpanded={isExpanded}>▼</MenuItemArrow>
          )}
        </MenuItemContent>

        {hasChildren && (
          <MenuSubItems isExpanded={isExpanded}>
            {item.children?.map((child) => renderMenuItem(child))}
          </MenuSubItems>
        )}
      </MenuItem>
    )
  }

  return (
    <MenuContainer>
      {items?.length ? (
        items.map((item, index) => (
          <React.Fragment key={item.id}>
            {renderMenuItem(item)}
            <DividerHorizontal />
          </React.Fragment>
        ))
      ) : (
        <MenuEmpty>暂无菜单项</MenuEmpty>
      )}
    </MenuContainer>
  )
}

// Styled components
const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const MenuItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const MenuItemContent = styled.div<{
  hasChildren: boolean
  disabled: boolean
}>`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  cursor: ${({disabled}) => (disabled ? "not-allowed" : "pointer")};
  background-color: ${({disabled}) => (disabled ? "#f5f5f5" : "transparent")};
  opacity: ${({disabled}) => (disabled ? 0.6 : 1)};
  transition:
    background-color 0.3s ease,
    opacity 0.3s ease;

  &:hover {
    background-color: ${({disabled}) => (disabled ? "#f5f5f5" : "#e0e0e0")};
  }
`

const MenuItemIcon = styled.span`
  display: inline-flex;
  align-items: center;
  margin-right: 8px;
  font-size: 16px;
`

const MenuItemTitle = styled.span`
  flex: 1;
  font-size: 16px;
  color: #333;
`

const MenuItemArrow = styled.span<{isExpanded: boolean}>`
  display: inline-flex;
  align-items: center;
  font-size: 12px;
  transform: ${({isExpanded}) =>
    isExpanded ? "rotate(180deg)" : "rotate(0deg)"};
  transition: transform 0.3s ease;
`

const MenuSubItems = styled.div<{isExpanded: boolean}>`
  display: flex;
  flex-direction: column;
  max-height: ${({isExpanded}) => (isExpanded ? "1000px" : "0")};
  opacity: ${({isExpanded}) => (isExpanded ? 1 : 0)};
  overflow: hidden;
  padding-left: 24px;
  transition:
    max-height 0.3s ease,
    opacity 0.3s ease;
`

const MenuEmpty = styled.div`
  padding: 16px;
  text-align: center;
  color: #666;
  font-size: 14px;
`

export default Menu
