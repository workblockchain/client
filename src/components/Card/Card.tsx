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

import React, {forwardRef} from "react"
import styled from "styled-components"

/**
 * Card组件的属性接口
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 卡片唯一标识
   */
  id: string
  /**
   * 卡片标题
   */
  title?: React.ReactNode

  /**
   * 卡片尺寸
   * @default "medium"
   */
  size?: "small" | "medium" | "large" | "full"

  /**
   * 卡片底部区域内容
   */
  footer?: React.ReactNode

  /**
   * 卡片操作区域内容（位于底部区域的底部）
   */
  actions?: React.ReactNode

  /**
   * 卡片内容
   */
  children?: React.ReactNode

  /**
   * 自定义类名
   */
  className?: string

  /**
   * 点击事件处理函数
   */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {title, size = "medium", footer, actions, children, className, onClick},
    ref
  ) => {
    return (
      <CardContainer
        className={className}
        size={size}
        ref={ref}
        onClick={onClick}
      >
        {title && <CardHeader>{title}</CardHeader>}
        <CardBody>{children}</CardBody>
        {(footer || actions) && (
          <CardFooter>
            {footer && <FooterContent>{footer}</FooterContent>}
            {actions && <ActionsContainer>{actions}</ActionsContainer>}
          </CardFooter>
        )}
      </CardContainer>
    )
  }
)

Card.displayName = "Card"

const sizeMap = {
  small: {
    padding: "12px",
    borderRadius: "6px",
  },
  medium: {
    padding: "16px",
    borderRadius: "8px",
  },
  large: {
    padding: "20px",
    borderRadius: "10px",
  },
  full: {
    padding: "24px",
    borderRadius: "12px",
  },
}

const CardContainer = styled.div<{size: "small" | "medium" | "large" | "full"}>`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: ${({size}) => sizeMap[size].borderRadius};
  padding: ${({size}) => sizeMap[size].padding};
  gap: 12px;
`

const CardHeader = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
`

const CardBody = styled.div`
  flex: 1;
`

const CardFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 8px;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
`

const FooterContent = styled.div`
  font-size: 14px;
  color: #666;
`

const ActionsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`
