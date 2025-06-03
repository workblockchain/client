import {colors} from "@/styles"
import {secondToTime} from "@/utils"
import {POMODORO_BREAK} from "@/utils/supportTags"
import dayjs from "dayjs"
import {useMemo} from "react"
import {toast} from "react-toastify"
import styled, {css} from "styled-components"
import {Title} from "."
import {Record as UnsignedRecord, WorkData} from "../../interfaces/records"
import {useSignedRecord} from "../../stores/useSignedRecord"
import {Button} from "../Button"

const workDataToRecord = (workData: WorkData): UnsignedRecord => {
  return {
    id: workData.wid,
    data: JSON.stringify(workData),
    createdBy: workData.userId,
    createdAt: workData.startTime,
  }
}

export const RecordsLayout = () => {
  const {workRecords, signedRecords, signRecord, save} = useSignedRecord()

  const isSigned = (workId: string) => {
    return signedRecords.some((sr) => sr.id === workId)
  }

  const handleSign = async (workId: string) => {
    const work = workRecords.find((w) => w.wid === workId)
    if (!work) return

    try {
      const record = workDataToRecord(work)
      await signRecord(record)
      save()
      toast.success("签名成功")
    } catch (error) {
      toast.error("签名失败")
      console.error("签名失败:", error)
    }
  }

  const grouped = useMemo(() => {
    // 按startTime倒序排序
    const sorted = [...workRecords].sort(
      (a, b) => dayjs(b.startTime).valueOf() - dayjs(a.startTime).valueOf()
    )

    // 按日期分组
    const groups: Record<string, WorkData[]> = {}
    sorted.forEach((record) => {
      const date = dayjs(record.startTime).format("YYYY-MM-DD")
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(record)
    })

    // 转换为二维数组
    return Object.values(groups)
  }, [workRecords])

  return (
    <RecordsContainer>
      <Title>工作记录历史</Title>
      <RecordsList>
        {workRecords.length === 0 ? (
          <EmptyState>
            <p>暂无工作记录</p>
            <span>您还没有任何工作记录</span>
          </EmptyState>
        ) : (
          grouped.map((group, groupIndex) => (
            <div key={groupIndex}>
              <GroupTitle>
                {dayjs(group[0].startTime).format("YYYY年MM月DD日")}
              </GroupTitle>
              {group.map((work) => {
                const datetime = dayjs(work.startTime)
                const isBreak = work.workTags.includes(POMODORO_BREAK)
                return (
                  <RecordItem
                    key={work.wid}
                    $isSigned={isSigned(work.wid)}
                    $isNarrow={isBreak}
                  >
                    <DateTime>
                      <span>{secondToTime(work.duration ?? 0)}</span>
                      {!isBreak && <span>{datetime.format("HH:mm:ss")}</span>}
                    </DateTime>
                    <RecordContent>
                      <p>{work.description || "工作记录"}</p>
                    </RecordContent>
                    {!isSigned(work.wid) && (
                      <Button onClick={() => handleSign(work.wid)}>签名</Button>
                    )}
                  </RecordItem>
                )
              })}
            </div>
          ))
        )}
      </RecordsList>
    </RecordsContainer>
  )
}

export default RecordsLayout

const DateTime = styled.span`
  display: flex;
  flex-direction: column;
  color: ${colors.Neutral500};
  width: 48px;

  &:first-child {
    font-size: 12px;
  }
`

const RecordsContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const RecordsList = styled.div`
  display: flex;
  flex-direction: column;
`

const RecordItem = styled.div<{$isSigned: boolean; $isNarrow?: boolean}>`
  padding: 8px 16px;
  background-color: #f5f5f526;
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: center;
  border-left: 4px solid
    ${(props) => (props.$isSigned ? colors.Blue700 : colors.Yellow700)};
  box-shadow: 0 0 0 1px ${colors.Neutral200};
  transition: background-color 0.3s ease-out;

  &:hover {
    background-color: #f5f5f57f;
  }

  ${(props) =>
    props.$isNarrow &&
    css`
      p {
        font-style: italic;
        color: ${colors.Neutral700};
        margin: 0;
      }
    `}
`

const EmptyState = styled.div`
  padding: 40px;
  text-align: center;
  color: #666;

  p {
    font-size: 1.2rem;
    margin-bottom: 8px;
  }

  span {
    font-size: 0.9rem;
  }
`

const RecordContent = styled.span`
  flex: 1;
`

const GroupTitle = styled.div`
  font-size: 14px;
  margin: 16px 0;
  color: ${colors.Neutral500};
  font-style: italic;
`
