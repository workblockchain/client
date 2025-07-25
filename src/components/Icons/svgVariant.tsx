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

// === Auto generated, DO NOT EDIT ABOVE ===
import Arrow from "@/assets/arrow.svg?react"

type SvgProps = React.SVGProps<SVGSVGElement>

const ArrowVariant = {
  Left: (props: SvgProps) => (
    <Arrow style={{transform: "rotate(90deg)", ...props.style}} {...props} />
  ),
  Right: (props: SvgProps) => (
    <Arrow style={{transform: "rotate(-90deg)", ...props.style}} {...props} />
  ),
  Down: (props: SvgProps) => <Arrow {...props} />,
  Up: (props: SvgProps) => (
    <Arrow style={{transform: "rotate(180deg)", ...props.style}} {...props} />
  ),
}
export {ArrowVariant}
