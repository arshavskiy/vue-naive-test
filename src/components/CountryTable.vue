<template>
  <n-space vertical className="countries-container">
    <n-card size="medium" :bordered="false">
      <n-card title="Countries" size="medium"></n-card>
      <n-checkbox-group v-model:value="cities">
        <n-config-provider>
          <n-data-table
            :columns="columns"
            :data="filteredData"
            :pagination="pagination"
            :size="'large'"
          />
        </n-config-provider>
      </n-checkbox-group>
    </n-card>

    <div id="map_container" class="h-100px h-300px ml-6 mr-6"></div>
  </n-space>
</template>

<script setup>
import { onMounted, h, ref, computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useCountriesStore } from '@/store/contryStore.js'
import { APP_CONFIGS } from '@/utils/consts.js'

import { mapbox } from '../utils/mapbox.js'

const countriesStore = useCountriesStore()

const { countries, loading, error, counryData } = storeToRefs(countriesStore)
import {
  NDataTable,
  NTag,
  NCard,
  NSpace,
  NAvatar,
  NTooltip,
  NCheckbox,
  NCheckboxGroup,
  NConfigProvider,
} from 'naive-ui'
import { EllipsisHorizontalOutline as EllipsisIcon } from '@vicons/ionicons5'

const pagination = {
  pageSize: APP_CONFIGS.COUNTRIES_VIEW.pageSize,
  simple: APP_CONFIGS.COUNTRIES_VIEW.simple,
}

const cities = ref([])
const showIframe = ref(false)
const showModal = ref(false)

const openMap = (row) => {
  countriesStore.setGoogleUrl(row)
  showIframe.value = true
  showModal.value = true

  if (row.capitalInfo.latlng[0]) {
    mapbox.init({ center: row.capitalInfo.latlng })
  }
}

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
          width: 20,
          src: row.flags.svg,
          size: 'medium',
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
    ellipsis: true,
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
        console.error(e)
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
                  return openMap(row)
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
  if (['region', 'capital', 'name'].includes(item.key) || item.title === 'Common name') {
    item.width = 180
  } else if (['population', 'timezones'].includes(item.key)) {
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
  await countriesStore.fetchCountries()
})

watch(cities, (newVal) => {
  countriesStore.saveToLocalStorage(newVal)
})
</script>

<style lang="scss"></style>
