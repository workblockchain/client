import Table from "@/components/Table/Table"
import {WorkData} from "@/interfaces/records"
import {useSignedRecord} from "@/stores/useSignedRecord"
import {TableGroupProps} from "../Table/TableGroup"
import {TableRowProps, TextCellProps, TimeCellProps} from "../Table/TableRow"

interface WorkContainerProps {}

export function WorkContainer(props: WorkContainerProps) {
  const {workRecords} = useSignedRecord()

  // 将 workRecords 转换为 Table 组件需要的格式
  const rows: TableRowProps[] = workRecords.map((record: WorkData) => ({
    row: [
      {type: "text", data: record.wid} as TextCellProps,
      {type: "time", data: record.startTime} as TimeCellProps,
      {type: "time", data: record.endTime} as TimeCellProps,
      {type: "time", data: record.duration} as TimeCellProps,
      {type: "text", data: record.outcome} as TextCellProps,
      {type: "text", data: record.usedOutcome} as TextCellProps,
      {type: "text", data: record.userId} as TextCellProps,
      {type: "text", data: record.workTags} as TextCellProps,
      {type: "text", data: record.requirementIds} as TextCellProps,
      {type: "text", data: record.projectIds} as TextCellProps,
      {type: "text", data: record.description} as TextCellProps,
      {type: "text", data: record.cover} as TextCellProps,
      {type: "text", data: record.usedBy} as TextCellProps,
      {type: "text", data: record.isSigned} as TextCellProps,
    ],
  }))

  const data: TableGroupProps[] = [
    {
      groupData: rows,
    },
  ]

  const titles = [
    "劳动id",
    "开始时间",
    "结束时间",
    "持续时长",
    "劳动成果",
    "前置产出",
    "劳动人ID",
    "劳动标签",
    "requirement ID",
    "projectIds",
    "描述",
    "cover",
    "后置产出",
    "签名状态",
  ]

  return <Table titles={titles} data={data} />
}

export default WorkContainer
