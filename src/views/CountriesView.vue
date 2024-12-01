<template>
  <TopBar @search="updateSearchQuery" />
  <CountryTable :searchQuery="searchQuery" />
</template>

<script setup>
import { ref } from 'vue'
import TopBar from '@/components/TopBar.vue'
import CountryTable from '../components/CountryTable.vue'

const searchQuery = ref('')

const updateSearchQuery = (query) => {
  searchQuery.value = query
}
</script>
