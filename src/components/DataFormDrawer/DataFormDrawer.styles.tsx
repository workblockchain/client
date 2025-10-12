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

import {colors} from "@/styles/colors"
import styled from "styled-components"

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0;
`

export const Form = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const FieldLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: ${colors.Neutral800};
  display: flex;
  align-items: center;
  gap: 4px;
`

export const FieldError = styled.span`
  font-size: 12px;
  color: ${colors.Red500};
  margin-top: 4px;
`

export const Actions = styled.div`
  display: flex;
  padding: 8px 12px;
`
