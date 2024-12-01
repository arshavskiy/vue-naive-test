<template>
  <div class="app-container flex">
    <nav>
      <n-menu :options="menuOptions" :default-value="ROUTES.countries.key"/>
    </nav>
    <main class="w-max h-100vh bg-#f2f2f3">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import { NMenu } from 'naive-ui'
import {
  HomeOutline as HomeIcon,
  WineOutline as WineIcon,
  SearchOutline as SearchIcon,
  MapOutline as MapIcon,
  BriefcaseOutline as BriefIcon,
  MenuOutline as MenuIcon,
} from '@vicons/ionicons5'

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

import { NIcon, useMessage } from 'naive-ui'
import { defineComponent, h } from 'vue'
import { RouterLink } from 'vue-router'

import { ROUTES } from '@/utils/consts.js'

const menuOptions = [
  {
    key: 'menu',
    icon: renderIcon(MenuIcon),
  },
  {
    label: () =>
      h(RouterLink, {
        to: {
          name: 'home',
        },
      }),
    key: 'go-back-home',
    icon: renderIcon(HomeIcon),
  },
  {
    label: () =>
      h(RouterLink, {
        to: {
          name: ROUTES.map.name,
        },
      }),
    key: 'go-map',
    icon: renderIcon(MapIcon),
  },
  {
    label: () =>
      h(RouterLink, {
        to: {
          name: ROUTES.travel.name,
        },
      }),
    key: 'go-travel',
    icon: renderIcon(BriefIcon),
  },

  {
    label: () =>
      h(RouterLink, {
        to: {
          name: ROUTES.wine.name,
        },
      }),
    key: ROUTES.wine.key,
    icon: renderIcon(WineIcon),
  },
  {
    label: () =>
      h(RouterLink, {
        to: {
          name: ROUTES.countries.name,
        },
      }),
    key: ROUTES.countries.key,
    icon: renderIcon(SearchIcon),
  },
]
</script>
