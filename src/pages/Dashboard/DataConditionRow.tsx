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

import {DataConditionBuilder} from "@/components/DataConditionBuilder"
import {WorkRecordFieldDefinition} from "@/pages/Dashboard/interfaces"
import {workRecordFieldsToConditionDefinitions} from "@/pages/Dashboard/workRecordUtils"
import {colors} from "@/styles"
import {useMemo} from "react"
import styled from "styled-components"
import {useViewPreference} from "./useDashboardPreference"

export function DataConditionRow({
  fieldDefinitions,
}: {
  fieldDefinitions: WorkRecordFieldDefinition[]
}) {
  const filter = useViewPreference((state) => state.filterConditions)
  const setFilter = useViewPreference((state) => state.setFilterConditions)
  const group = useViewPreference((state) => state.groupConditions)
  const setGroup = useViewPreference((state) => state.setGroupConditions)
  const sort = useViewPreference((state) => state.sortConditions)
  const setSort = useViewPreference((state) => state.setSortConditions)

  const fields = useMemo(
    () => workRecordFieldsToConditionDefinitions(fieldDefinitions),
    [fieldDefinitions]
  )

  return (
    <Container>
      <DataConditionBuilder
        conditions={filter}
        availableFields={fields}
        onConditionsChange={setFilter}
        mode="filter"
        buttonLabel="筛选"
        flyoutTitle="筛选条件"
      />
      <DataConditionBuilder
        conditions={group}
        availableFields={fields}
        onConditionsChange={setGroup}
        mode="group"
        buttonLabel="分组"
        flyoutTitle="分组设置"
      />
      <DataConditionBuilder
        conditions={sort}
        availableFields={fields}
        onConditionsChange={setSort}
        mode="sort"
        buttonLabel="排序"
        flyoutTitle="排序设置"
      />
    </Container>
  )
}

export default DataConditionRow

const Container = styled.div`
  display: flex;
  gap: 1rem;
  padding: 12px 16px;
  border-radius: 8px;
  background-color: ${colors.Neutral100};
`
