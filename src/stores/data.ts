import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { FolderNode } from '@/views/drive/Interface'

export const useDataStore = defineStore('data', () => {
  const data = ref<FolderNode[]>([])
  const setData = (newData: FolderNode[]) => {
    data.value = newData
  }

  return { data, setData }
})
