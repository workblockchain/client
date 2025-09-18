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

import styled from "styled-components"
import {colors} from "../../styles/colors"
import {zIndex} from "../../styles/zIndex"

export const FlyoutContainer = styled.div`
  padding: 12px;
  min-width: 400px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`

export const ConditionsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  margin-bottom: 12px;
`

export const EditableCondition = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 8px;
  background: ${colors.Neutral100};
  border-radius: 4px;
`

export const NewConditionForm = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`

export const EmptyState = styled.div`
  text-align: center;
  color: ${colors.Neutral500};
  font-size: 14px;
  padding: 16px;
`

export const ConditionCount = styled.span`
  margin-left: 8px;
  font-size: 12px;
  color: ${colors.Neutral600};
`

export const FlyoutTrigger = styled.div`
  position: relative;
  display: inline-block;
`

export const FlyoutContent = styled.div<{$isOpen: boolean}>`
  display: ${(props) => (props.$isOpen ? "block" : "none")};
  position: absolute;
  top: 100%;
  left: 0;
  z-index: ${zIndex.filterFlyout};
  margin-top: 8px;
`
