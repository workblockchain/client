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

import {DataConditionBuilder} from "./DataConditionBuilder"
import {BaseCondition, ConditionDefinition} from "./types"

interface FilterMenuProps {
  conditions: BaseCondition[]
  availableFields: ConditionDefinition[]
  onConditionsChange: (conditions: BaseCondition[]) => void
  disabled?: boolean
}

export const FilterMenu = ({
  conditions,
  availableFields,
  onConditionsChange,
  disabled,
}: FilterMenuProps) => {
  return (
    <DataConditionBuilder
      conditions={conditions}
      availableFields={availableFields}
      onConditionsChange={onConditionsChange}
      mode="filter"
      disabled={disabled}
      buttonLabel="筛选"
      flyoutTitle="筛选条件"
    />
  )
}
