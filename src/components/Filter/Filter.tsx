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

import {useState} from "react"
import {Button} from "../Button"
import {
  ConditionsRow,
  EmptyState,
  FlyoutContainer,
  FlyoutContent,
  FlyoutTrigger,
} from "./Filter.styles"
import {operatorOptions} from "./Filter.utils"
import {FilterCondition} from "./FilterCondition"
import {FilterCondition as FilterConditionType, FilterProps} from "./types"

export const Filter = ({
  filters,
  disabled = false,
  onConditionsChange,
}: FilterProps) => {
  const [isFlyoutOpen, setIsFlyoutOpen] = useState(false)
  const [conditions, setConditions] = useState<FilterConditionType[]>([])

  const updateCondition = (
    id: string,
    updates: Partial<FilterConditionType>
  ) => {
    const updatedConditions = conditions.map((c) =>
      c.id === id ? {...c, ...updates} : c
    )
    setConditions(updatedConditions)
    // Only call onConditionsChange with complete conditions
    const completeConditions = updatedConditions.filter(
      (c) => c.field && c.operator
    )
    onConditionsChange?.(completeConditions)
  }

  const removeCondition = (id: string) => {
    const updatedConditions = conditions.filter((c) => c.id !== id)
    setConditions(updatedConditions)
    onConditionsChange?.(updatedConditions.filter((c) => c.field && c.operator))
  }

  const addNewCondition = () => {
    const newCondition: FilterConditionType = {
      id: `new-${Date.now()}`,
      field: "",
      operator: "equal",
      value: "",
    }
    setConditions([...conditions, newCondition])
  }

  const handleFlyoutToggle = (isOpen: boolean) => {
    setIsFlyoutOpen(isOpen)
    // When closing flyout, remove incomplete conditions
    if (!isOpen) {
      const completeConditions = conditions.filter((c) => c.field && c.operator)
      setConditions(completeConditions)
      onConditionsChange?.(completeConditions)
    }
  }

  const hasIncompleteCondition = conditions.some((c) => !c.field || !c.operator)

  return (
    <FlyoutTrigger>
      <Button
        $variant="solid"
        $size="small"
        disabled={disabled}
        onClick={() => handleFlyoutToggle(!isFlyoutOpen)}
      >
        筛选
      </Button>

      <FlyoutContent $isOpen={isFlyoutOpen}>
        <FlyoutContainer>
          <h4>筛选条件</h4>

          {conditions.length === 0 ? (
            <EmptyState>暂无筛选条件</EmptyState>
          ) : (
            <ConditionsRow>
              {conditions.map((condition) => (
                <FilterCondition
                  key={condition.id}
                  condition={condition}
                  filters={filters}
                  onUpdate={updateCondition}
                  onRemove={removeCondition}
                  operatorOptions={operatorOptions}
                />
              ))}
            </ConditionsRow>
          )}

          <Button
            onClick={addNewCondition}
            $size="small"
            $variant="solid"
            disabled={hasIncompleteCondition}
            style={{
              height: "24px",
              padding: "0 8px",
              fontSize: "12px",
              marginTop: "12px",
            }}
          >
            添加条件
          </Button>
        </FlyoutContainer>
      </FlyoutContent>
    </FlyoutTrigger>
  )
}
