<script setup lang="ts">
import { useFolderPathStore } from '@/stores/folder_path';
import { DriveApi } from '@/views/drive/api';
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps<{ items?: any[] }>()
const emit = defineEmits<{
    (e: 'close'): void
}>()

const pathStore = useFolderPathStore()
const { updatePath } = pathStore

const root = ref<HTMLElement | null>(null)

const handleClickOutside = (e: MouseEvent) => {
    if (!root.value) return
    if (!root.value.contains(e.target as Node)) emit('close')
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside))

const select = async (item: any) => {
    const { data, error } = await DriveApi.getFolderById(item.id)
    const { folder, path } = data
    if (path) updatePath(path)
    emit('close')
}
</script>

<template>
    <div ref="root"
        class="absolute mt-1 bg-gray-800 top-[30px] border rounded shadow z-50 w-full max-h-60 overflow-auto">
        <ul>
            <li v-if="!items || items.length === 0" class="p-2 text-gray-500">No results</li>
            <li v-for="(it, idx) in items" :key="idx" @click="select(it)" class="p-2 hover:bg-gray-100 cursor-pointer">
                {{ it?.name ?? it?.title ?? it }}
            </li>
        </ul>
    </div>
</template>

<style scoped>
.z-50 {
    z-index: 50
}
</style>
