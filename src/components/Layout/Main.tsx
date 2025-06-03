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

import {colors} from "@/styles"
import {isTauri} from "@tauri-apps/api/core"
import {t} from "i18next"
import {Outlet, useLocation, useNavigate} from "react-router"
import styled from "styled-components"
import {HintText} from "."
import {Button} from ".."
import {svgIcons} from "../Icons"

export function Main() {
  const navigate = useNavigate()
  const location = useLocation()
  const isMain = location.pathname === "/"
  const onClose = () => {
    if (isTauri()) {
      window.close()
    } else {
      navigate(-1)
    }
  }
  return (
    <Container $padding={!isMain}>
      {!isTauri() && !isMain && (
        <Button $variant="iconWithLabel" onClick={onClose}>
          <svgIcons.Arrow style={{rotate: "90deg"}} />
          <HintText>{t`general.back`}</HintText>
        </Button>
      )}
      <Outlet />
    </Container>
  )
}

const Container = styled.div<{$padding: boolean}>`
  padding: ${(props) => (props.$padding ? "24px" : "0")};
  background-color: ${colors.Red100};
  min-height: 100vh;
`
