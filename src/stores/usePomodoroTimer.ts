// Copyright (c) 2025-present WorkBlockChain Team.
//
// WorkBlockChain Client is licensed under Mulan PubL v2.
// You can use this software according to
// the terms and conditions of the Mulan PubL v2.
// You may obtain a copy of Mulan PubL v2 at:
//
//   http://license.coscl.org.cn/MulanPubL-2.0
//
// THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS,
// WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED,
// INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT,
// MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
// See the Mulan PubL v2 for more details.
//
// === Auto generated, DO NOT EDIT ABOVE ===

import {MINUTE} from "@/constants"
import {create} from "zustand"
import {useConfig} from "./useConfig"

export type TimerPhaseType = "break" | "work"

interface TimerState {
  // 计时器状态
  status: "idle" | "running" | "paused"
  remainingTime: number // 剩余时间(秒)
  intervalId?: NodeJS.Timeout // 定时器引用
  timerPhase: TimerPhaseType // 当前阶段状态

  // 方法
  startTimer: () => void
  pauseTimer: () => void
  resetTimer: (phase?: TimerPhaseType) => void
  tick: () => void
  timePassed: () => number
  togglePhase: (nextPhase?: TimerPhaseType) => void
  onConfigChange: () => void
}

export const usePomodoroTimer = create<TimerState>((set, get) => ({
  // 初始状态
  status: "idle",
  remainingTime: 25 * MINUTE,
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
        remainingTime = useConfig.getState().workDuration * MINUTE
        break
      case "break":
        remainingTime = useConfig.getState().breakDuration * MINUTE
        break
    }
    set({
      timerPhase,
      status: "idle",
      remainingTime,
    })
  },

  onConfigChange: () => {
    const {status, resetTimer} = get()

    // [UX] 如果当前未处于工作状态，则立即重置计时器
    if (status === "idle") {
      resetTimer()
    }
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
    const {remainingTime, timerPhase} = get()
    const {workDuration, breakDuration} = useConfig.getState()
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
}))

// 导出类型
export type {TimerState as PomodoroTimerState}
