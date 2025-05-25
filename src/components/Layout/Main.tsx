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

import GearIcon from "@/assets/gear.svg?react"
import NavigationSvg from "@/assets/navigation.svg?react"
import PeopleIcon from "@/assets/people.svg?react"
import {useState} from "react"
import {Outlet} from "react-router"
import {paths} from "../../router"
import {useConditionalNavigation} from "../../router/useConditionalNavigation"
import {Portal} from "../Portal"
import {Navigation} from "./Navigation"

export function Main() {
  // 配置按钮点击处理
  const handleConfigClick = () => {
    setShowNavigation(true)
  }
  const navigation = useConditionalNavigation()
  const demoTargets = [
    {
      icon: <GearIcon width={24} height={24} />,
      label: "设置",
      onClick: () =>
        navigation({
          path: paths.config,
          tauriWindowOptions: {label: "config", title: "Workchain - 设置"},
        }),
    },
    {
      icon: <PeopleIcon width={24} height={24} />,
      label: "个人信息",
      onClick: () =>
        navigation({
          path: paths.profile,
          tauriWindowOptions: {label: "profile", title: "Workchain - 个人信息"},
        }),
    },
  ]
  const [showNavigation, setShowNavigation] = useState(false)

  return (
    <>
      <Portal>
        <Navigation
          targets={demoTargets}
          onClose={() => setShowNavigation(false)}
          show={showNavigation}
        />
      </Portal>
      <NavigationSvg
        onClick={handleConfigClick}
        style={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
          cursor: "pointer",
          opacity: 0.6,
        }}
      />
      <Outlet />
    </>
  )
}
