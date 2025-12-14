import type { FolderNode } from './Interface'

export const searchFolder = (
  folders: FolderNode[],
  pathString: string,
  key: 'id' | 'name' = 'name',
) => {
  const names = pathString.split('/').map(String)
  let currentFolder = folders
  let targetFolder

  for (let i = 0; i < names.length; i++) {
    const currentFolderName = names[i]
    const childFolder = currentFolder.find((node) => node[key] === currentFolderName)
    if (!childFolder) return console.warn(`Node dengan id ${currentFolderName} tidak ditemukan.`)
    if (i === names.length - 1) targetFolder = childFolder
    else currentFolder = childFolder.children
  }

  return targetFolder
}
