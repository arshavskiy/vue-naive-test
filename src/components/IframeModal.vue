<template>
  <n-button @click="showModal = true">Open Modal</n-button>
  <n-modal
    v-model:show="showModal"
    title="Iframe Loader with Spinner"
    style="width: 80%; height: 70%"
    :closable="true"
    :mask-closable="false"
    size="large"
  >
    <n-spin :show="isLoading">
      <iframe
        :src="props.src"
        style="width: 100%; height: 100%"
        @load="isLoading = false"
      ></iframe>
    </n-spin>
  </n-modal>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const props = defineProps({
  src: {
    type: String,
    default: '',
  },
})

const showModal = ref(true)
const isLoading = ref(true)

onMounted(() => {
  console.log(props)
})
</script>
