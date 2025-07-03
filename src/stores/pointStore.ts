// stores/pointStore.ts
import { defineStore } from 'pinia'

export const usePointStore = defineStore('pointStore', {
  state: () => ({
    nerveState: {
      id: "",
      type: "",
      idx: 0,
      point: [],
      viewCode: ""
    },
    nerveList: {
      // "1": [],
    } as any,
  }),
  actions: {
    setPointList(info: any, id: string) {
      this.nerveList[id] = info
    },
    updateStore(info: any) {
      this.nerveState = info
    },
  },
})