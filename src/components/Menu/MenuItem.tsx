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

import AngleRight from "@/assets/AngleRight.svg?react"
import {colors} from "@/styles"
import styled from "styled-components"

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  label: string
  disabled?: boolean
  isSelected?: boolean
  hasChildren?: boolean
  icon?: React.ReactNode
  isExpanded?: boolean
  show?: boolean
  url?: string
}

export const MenuItem = ({
  label,
  isSelected,
  isExpanded = false,
  hasChildren,
  disabled = false,
  children,
  icon,
  ...props
}: Props) => {
  return (
    <MenuItemComponent>
      <MenuItemParent
        $hasChildren={hasChildren}
        $isSelected={isSelected}
        $disabled={disabled}
        {...props}
      >
        {icon ? icon : null}
        <MenuItemTitle>{label}</MenuItemTitle>
        {hasChildren && (
          <MenuItemArrow $isExpanded={isExpanded}>
            <AngleRight width={20} height={20} />
          </MenuItemArrow>
        )}
      </MenuItemParent>
      {hasChildren && children}
    </MenuItemComponent>
  )
}

const MenuItemComponent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
`

const MenuItemTitle = styled.span``

const MenuItemArrow = styled.div<{$isExpanded: boolean}>`
  display: flex;
  align-items: center;
  font-size: 12px;
  transform: ${({$isExpanded}) =>
    $isExpanded ? "rotate(90deg)" : "rotate(0deg)"};
  transition: transform 0.3s ease;
`

const MenuItemParent = styled.div<{
  $hasChildren?: boolean
  $disabled?: boolean
  $isSelected?: boolean
  $isParentOfExpanded?: boolean
}>`
  display: flex;
  border-radius: 8px;
  align-items: center;
  padding: 6px;
  gap: 4px;
  background-color: ${({$disabled, $isSelected}) =>
    $disabled
      ? colors.Neutral200
      : $isSelected
        ? colors.Red100
        : "transparent"};
  color: ${({$isSelected, $isParentOfExpanded}) =>
    $isSelected || $isParentOfExpanded ? colors.Red400 : colors.Neutral900};
  opacity: ${({$disabled}) => ($disabled ? 0.6 : 1)};
  user-select: none;
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

  & > div:last-child {
    margin-left: auto;
  }
`
