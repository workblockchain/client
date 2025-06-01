import {toast} from "react-toastify"
import styled from "styled-components"
import {Title} from "."
import {Record, WorkData} from "../../interfaces/records"
import {useSignedRecord} from "../../stores/useSignedRecord"
import {Button} from "../Button"

const workDataToRecord = (workData: WorkData): Record => {
  return {
    id: workData.wid,
    data: JSON.stringify(workData),
    createdBy: workData.userId,
    createdAt: workData.startTime,
  }
}

export const RecordsPage = () => {
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
      toast.success("记录签名成功")
    } catch (error) {
      toast.error("签名失败")
      console.error("签名失败:", error)
    }
  }

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
          workRecords.map((work) => (
            <RecordItem key={work.wid} $isSigned={isSigned(work.wid)}>
              <RecordContent>
                <p>{work.description || "工作记录"}</p>
                <span>
                  创建时间: {new Date(work.startTime).toLocaleString()}
                </span>
              </RecordContent>
              {!isSigned(work.wid) && (
                <Button onClick={() => handleSign(work.wid)}>签名</Button>
              )}
            </RecordItem>
          ))
        )}
      </RecordsList>
    </RecordsContainer>
  )
}

export default RecordsPage

const RecordsContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`

const RecordsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const RecordItem = styled.div<{$isSigned: boolean}>`
  padding: 16px;
  border-radius: 8px;
  background-color: #f5f5f5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-left: 4px solid ${(props) => (props.$isSigned ? "#4CAF50" : "#FF9800")};
`

const EmptyState = styled.div`
  padding: 40px;
  text-align: center;
  color: #666;

  p {
    font-size: 1.2em;
    margin-bottom: 8px;
  }

  span {
    font-size: 0.9em;
  }
`

const RecordContent = styled.div`
  flex: 1;

  p {
    margin: 0 0 8px 0;
  }

  span {
    font-size: 0.8em;
    color: #666;
  }
`
