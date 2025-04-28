import {useTranslation} from "react-i18next"
import styled from "styled-components"
import {Button} from ".."
import {colors} from "../../styles" // 添加颜色导入
import {Textarea} from "../Textarea/Textarea" // 修正导入路径

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`

const DescriptionBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  background: ${colors.Neutral100}; // 直接使用颜色变量
  border-radius: 6px;
  width: 100%;
  max-width: 400px;
`

export type CommitLayoutProps = {
  description: string
  onDescriptionChange: (value: string) => void
  onCommitConfirm: () => void
  onAbort: () => void
}

export const CommitLayout = ({
  description,
  onDescriptionChange,
  onCommitConfirm,
  onAbort,
}: CommitLayoutProps) => {
  const {t} = useTranslation()

  return (
    <DescriptionBox>
      <Textarea
        value={description}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          onDescriptionChange(e.target.value)
        } // 添加类型注解
        placeholder={t`description.placeholder`}
      />
      <ButtonGroup>
        <Button size="small" onClick={onCommitConfirm}>
          {t`timer.commit`}
        </Button>
        <Button size="small" variant="text" onClick={onAbort}>
          {t`common.cancel`}
        </Button>
      </ButtonGroup>
    </DescriptionBox>
  )
}
