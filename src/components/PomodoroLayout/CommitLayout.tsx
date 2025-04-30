import {useState} from "react"
import {useTranslation} from "react-i18next"
import styled from "styled-components"
import {Button, Textarea} from ".."
import {colors} from "../../styles"
import {LeftArrow} from "../Icons/LeftArrow"
import {Row} from "../Layout"

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`

const ButtomRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 8px;
`

const HintText = styled.div`
  font-size: 12px;
  line-height: 12px;
  color: ${colors.Neutral500};
  transition: opacity 0.3s ease-out;
`

const DescriptionBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: 6px;
  width: 100%;
  max-width: 400px;
`

export type CommitLayoutProps = {
  description: string
  onDescriptionChange: (value: string) => void
  onCommitConfirm: () => void
  onAbort: () => void
  timePassed: string
  onBack: () => void
  remainingTime: number
}

export const CommitLayout = ({
  description,
  onDescriptionChange,
  onCommitConfirm,
  onAbort,
  timePassed,
  remainingTime,
  onBack,
}: CommitLayoutProps) => {
  const {t} = useTranslation()
  const [abortConfirm, setAbortConfirm] = useState(false)
  const hintText = t("commit.hintText", {timePassed})

  const handleClickAbort = () => {
    setAbortConfirm(true)
  }

  return (
    <DescriptionBox>
      <Row>
        {remainingTime > 0 && (
          <Button $variant="icon" onClick={onBack}>
            <LeftArrow width={18} height={18} color={colors.Neutral700} />
          </Button>
        )}
        <HintText>{hintText}</HintText>
      </Row>
      <Textarea
        value={description}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          onDescriptionChange(e.target.value)
        } // 添加类型注解
        placeholder={t`description.placeholder`}
      />
      <ButtomRow>
        <ButtonGroup>
          <Button $size="small" onClick={onCommitConfirm}>
            {t`commit.confirm`}
          </Button>
          <Button
            $size="small"
            style={{color: colors.Neutral400}}
            $variant="text"
            onClick={handleClickAbort}
          >
            {t`commit.abort`}
          </Button>
          <Button
            $size="small"
            $variant="text"
            style={{
              opacity: abortConfirm ? 1 : 0,
              pointerEvents: abortConfirm ? "auto" : "none",
              color: colors.Red600,
              textDecoration: "underline",
              marginLeft: "auto",
            }}
            onClick={onAbort}
          >
            {t`commit.confirm-abort`}
          </Button>
        </ButtonGroup>
        <HintText
          style={{opacity: abortConfirm ? 1 : 0}}
        >{t`commit.abort-hint`}</HintText>
      </ButtomRow>
    </DescriptionBox>
  )
}
