<script setup lang="ts">
import Button from '@/components/Button.vue';
import { ArrowLeft, ArrowRight, ArrowUp, Search } from 'lucide-vue-next';
import { useFolderPathStore } from '@/stores/folder_path';
import { storeToRefs } from 'pinia';
import { useDataStore } from '@/stores/data';
import { ref } from 'vue';
import { DriveApi } from '@/views/drive/api';
import Dropdown from '../Dropdown.vue';

const folderPathStore = useFolderPathStore()
const dataStore = useDataStore()
const { setData } = dataStore
const { popPath, undoPath, redoPath, updatePath } = folderPathStore
const { path } = storeToRefs(folderPathStore)

const searchText = ref('')
const showDropdown = ref(false)
const searchResults = ref<any[]>([])

const performSearch = async () => {
    const name = searchText.value
    if (!name) return
    const { data, error } = await DriveApi.searchByName(name)
    if (!error) {
        searchResults.value = data.data ?? []
        showDropdown.value = true
    }
    else console.error("Error fetch data", error)
}

const onSelect = (item: any) => {
    if (item) {
        setData([item])
        try { updatePath(item.path ?? item) } catch (e) { /* best-effort */ }
    }
    showDropdown.value = false
}
</script>

<template>
    <div class="h-10 grid grid-cols-8 ">
        <div class="col-span-1 border flex flex-row items-center justify-center gap-3">
            <Button :onclick="undoPath" class="border-0 p-1 rounded-md">
                <ArrowLeft />
            </Button>
            <Button :onclick="redoPath" class="border-0 p-1 rounded-md">
                <ArrowRight />
            </Button>
            <Button :onclick="popPath" class="border-0 p-1 rounded-md">
                <ArrowUp />
            </Button>
        </div>
        <div class=" col-span-5 border flex flex-row items-center justify-center px-2">
            <input disabled class="border rounded-md w-full px-2" type="text" :value="path?.name ?? ''" />
        </div>
        <div class=" col-span-2 border flex flex-row items-center justify-center px-2">
            <div class=" border rounded-md flex flex-row items-center justify-center px-2 w-full relative">
                <input @keyup.enter="performSearch" v-model="searchText" class=" w-full focus:outline-0" type="text"
                    placeholder="Search..." />
                <Search />
                <Dropdown v-if="showDropdown" :items="searchResults" @select="onSelect" @close="showDropdown = false" />
            </div>
        </div>
    </div>
</template>