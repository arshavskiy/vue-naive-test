<template>
  <n-space vertical className="countries-container">
    <n-card size="medium" :bordered="false">
      <n-card title="Countries" size="medium"></n-card>
      <n-checkbox-group v-model:value="cities">
        <n-data-table
          :columns="columns"
          :data="filteredData"
          :pagination="pagination"
          :size="'large'"
        />
      </n-checkbox-group>
    </n-card>
  </n-space>
</template>

<script setup>
import { onMounted, h, ref, computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useCountriesStore } from '@/store/contryStore.js'

const countriesStore = useCountriesStore()

const { countries, loading, error } = storeToRefs(countriesStore)
import {
  NDataTable,
  NTag,
  NCard,
  NSpace,
  NAvatar,
  NInput,
  NIcon,
  NTooltip,
  NCheckbox,
  NCheckboxGroup,
  NConfigProvider
} from 'naive-ui'
import {
  SearchOutline as SearchIcon,
  EllipsisHorizontalOutline as EllipsisIcon,
  StarOutline as StarIcon,
} from '@vicons/ionicons5'

import starSvg from '@/assets/images/star-outline.svg'

const pagination = {
  pageSize: 20,
  simple: true,
}

const cities = ref([]);

const columns = [
  {
    title: 'Common name',
    render(row) {
      return h('div', { class: 'flex items-center table_select' }, [
        h(NCheckbox, {
          width: 20,
          value: row.name.common,
          style: { marginRight: '8px' },
        }),
        h(NAvatar, {
          width: 50,
          src: row.flags.svg,
          size: 'small',
          style: { marginRight: '8px' },
        }),
        row.name.common,
      ])
    },
    sortable: true,
    sorter: (a, b) => a.name.common.localeCompare(b.name.common), // Sort by user.name
  },
  {
    title: 'Official name',
    key: 'name.official',
    sortable: true,
    sorter: (a, b) => a.name.official.localeCompare(b.name.official), // Sort by user.name
  },
  {
    title: 'Capital',
    key: 'capital',
    sortable: true,
    sorter: (a, b) => {
      if (!a.capital.length || !b.capital.length) return
      try {
        return a.capital[0].localeCompare(b.capital[0])
      } catch (e) {
        return a.capital
      }
    },
  },
  {
    title: 'Region',
    key: 'region',
    sortable: true,
    sorter: (a, b) => a.region.localeCompare(b.region), // Sort by user.name
  },
  {
    title: 'Population',
    key: 'population',
    render(row) {
      return h(
        NTag,
        {
          type: 'info',
          size: 'small',
        },
        { default: () => row.population.toLocaleString() },
      )
    },
    sorter(rowA, rowB) {
      return rowA.population - rowB.population
    },
  },
  {
    title: 'Official languages',
    key: 'languages',
    sortable: true,
    render(row) {
      return Object.values(row.languages).join(', ')
    },
    ellipsis: true,
  },
  {
    title: 'Time zone',
    key: 'timezones',
    sorter(rowA, rowB) {
      return rowA.timezones[0] - rowB.timezones[0]
    },
    render(row) {
      return h('div', { class: 'flex' }, [
        h(
          NTooltip,
          { trigger: 'hover' },
          {
            trigger: () => Object.values(row.timezones)[0], // Text visible in the table
            default: () => Object.values(row.timezones), // Tooltip content
          },
        ),
        h(
          NTooltip,
          { trigger: 'hover' },
          {
            trigger: () =>
              h(EllipsisIcon, {
                trigger: 'hover',
                width: 20,
                size: 'small',
                style: { cursor: 'pointer', position: 'absolute', right: '20px' },
                onClick: () => {
                  window.open(row.maps.googleMaps, '_blank')
                },
              }),
            default: () => 'View On Map',
          },
        ),
      ])
    },
    ellipsis: true,
  },
]

columns.forEach((item) => {
  item.width = 200
  item.minWidth = 100
  item.fixed = 'left'
  if (
    ['region', 'capital', 'population', 'name'].includes(item.key) ||
    item.title === 'Common name'
  ) {
    item.width = 150
  } else if (item.key === 'timezones') {
    item.fixed = 'center'
    item.width = 150
  }
})

// Props
const props = defineProps({
  searchQuery: {
    type: String,
    default: '',
  },
})

const filteredData = computed(() => {
  const lowerCaseSearch = props.searchQuery.toLowerCase()
  if (!lowerCaseSearch) return countries.value
  return countries.value.filter((row) => row.name.common.toLowerCase().includes(lowerCaseSearch))
})

onMounted(async () => {
  await countriesStore.fetchCountries();
})


watch(cities, (newVal)=>{
  countriesStore.saveToLocalStorage(newVal)
})

</script>

<style lang="scss"></style>
