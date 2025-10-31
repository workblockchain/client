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
import {fieldDefinitionsToConditionDefinitions} from "@/pages/Dashboard/workRecordUtils"
import {colors} from "@/styles"
import {t} from "i18next"
import {useMemo} from "react"
import styled from "styled-components"
import {FieldDefinition} from "./fieldDefinitions"
import {useViewPreference} from "./useDashboardPreference"

export function DataConditionRow({
  fieldDefinitions,
}: {
  fieldDefinitions: FieldDefinition[]
}) {
  const filter = useViewPreference((state) => state.filterConditions)
  const setFilter = useViewPreference((state) => state.setFilterConditions)
  const group = useViewPreference((state) => state.groupConditions)
  const setGroup = useViewPreference((state) => state.setGroupConditions)
  const sort = useViewPreference((state) => state.sortConditions)
  const setSort = useViewPreference((state) => state.setSortConditions)

  const fields = useMemo(
    () => fieldDefinitionsToConditionDefinitions(fieldDefinitions),
    [fieldDefinitions]
  )

  return (
    <Container>
      <DataConditionBuilder
        conditions={filter}
        availableFields={fields}
        onConditionsChange={setFilter}
        mode="filter"
        buttonLabel={t`dashboard.filter`}
        flyoutTitle={t`dashboard.filterConditions`}
      />
      <DataConditionBuilder
        conditions={group}
        availableFields={fields}
        onConditionsChange={setGroup}
        mode="group"
        buttonLabel={t`dashboard.group`}
        flyoutTitle={t`dashboard.groupSettings`}
      />
      <DataConditionBuilder
        conditions={sort}
        availableFields={fields}
        onConditionsChange={setSort}
        mode="sort"
        buttonLabel={t`dashboard.sort`}
        flyoutTitle={t`dashboard.sortSettings`}
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
