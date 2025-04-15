import {create} from "zustand"

const MINUTE = 60 as const

type TimerPhaseType = "break" | "work"

interface TimerState {
  // 计时器状态
  status: "idle" | "running" | "paused"
  remainingTime: number // 剩余时间(秒)

  // 计时器配置
  workDuration: number // 工作时长(分钟)
  breakDuration: number // 休息时长(分钟)
  timerPhase: TimerPhaseType // 当前是否是工作阶段

  // 方法
  startTimer: () => void
  pauseTimer: () => void
  resetTimer: (phase?: TimerPhaseType) => void
  tick: () => void
  togglePhase: () => void
  setWorkDuration: (minutes: number) => void
  setBreakDuration: (minutes: number) => void
}

export const usePomodoroTimer = create<TimerState>((set, get) => ({
  // 初始状态
  status: "idle",
  remainingTime: 25 * MINUTE, // 默认25分钟工作
  workDuration: 25, // 25分钟工作
  breakDuration: 5, // 5分钟休息
  timerPhase: "work",

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
  resetTimer: (timerPhase: TimerPhaseType = get().timerPhase) => {
    let remainingTime = 0
    switch (timerPhase) {
      case "work":
        remainingTime = get().workDuration * MINUTE
        break
      case "break":
        remainingTime = get().breakDuration * MINUTE
        break
    }
    set({
      timerPhase,
      status: "idle",
      remainingTime,
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
    const {timerPhase, resetTimer} = get()
    const phase = timerPhase === "work" ? "break" : "work"
    resetTimer(phase)
  },

  // 设置工作时长(分钟)
  setWorkDuration: (minutes) => {
    const duration = minutes * MINUTE
    set({workDuration: duration})
    if (get().timerPhase === "work") {
      get().resetTimer()
    }
  },

  // 设置休息时长(分钟)
  setBreakDuration: (minutes) => {
    const duration = minutes * MINUTE
    set({breakDuration: duration})
    if (get().timerPhase === "break") {
      get().resetTimer()
    }
  },
}))

// 导出类型
export type {TimerState as PomodoroTimerState}
