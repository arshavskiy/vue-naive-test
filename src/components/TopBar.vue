<template>
  <n-space vertical className="topBar-container">
    <div class="bg-gray-100 p-6 flex justify-between items-center text-#000">
      <n-input
        style="width: 300px; border-radius: 5px"
        type="text"
        v-model:value="searchQuery"
        placeholder="Search"
        clearable
        @input="emitSearch"
      >
        <template #prefix>
          <n-icon :component="SearchIcon" />
        </template>
      </n-input>

      <div class="text-2em flex justify-between w-350px items-center">
        <n-icon :component="MoonIcon" />
        <span class="flex">
          <n-icon :component="PersonIcon" />
          <n-el className="text-4 ml-4">{{ usersStore.getUser }}</n-el>
        </span>

        <span class="flex notification relative">
          <n-icon :component="NotificationsIcon" />
          <span class="notification__number">{{ notifications }}</span>
        </span>

        <span class="flex items-center">
          <n-divider vertical />
          <n-button color="#2C2E30" @click="">Create new</n-button>
        </span>
      </div>
    </div>
  </n-space>
</template>

<script setup lang="ts">
import { watch, ref, onBeforeMount, computed } from 'vue'
import {
  SearchOutline as SearchIcon,
  MoonOutline as MoonIcon,
  PersonCircleOutline as PersonIcon,
  NotificationsOutline as NotificationsIcon,
} from '@vicons/ionicons5'
import { NIcon, NInput, NSpace, NButton, NDivider, NEl } from 'naive-ui'

import { useUsersStore } from '../stores/usersStore.js'
import { storeToRefs } from 'pinia'
const usersStore = useUsersStore()

const { user } = storeToRefs(usersStore)

const notifications = computed(() => {
  return user.notifications > 15 ? user.notifications : '15+'
})

const emit = defineEmits(['search'])
const searchQuery = ref('')

const emitSearch = () => {
  emit('search', searchQuery.value)
}

onBeforeMount(() => {
  usersStore.fetchUserData()
})

watch(searchQuery, emitSearch)
</script>
