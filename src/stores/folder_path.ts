import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useFolderPathStore = defineStore('folderPath', () => {
  const path_history = ref<{ id: string; name: string }[]>([])
  const history_pointer = ref(-1)
  const path = ref({
    name: '',
    id: '',
  })

  const updatePath = (newPath: { id: string; name: string }) => {
    path.value.name = newPath.name
    path.value.id = newPath.id

    if (history_pointer.value < path_history.value.length - 1) {
      path_history.value = path_history.value.slice(0, history_pointer.value + 1)
    }

    const last_history = path_history.value[path_history.value.length - 1]
    if (last_history?.id !== path.value.id) {
      path_history.value.push({ id: path.value.id, name: path.value.name })
      history_pointer.value = path_history.value.length - 1
    }
  }

  const popPath = () => {
    const foldersId = path.value.id.split('/')
    foldersId.pop()
    const newId = foldersId.join('/')

    const folders = path.value.name.split('/')
    folders.pop()
    const newName = folders.join('/')

    if (newId !== '' && newName !== '') updatePath({ id: newId, name: newName })
  }

  const undoPath = () => {
    if (history_pointer.value > 0) {
      history_pointer.value--
      const prevPath = path_history.value[history_pointer.value]
      if (prevPath) {
        path.value.id = prevPath.id
        path.value.name = prevPath.name
      }
    }
  }

  const redoPath = () => {
    if (history_pointer.value < path_history.value.length - 1) {
      history_pointer.value++
      const nextPath = path_history.value[history_pointer.value]
      if (nextPath) {
        path.value.id = nextPath.id
        path.value.name = nextPath.name
      }
    }
  }

  return { path, history_pointer, path_history, updatePath, popPath, undoPath, redoPath }
})
