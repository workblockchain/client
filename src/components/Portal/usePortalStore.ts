import {create} from "zustand"

type PortalStore = {
  portals: Map<number, Set<string>>
  addPortal: (id: string, zIndex?: number) => void
  removePortal: (id: string) => void
  getPortals: () => string[]
}

export const usePortalStore = create<PortalStore>((set, get) => ({
  portals: new Map(),
  addPortal: (id, zIndex = 0) =>
    set((state) => {
      const newPortals = new Map(state.portals)

      // 添加到对应zIndex的桶
      if (!newPortals.has(zIndex)) {
        newPortals.set(zIndex, new Set())
      }
      newPortals.get(zIndex)?.add(id)

      return {
        portals: newPortals,
      }
    }),
  removePortal: (id) =>
    set((state) => {
      const newPortals = new Map(state.portals)

      // 遍历所有zIndex桶查找并删除
      for (const [zIndex, ids] of newPortals) {
        if (ids.has(id)) {
          ids.delete(id)
          // 如果桶为空则清理
          if (ids.size === 0) {
            newPortals.delete(zIndex)
          }
          break
        }
      }

      return {
        portals: newPortals,
      }
    }),

  getPortals: () => {
    const {portals} = get()
    return Array.from(portals.keys())
      .sort((a, b) => b - a)
      .flatMap((zIndex) => Array.from(portals.get(zIndex) || []))
  },
}))
