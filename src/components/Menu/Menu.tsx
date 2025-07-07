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
import {Fragment, ReactNode, useCallback, useState} from "react"
import {useTranslation} from "react-i18next"
import {useNavigate} from "react-router"
import styled, {css} from "styled-components"

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

const findParentPath = (
  targetId: string,
  menuItems: MenuItem[],
  currentPath: string[] = []
): string[] => {
  for (const item of menuItems) {
    if (item.id === targetId) {
      return currentPath // 返回到达目标节点的父级路径
    }

    if (item.children?.length) {
      const foundPath = findParentPath(targetId, item.children, [
        ...currentPath,
        item.id,
      ])

      if (
        foundPath.length > 0 ||
        item.children.some((child) => child.id === targetId)
      ) {
        return item.children.some((child) => child.id === targetId)
          ? [...currentPath, item.id]
          : foundPath
      }
    }
  }
  return []
}

// 检查某个项是否有选中的子项
const hasSelectedChild = (
  item: MenuItem,
  selectedId: string | undefined
): boolean => {
  if (!selectedId || !item.children?.length) return false

  const checkChildren = (children: MenuItem[]): boolean => {
    return children.some(
      (child) =>
        child.id === selectedId ||
        (child.children?.length && checkChildren(child.children))
    )
  }

  return checkChildren(item.children)
}

export interface MenuProps {
  items: MenuItem[]
  initialSelectedId?: string
}
export const Menu = ({items, initialSelectedId}: MenuProps) => {
  const navigate = useNavigate()
  const {t} = useTranslation()

  // 查找从根节点到目标节点的父级路径（用于展开菜单）

  // 展开项
  const [expandedItems, setExpandedItems] = useState<Set<string>>(() => {
    if (!initialSelectedId) return new Set()
    const parentPath = findParentPath(initialSelectedId, items)
    return new Set(parentPath)
  })
  //选中项
  const [selectedId, setSelectedId] = useState<string | undefined>(
    initialSelectedId
  )

  const toggleExpand = useCallback(
    (id: string) => {
      if (!id) return

      setExpandedItems((prev) => {
        const newSet = new Set(prev)
        if (newSet.has(id)) {
          newSet.delete(id)
        } else {
          newSet.add(id)
        }
        return newSet
      })
    },
    [setExpandedItems]
  )

  const handleItemClick = useCallback(
    (item: MenuItem) => {
      if (!item?.id) return

      const hasChildren =
        Array.isArray(item.children) && item.children.length > 0

      if (hasChildren) {
        toggleExpand(item.id)
      } else if (item.url) {
        try {
          navigate(item.url)
          setSelectedId(item.id)
          if (typeof item.onUpdate === "function") {
            item.onUpdate()
          }
        } catch (error) {
          console.error("Navigation or callback execution failed:", error)
        }
      }
    },
    [navigate, toggleExpand]
  )

  const renderMenuItem = useCallback(
    (item: MenuItem): React.ReactNode => {
      if (!item?.id || item.show === false) return null

      const hasChildren =
        Array.isArray(item.children) && item.children.length > 0

      const isExpanded = expandedItems.has(item.id)
      return (
        <Fragment key={item.id}>
          <MenuItem
            $hasChildren={hasChildren}
            $disabled={item.disabled}
            $isSelected={item.id === selectedId}
            $isParentOfExpanded={hasSelectedChild(item, selectedId)}
            onClick={() => !item.disabled && handleItemClick(item)}
          >
            {item.icon && <MenuItemIcon>{item.icon}</MenuItemIcon>}
            <MenuItemTitle>{item.label}</MenuItemTitle>
            {hasChildren && (
              <MenuItemArrow $isExpanded={isExpanded}>
                <Vector />
              </MenuItemArrow>
            )}
          </MenuItem>
          {hasChildren && isExpanded && item.children && (
            <MenuSubItems $isExpanded={isExpanded}>
              {item.children.map(renderMenuItem)}
            </MenuSubItems>
          )}
        </Fragment>
      )
    },
    [expandedItems, selectedId, handleItemClick, hasSelectedChild]
  )

  return (
    <MenuContainer>
      {items.length > 0 ? (
        items.map(renderMenuItem)
      ) : (
        <MenuEmpty>{t("menu.empty")}</MenuEmpty>
      )}
    </MenuContainer>
  )
}

export default Menu

const MenuContainer = styled.div<{$drawerMode?: boolean}>`
  width: 100%;
  display: flex;
  flex-direction: column;
  ${({$drawerMode}) =>
    $drawerMode &&
    css`
      position: fixed;
      top: 0;
      left: 0;
      height: 100vh;
      background: white;
      z-index: 1000;
      box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
      padding: 16px;
      box-sizing: border-box;
    `}
`

const MenuItemIcon = styled.span`
  display: flex;
  svg {
    width: 20px;
    height: 20px;
  }
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
  width: 100%;
  box-sizing: border-box;
  align-items: center;
  gap: 8px;
  padding: 8px;
  margin: 4px 0px;
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
  cursor: ${({$disabled}) => ($disabled ? "not-allowed" : "pointer")};
`
