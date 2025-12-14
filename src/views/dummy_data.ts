import type { FolderNode } from '@/views/drive/Interface'

export const dummy_data: FolderNode[] = [
  {
    id: 1,
    name: 'Documents',
    expand: true,
    lastUpdate: '17 Agustus 2023',
    size: null,
    type: 'folder',
    children: [
      {
        id: 2,
        name: 'Work',
        expand: true,
        lastUpdate: '17 Agustus 2023',
        size: null,
        type: 'folder',
        children: [
          {
            id: 4,
            name: 'Project A',
            children: [
              {
                id: 7,
                name: 'specs.docx',
                type: 'doc',
                lastUpdate: '18 Agustus 2023',
                size: 1024,
                expand: false,
                children: [],
              },
              {
                id: 8,
                name: 'diagram.png',
                type: 'img',
                lastUpdate: '18 Agustus 2023',
                size: 2048,
                expand: false,
                children: [],
              },
            ],
            expand: true,
            lastUpdate: '17 Agustus 2023',
            size: null,
            type: 'folder',
          },
          {
            id: 5,
            name: 'Project B',
            children: [],
            expand: true,
            lastUpdate: '17 Agustus 2023',
            size: null,
            type: 'folder',
          },
        ],
      },
      {
        id: 3,
        name: 'Personal',
        expand: true,
        lastUpdate: '17 Agustus 2023',
        size: null,
        type: 'folder',
        children: [],
      },
    ],
  },
  {
    id: 6,
    name: 'Downloads',
    expand: true,
    lastUpdate: '17 Agustus 2023',
    size: null,
    type: 'folder',
    children: [
      {
        id: 9,
        name: 'setup.pdf',
        type: 'doc',
        lastUpdate: '19 Agustus 2023',
        size: 5000,
        expand: false,
        children: [],
      },
    ],
  },
]
