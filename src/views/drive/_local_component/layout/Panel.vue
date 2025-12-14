<script setup lang="ts">
import Button from '@/components/Button.vue';
import FolderTree from '../FolderTree.vue';

import { ref, watch } from 'vue';
import { FileImage, FileText, Folder } from 'lucide-vue-next';
import { useFolderPathStore } from '@/stores/folder_path';
import { storeToRefs } from 'pinia';
import { useDataStore } from '@/stores/data';

import type { FolderNode } from '../../Interface';
import { searchFolder } from '../../utils';

const dataStore = useDataStore()
const { data } = storeToRefs(dataStore)

const pathStore = useFolderPathStore()
const { path } = storeToRefs(pathStore)

const openedFolder = ref<FolderNode | null>(null);
const folders = ref<FolderNode[]>([])

const updateExpandByPath = (pathString: string) => {
    let targetFolder = searchFolder(folders.value, pathString, "name")
    if (targetFolder) targetFolder.expand = !targetFolder.expand;
}

const selectFolder = (pathname: string, pathid: string) => {
    let targetFolder = searchFolder(folders.value, pathname, "name")
    if (targetFolder) {
        openedFolder.value = targetFolder
        pathStore.updatePath({ name: pathname, id: pathid })
    };
}

const onClickFile = (file: any) => {
    if (file.type === 'folder') pathStore.updatePath({ name: `${path.value.name}/${file.name}`, id: `${path.value.id}/${file.id}` })
}

watch(data, (new_val) => {
    if (new_val && new_val.length !== 0) folders.value = new_val;
}, { deep: true })

watch(path, (newValue) => selectFolder(newValue.name, newValue.id), { deep: true })

</script>

<template>
    <div class="h-full grid grid-cols-12">
        <div class=" col-span-2 border p-2 flex flex-col items-start justify-start text-start gap-2">
            <p>Directory</p>
            <FolderTree :folders="folders" :update-expanded-folder="updateExpandByPath" :select-folder="selectFolder" />
        </div>
        <div class=" col-span-10 border p-2 flex flex-col items-start justify-start gap-2">
            <div class="w-full grid grid-cols-12 divide-y-2">
                <Button class=" px-2 col-span-6 rounded-none text-start border-0 border-r">Name</Button>
                <Button class=" px-2 col-span-2 rounded-none text-start border-0 border-r">Date Modified</Button>
                <Button class=" px-2 col-span-2 rounded-none text-start border-0 border-r">Type</Button>
                <Button class=" px-2 col-span-2 rounded-none text-start border-0 border-r">Size</Button>
            </div>
            <Button v-if="openedFolder" v-for="file in openedFolder.children" :key="file.name"
                :ondblclick="() => onClickFile(file)" class="w-full grid grid-cols-12 gap-2 text-start border-0">
                <div class="px-2 col-span-6 flex flex-row items-center">
                    <Folder v-if="file.type === 'folder'" />
                    <FileImage v-else-if="file.type === 'img'" />
                    <FileText v-else />
                    <p class="pl-2">{{ file.name }}</p>
                </div>
                <div class=" px-2 col-span-2">{{ file.lastUpdate }}</div>
                <div class=" px-2 col-span-2">{{ file.type }}</div>
                <div class=" px-2 col-span-2">{{ file.size }}</div>
            </Button>
        </div>
    </div>
</template>