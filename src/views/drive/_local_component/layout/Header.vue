<script setup lang="ts">
import Button from '@/components/Button.vue';
import { ArrowLeft, ArrowRight, ArrowUp, Search } from 'lucide-vue-next';
import { useFolderPathStore } from '@/stores/folder_path';
import { storeToRefs } from 'pinia';
import { DriveApi } from '../../api';
import { useDataStore } from '@/stores/data';
import { ref } from 'vue';

const folderPathStore = useFolderPathStore()
const dataStore = useDataStore()
const { setData } = dataStore
const { popPath, undoPath, redoPath, updatePath } = folderPathStore
const { path } = storeToRefs(folderPathStore)

const searchText = ref('')
const performSearch = async () => {
    const name = searchText.value
    if (!name) return
    const { data, error } = await DriveApi.getDataByName(name)
    console.log("res", data, error)
    if (!error) {
        setData(data.folders)
        updatePath(data.path)
    }
    else console.error("Error fetch data", error)
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
            <div class=" border rounded-md flex flex-row items-center justify-center px-2 w-full">
                <input @keyup.enter="performSearch" v-model="searchText" class=" w-full focus:outline-0" type="text"
                    placeholder="Search..." />
                <Search />
            </div>
        </div>
    </div>
</template>