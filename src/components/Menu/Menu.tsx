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
import {colors} from "@/styles/colors"
import {Fragment, memo, ReactNode, useState} from "react"
import {useTranslation} from "react-i18next"
import {useNavigate} from "react-router"
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

export interface MenuProps {
  items: MenuItem[]
  initialSelectedId?: string
}

export const Menu = memo(function Menu({items, initialSelectedId}: MenuProps) {
  const navigate = useNavigate()
  const {t} = useTranslation()
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    () =>
      Object.fromEntries(items.map((item) => [item.id, item.expand ?? false]))
  )
  const [selectedId, setSelectedId] = useState<string | undefined>(
    initialSelectedId
  )

  function hasSelectedChild(item: MenuItem, id?: string): boolean {
    if (!item.children || !id) return false
    return item.children.some(
      (child) => child.id === id || hasSelectedChild(child, id)
    )
  }

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
      setSelectedId(item.id)
      if (typeof item.onUpdate === "function") {
        item.onUpdate()
      }
    }
  }

  const renderMenuItem = (item: MenuItem) => {
    if (item.show === false) return null

    const $hasChildren = !!item.children?.length
    const $isExpanded = expandedItems[item.id] ?? false
    const $isSelected = item.id === selectedId

    return (
      <Fragment key={item.id}>
        <MenuItem
          role="menuitem"
          aria-disabled={item.disabled ?? false}
          aria-expanded={$hasChildren ? $isExpanded : undefined}
          $hasChildren={$hasChildren}
          $disabled={item.disabled ?? false}
          $isSelected={$isSelected}
          $isParentOfExpanded={hasSelectedChild(item, selectedId)}
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
        {$hasChildren && $isExpanded && item.children && (
          <MenuSubItems $isExpanded={$isExpanded}>
            {item.children.map(renderMenuItem)}
          </MenuSubItems>
        )}
      </Fragment>
    )
  }

  return (
    <MenuContainer>
      {items.length ? (
        items.map((item) => (
          <Fragment key={item.id}>{renderMenuItem(item)}</Fragment>
        ))
      ) : (
        <MenuEmpty>{t("menu.empty")}</MenuEmpty>
      )}
    </MenuContainer>
  )
})

const MenuContainer = styled.div<{$drawerMode?: boolean}>`
  width: 100%;
  display: flex;
  flex-direction: column;
  ${({$drawerMode}) =>
    $drawerMode &&
    `
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    background: white;
    z-index: 1000;
    box-shadow: 2px 0 8px rgba(0,0,0,0.1);
    padding: 16px;
    box-sizing: border-box;
  `}
`

const MenuItem = styled.div<{
  $hasChildren?: boolean
  $disabled?: boolean
  $isSelected?: boolean
  $isParentOfExpanded?: boolean
  $drawerMode?: boolean
}>`
  display: flex;
  border-radius: 8px;
  overflow: hidden;
  flex-direction: row;
  width: 100%;
  box-sizing: border-box;
  align-items: center;
  padding: 8px;
  margin: 4px 0px;
  cursor: ${({$disabled}) => ($disabled ? "not-allowed" : "pointer")};
  background-color: ${({$disabled, $isSelected}) =>
    $disabled
      ? colors.Neutral200
      : $isSelected
        ? colors.Red100
        : "transparent"};
  color: ${({$isSelected, $isParentOfExpanded}) =>
    $isSelected || $isParentOfExpanded ? colors.Red400 : colors.Neutral900};
  opacity: ${({$disabled}) => ($disabled ? 0.6 : 1)};
  transition:
    background-color 0.3s ease,
    opacity 0.3s ease,
    color 0.3s ease;

  &:hover {
    background-color: ${({$disabled, $isSelected}) =>
      $disabled
        ? colors.Neutral200
        : $isSelected
          ? colors.Red100
          : colors.Red100};
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
  padding-right: 4px;
  transition:
    max-height 0.3s ease,
    opacity 0.3s ease;
`

const MenuEmpty = styled.div`
  padding: 16px;
  text-align: center;
  color: ${colors.Neutral300};
  font-size: 14px;
`

export default Menu
