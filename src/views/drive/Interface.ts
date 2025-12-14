export interface FolderNode {
  id: string | number
  parentId: string | number
  name: string
  type: 'folder' | 'doc' | 'img'
  lastUpdate: string
  size: null | number
  expand: boolean
  children: FolderNode[]
}
