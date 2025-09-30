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

import {Button} from "../Button"
import {Dropdown} from "../Dropdown"
import {svgIcons} from "../Icons"
import {ConditionRow} from "./ConditionRow"
import * as S from "./DataConditionBuilder.styles"
import {BaseCondition, DataConditionBuilderProps, ModeConfig} from "./types"

// 模式特定配置
const MODE_CONFIG: Record<string, ModeConfig> = {
  filter: {
    defaultCondition: "equal",
    allowMultiple: true,
    valueRequired: true,
  },
  group: {
    defaultCondition: "asc",
    allowMultiple: false,
    valueRequired: false,
  },
  sort: {
    defaultCondition: "asc",
    allowMultiple: false,
    valueRequired: false,
  },
}

// Flyout 组件 Props 接口
interface FlyoutProps {
  conditions: BaseCondition[]
  availableFields: DataConditionBuilderProps["availableFields"]
  onConditionsChange: DataConditionBuilderProps["onConditionsChange"]
  mode: string
  config: ModeConfig
  flyoutTitle: string
}

// Flyout 组件 - 专注于 UI 渲染和简单的数据处理
const Flyout = ({
  conditions,
  availableFields,
  onConditionsChange,
  mode,
  config,
  flyoutTitle,
}: FlyoutProps) => {
  const updateCondition = (id: string, updates: Partial<BaseCondition>) => {
    const updatedConditions = conditions.map((c) =>
      c.id === id ? {...c, ...updates} : c
    )
    onConditionsChange(updatedConditions)
  }

  const removeCondition = (id: string) => {
    const updatedConditions = conditions.filter((c) => c.id !== id)
    onConditionsChange(updatedConditions)
  }

  const addNewCondition = () => {
    const newCondition: BaseCondition = {
      id: `new-${Date.now()}`,
      field: "",
      condition: config.defaultCondition,
      value: "",
    }
    onConditionsChange([...conditions, newCondition])
  }

  const hasIncompleteCondition = conditions.some(
    (c) => !c.field || (config.valueRequired && !c.value)
  )

  return (
    <S.FlyoutContent>
      <S.FlyoutContainer>
        <S.FlyoutTitle>{flyoutTitle}</S.FlyoutTitle>
        {conditions.length === 0 ? (
          <S.EmptyState>暂无条件</S.EmptyState>
        ) : (
          <S.ConditionsRow>
            {conditions.map((condition) => (
              <ConditionRow
                key={condition.id}
                condition={condition}
                availableFields={availableFields}
                onUpdate={updateCondition}
                onRemove={removeCondition}
                mode={mode}
              />
            ))}
          </S.ConditionsRow>
        )}
        {config.allowMultiple && (
          <Button
            style={{width: "fit-content"}}
            onClick={addNewCondition}
            $size="small"
            $variant="iconWithLabel"
            disabled={hasIncompleteCondition}
          >
            <svgIcons.Plus />
            <span>添加条件</span>
          </Button>
        )}
      </S.FlyoutContainer>
    </S.FlyoutContent>
  )
}

// 主组件 - 专注于业务逻辑配置
export const DataConditionBuilder = ({
  conditions,
  availableFields,
  onConditionsChange,
  mode,
  disabled = false,
  buttonLabel = "条件",
  flyoutTitle = "条件设置",
}: DataConditionBuilderProps) => {
  const config = MODE_CONFIG[mode]
  return (
    <Dropdown
      dropdownElement={
        <Flyout
          conditions={conditions}
          availableFields={availableFields}
          onConditionsChange={onConditionsChange}
          mode={mode}
          config={config}
          flyoutTitle={flyoutTitle}
        />
      }
    >
      {(setOpen, setRect) => (
        <Button
          $variant="solid"
          $size="small"
          disabled={disabled}
          onClick={() => setOpen(true)}
          ref={(el) => {
            if (el) setRect(() => el?.getBoundingClientRect())
          }}
        >
          {buttonLabel}
        </Button>
      )}
    </Dropdown>
  )
}
