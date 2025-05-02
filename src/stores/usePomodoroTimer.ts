import {create} from "zustand"

const MINUTE = 60 as const

export type TimerPhaseType = "break" | "work"

interface TimerConfig {
  workDuration: number
  breakDuration: number
}

interface TimerState {
  // 计时器状态
  status: "idle" | "running" | "paused"
  remainingTime: number // 剩余时间(秒)
  intervalId?: NodeJS.Timeout // 定时器引用

  // 计时器配置
  workDuration: number // 工作时长(分钟)
  breakDuration: number // 休息时长(分钟)
  timerPhase: TimerPhaseType // 当前阶段状态

  // 保存配置
  export: () => TimerConfig
  import: (data: TimerConfig) => void

  // 方法
  startTimer: () => void
  pauseTimer: () => void
  resetTimer: (phase?: TimerPhaseType) => void
  tick: () => void
  timePassed: () => number
  togglePhase: (nextPhase?: TimerPhaseType) => void
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
    const state = get()
    if (state.status === "running") return

    // 清除已有定时器
    if (state.intervalId) {
      clearInterval(state.intervalId)
    }

    // 启动新定时器
    const intervalId = setInterval(() => {
      get().tick()
    }, 1000)

    set({status: "running", intervalId})
  },

  // 暂停计时
  pauseTimer: () => {
    const state = get()
    if (state.status !== "running") return

    if (state.intervalId) {
      clearInterval(state.intervalId)
    }
    set({status: "paused", intervalId: undefined})
  },

  // 重置计时器
  resetTimer: (timerPhase: TimerPhaseType = get().timerPhase) => {
    const state = get()
    if (state.intervalId) {
      clearInterval(state.intervalId)
    }

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

    // 更新时间并检查是否需要重启定时器
    set((state) => {
      const newTime = remainingTime - 1

      // 当剩余时间变化到0时需要重启定时器
      if (newTime === 0) {
        if (state.intervalId) {
          clearInterval(state.intervalId)
        }
        const newIntervalId = setInterval(() => {
          get().tick()
        }, 1000)
        return {remainingTime: newTime, intervalId: newIntervalId}
      }

      return {remainingTime: newTime}
    })
  },

  timePassed: () => {
    const {remainingTime, timerPhase, workDuration, breakDuration} = get()
    switch (timerPhase) {
      case "work":
        return workDuration * MINUTE - remainingTime
      case "break":
        return breakDuration * MINUTE - remainingTime
    }
  },
  // 切换工作/休息阶段，或指定下一阶段，并重设定时器
  togglePhase: (nextPhase) => {
    const {timerPhase, resetTimer} = get()
    if (nextPhase) {
      resetTimer(nextPhase)
      return
    }
    const phase = timerPhase === "work" ? "break" : "work"
    resetTimer(phase)
  },

  // 设置工作时长(分钟)
  setWorkDuration: (minutes) => {
    set({workDuration: minutes})
    if (get().timerPhase === "work") {
      get().resetTimer()
    }
  },

  // 设置休息时长(分钟)
  setBreakDuration: (minutes) => {
    set({breakDuration: minutes})
    if (get().timerPhase === "break") {
      get().resetTimer()
    }
  },

  export: () => ({
    workDuration: get().workDuration,
    breakDuration: get().breakDuration,
  }),

  import: (data) => {
    set({
      workDuration: data.workDuration,
      breakDuration: data.breakDuration,
    })
  },
}))

// 导出类型
export type {TimerState as PomodoroTimerState}
