<script setup lang="ts">
import { watch } from 'vue';
import Header from './_local_component/layout/Header.vue';
import Panel from './_local_component/layout/Panel.vue';
import { useRoute } from 'vue-router';
import { useDataStore } from '@/stores/data';
import { DriveApi } from './api';

const dataStore = useDataStore()
const { setData } = dataStore

const route = useRoute()

const fetchData = async () => {
  const { data, error } = await DriveApi.getAllData()
  if (!error) setData(data)
  else console.error("Error fetch data", error)
}

watch(() => route.params.id, fetchData, { immediate: true })

</script>

<template>
  <main>
    <div class="flex flex-col h-screen w-screen p-1">
      <Header></Header>
      <Panel></Panel>
    </div>
  </main>
</template>
