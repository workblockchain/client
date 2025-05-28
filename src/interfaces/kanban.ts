export interface BaseCard {
  id: string
  title: string // 卡片标题
  description?: string // 卡片内容描述
}

export interface BaseList {
  id: string // 列表标题
  title: string
  cards: BaseCard[]
}
