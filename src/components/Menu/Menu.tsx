// Copyright (c) 2025-present WorkBlockChain Team.
//
// WorkBlockChain Client is licensed under Mulan PubL v2.
// You can use this software according to
// the terms and conditions of the Mulan PubL v2.
// You may obtain a copy of Mulan PubL v2 at:
//
//   http://license.coscl.org.cn/MulanPubL-2.0
//
// THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS,
// WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED,
// INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT,
// MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
// See the Mulan PubL v2 for more details.
//
// === Auto generated, DO NOT EDIT ABOVE ===

import Vector from "@/assets/vector.svg?react"
import {Fragment, ReactNode, useState} from "react"
import {useLocation, useNavigate} from "react-router"
import styled from "styled-components"

export interface MenuItem {
  id: string
  label: string
  icon?: ReactNode
  url?: string
  children?: MenuItem[]
  show?: boolean
  disabled?: boolean
  onUpdate?: () => void
  expand?: boolean
}

interface MenuProps {
  items: MenuItem[]
}

export function Menu({items}: MenuProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    Object.fromEntries(items.map((item) => [item.id, item.expand ?? false]))
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
    } else if (item.url) {
      navigate(item.url)
      item.onUpdate?.()
    }
  }

  const renderMenuItem = (item: MenuItem) => {
    if (item.show === false) return null

    const $hasChildren = !!item.children?.length
    const $isExpanded = expandedItems[item.id] ?? false
    const $isSelected = item.url === location.pathname

    return (
      <Fragment key={item.id}>
        <MenuItem
          $hasChildren={$hasChildren}
          $disabled={item.disabled ?? false}
          $isSelected={$isSelected}
          onClick={() => !item.disabled && handleItemClick(item)}
        >
          {item.icon && <MenuItemIcon>{item.icon}</MenuItemIcon>}
          <MenuItemTitle>{item.label}</MenuItemTitle>
          {$hasChildren && (
            <MenuItemArrow $isExpanded={$isExpanded}>
              <Vector />
            </MenuItemArrow>
          )}
        </MenuItem>
        {$hasChildren && (
          <MenuSubItems $isExpanded={$isExpanded}>
            {item.children!.map(renderMenuItem)}
          </MenuSubItems>
        )}
      </Fragment>
    )
  }

  return (
    <MenuContainer>
      {items.length ? (
        items.map((item) => renderMenuItem(item))
      ) : (
        <MenuEmpty>暂无菜单项</MenuEmpty>
      )}
    </MenuContainer>
  )
}

// Styled components
const MenuContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const MenuItem = styled.div<{
  $hasChildren?: boolean
  $disabled?: boolean
  $isSelected?: boolean
}>`
  display: flex;
  border-radius: 8px;
  overflow: hidden;
  flex-direction: row;
  width: 100%;
  align-items: center;
  padding: 8px 16px;
  margin: 4px 0px;
  cursor: ${({$disabled}) => ($disabled ? "not-allowed" : "pointer")};
  background-color: ${({$disabled, $isSelected}) =>
    $disabled
      ? "#f5f5f5"
      : $isSelected
        ? "rgba(255, 232, 219, 1)"
        : "transparent"};
  color: ${({$isSelected}) => ($isSelected ? "rgba(238, 125, 37, 1)" : "#333")};
  opacity: ${({$disabled}) => ($disabled ? 0.6 : 1)};
  transition:
    background-color 0.3s ease,
    opacity 0.3s ease,
    color 0.3s ease;

  &:hover {
    background-color: ${({$disabled, $isSelected}) =>
      $disabled
        ? "#f5f5f5"
        : $isSelected
          ? "rgba(255, 232, 219, 0.7)"
          : "rgba(255, 232, 219, 0.46)"};
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
  font-size: 0.9rem;
`

const MenuItemArrow = styled.span<{$isExpanded: boolean}>`
  display: inline-flex;
  align-items: center;
  font-size: 12px;
  transform: ${({$isExpanded}) =>
    $isExpanded ? "rotate(0deg)" : "rotate(180deg)"};
  transition: transform 0.3s ease;
`

const MenuSubItems = styled.div<{$isExpanded: boolean}>`
  display: flex;
  flex-direction: column;
  max-height: ${({$isExpanded}) => ($isExpanded ? "1000px" : "0")};
  opacity: ${({$isExpanded}) => ($isExpanded ? 1 : 0)};
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
