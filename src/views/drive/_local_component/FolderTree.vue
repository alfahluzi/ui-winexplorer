<script setup lang="ts">
import Button from '@/components/Button.vue';
import type { FolderNode } from '../Interface';

const props = defineProps<{
    parentPath?: {
        name: string;
        id: string;
    },
    folders: FolderNode[],
    updateExpandedFolder: (path: string) => void
    selectFolder: (pathname: string, pathid: string) => void
}>()

const emit = defineEmits(['select']);

const select = (folder: FolderNode) => {
    if (folder.type !== "folder") return
    const currentPathId = props.parentPath?.id ? `${props.parentPath?.id}/${folder.id}` : `${folder.id}`;
    const currentPathName = props.parentPath?.name ? `${props.parentPath?.name}/${folder.name}` : `${folder.name}`;
    props.selectFolder(currentPathName, currentPathId)
};

const updateExpanded = (folder: FolderNode) => {
    const currentPathName = props.parentPath?.name ? `${props.parentPath?.name}/${folder.name}` : `${folder.name}`;
    props.updateExpandedFolder(currentPathName)
}

</script>

<template>
    <div class="w-full text-start" v-for="folder in folders" :key="folder.name">
        <div class="w-full flex items-center">
            <Button v-if="folder.children.length" class="cursor-pointer p-1 border-0 "
                @click.stop="updateExpanded(folder)" style="min-width: 24px;">
                {{ folder.expand ? '▼' : '▶' }}
            </Button>
            <Button class="text-start grow p-1 border-0" @click="select(folder)">
                {{ folder.name }}
            </Button>
        </div>
        <div v-if="folder.children.length && folder.expand" class="pl-4 border-l ml-2">
            <FolderTree :parent-path="props.parentPath ? {
                name: `${props.parentPath.name}/${folder.name}`,
                id: `${props.parentPath.id}/${folder.id}`
            } : {
                name: `${folder.name}`,
                id: `${folder.id}`
            }" :folders="folder.children" @select="(f) => emit('select', f)"
                :update-expanded-folder="props.updateExpandedFolder" :select-folder="props.selectFolder" />
        </div>
    </div>
</template>