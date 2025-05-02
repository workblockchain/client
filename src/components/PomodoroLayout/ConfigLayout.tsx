// Copyright (c) 2025-present WorkBlockChain Team.
//
// WorkBlockChain Client is licensed under Mulan PSL v2.
// You can use this software according to the terms
// and conditions of the Mulan PSL v2.
// You may obtain a copy of Mulan PSL v2 at:
//
//   http://license.coscl.org.cn/MulanPSL2
//
// THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS,
// WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED,
// INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT,
// MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
// See the Mulan PSL v2 for more details.
//
// === Auto generated, DO NOT EDIT ABOVE ===

import styled from "styled-components"
import {colors} from "../../styles"
import {Button} from "../Button/Button"
import {Row} from "../Layout"
import Select from "../Select/Select"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const Label = styled.label`
  display: block;
  color: ${colors.Neutral700};
  font-weight: 500;
  line-height: 1;
`

const AdvancedOptions = styled.div`
  padding-top: 1rem;
  border-top: 1px solid ${colors.Neutral200};
`

const workOptions = [
  {value: "25", label: "25分钟"},
  {value: "45", label: "45分钟"},
  {value: "55", label: "55分钟"},
]

const breakOptions = [
  {value: "5", label: "5分钟"},
  {value: "10", label: "10分钟"},
  {value: "15", label: "15分钟"},
]

interface ConfigLayoutProps {
  workDuration: number
  breakDuration: number
  setWorkDuration: (minutes: number) => void
  setBreakDuration: (minutes: number) => void
  onClose: () => void
}

export const ConfigLayout = ({
  workDuration,
  breakDuration,
  setWorkDuration,
  setBreakDuration,
  onClose,
}: ConfigLayoutProps) => {
  return (
    <Container>
      <Row>
        <Label>工作时长</Label>
        <Select
          options={workOptions}
          value={workDuration.toString()}
          onChange={(v) => v && setWorkDuration(parseInt(v))}
        />
      </Row>
      <Row>
        <Label>休息时长</Label>
        <Select
          options={breakOptions}
          value={breakDuration.toString()}
          onChange={(v) => v && setBreakDuration(parseInt(v))}
        />
      </Row>

      <AdvancedOptions>
        <Label>高级设置</Label>
        <div style={{color: colors.Neutral500, fontSize: "0.875rem"}}>
          自定义计时模板（开发中）
        </div>
      </AdvancedOptions>

      <Button onClick={onClose} $variant="solid" $size="medium">
        返回计时器
      </Button>
    </Container>
  )
}
