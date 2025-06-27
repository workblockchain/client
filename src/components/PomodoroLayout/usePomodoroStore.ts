import {create} from "zustand"

interface PomodoroStore {
  currentRequirementId: string // 当前选中的需求ID
  setCurrentRequirementId: (id: string) => void // 设置当前选中的需求ID
  isReqCardOpen: boolean // 是否打开需求卡片
  setIsReqCardOpen: (open: boolean) => void
  isReqListOpen: boolean // 是否打开需求列表
  setIsReqListOpen: (open: boolean) => void
}
const usePomodoroStore = create<PomodoroStore>((set) => ({
  currentRequirementId: "REQ-001",
  setCurrentRequirementId: (id) => set({currentRequirementId: id}),
  isReqCardOpen: false,
  setIsReqCardOpen: (open) => set({isReqCardOpen: open}),
  isReqListOpen: false,
  setIsReqListOpen: (open) => set({isReqListOpen: open}),
}))

export default usePomodoroStore
