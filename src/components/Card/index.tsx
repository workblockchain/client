import {styleCard} from "@/styles/modules"

interface Props {
  title?: string
  children?: React.ReactNode
  width?: string
  footer?: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
  onMouseEnter?: (e: React.MouseEvent<HTMLDivElement>) => void
  onMouseLeave?: (e: React.MouseEvent<HTMLDivElement>) => void
  onMouseDown?: (e: React.MouseEvent<HTMLDivElement>) => void
  onMouseUp?: (e: React.MouseEvent<HTMLDivElement>) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void
  onFocus?: (e: React.FocusEvent<HTMLDivElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLDivElement>) => void
}

const dynamicCss = (width: number | string) => {
  return {
    "--width": width,
  } as React.CSSProperties
}

export const Card = ({
  title,
  width = "450px",
  children,
  footer,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onMouseDown,
  onMouseUp,
  onKeyDown,
  onFocus,
  onBlur,
}: Props) => {
  return (
    <div
      className={styleCard.base}
      style={dynamicCss(width)}
      tabIndex={0}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      {title && <p className={styleCard.title}>{title}</p>}
      <div>{children || "内容为空"}</div>
      {footer && <div className={styleCard.footer}>{footer}</div>}
    </div>
  )
}
