import {create} from "zustand"

const MINUTE = 60

interface TimerState {
  // 计时器状态
  status: "idle" | "running" | "paused"
  remainingTime: number // 剩余时间(秒)

  // 计时器配置
  workDuration: number // 工作时长(秒)
  breakDuration: number // 休息时长(秒)
  isWorkPhase: boolean // 当前是否是工作阶段

  // 方法
  startTimer: () => void
  pauseTimer: () => void
  resetTimer: () => void
  tick: () => void
  togglePhase: () => void
  setWorkDuration: (minutes: number) => void
  setBreakDuration: (minutes: number) => void
}

export const usePomodoroTimer = create<TimerState>((set, get) => ({
  // 初始状态
  status: "idle",
  remainingTime: 25 * MINUTE, // 默认25分钟工作
  workDuration: 25 * MINUTE, // 25分钟工作
  breakDuration: 5 * MINUTE, // 5分钟休息
  isWorkPhase: true,

  // 开始计时
  startTimer: () => {
    if (get().status === "running") return
    set({status: "running"})
  },

  // 暂停计时
  pauseTimer: () => {
    if (get().status !== "running") return
    set({status: "paused"})
  },

  // 重置计时器
  resetTimer: () => {
    set({
      status: "idle",
      remainingTime: get().isWorkPhase
        ? get().workDuration
        : get().breakDuration,
    })
  },

  // 计时器滴答
  tick: () => {
    const {status, remainingTime} = get()
    if (status !== "running") return

    if (remainingTime <= 0) {
      get().togglePhase()
      return
    }

    set({remainingTime: remainingTime - 1})
  },

  // 切换工作/休息阶段
  togglePhase: () => {
    const {isWorkPhase, workDuration, breakDuration} = get()
    set({
      isWorkPhase: !isWorkPhase,
      remainingTime: !isWorkPhase ? workDuration : breakDuration,
    })
  },

  // 设置工作时长(分钟)
  setWorkDuration: (minutes) => {
    const duration = minutes * MINUTE
    set({workDuration: duration})
    if (get().isWorkPhase) {
      get().resetTimer()
    }
  },

  // 设置休息时长(分钟)
  setBreakDuration: (minutes) => {
    const duration = minutes * MINUTE
    set({breakDuration: duration})
    if (!get().isWorkPhase) {
      get().resetTimer()
    }
  },
}))

// 导出类型
export type {TimerState as PomodoroTimerState}
