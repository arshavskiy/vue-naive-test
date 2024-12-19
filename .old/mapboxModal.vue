<template>
  <n-modal
    v-model:show="showModal"
    title="Naive UI Modal Example"
    :closable="true"
    :mask-closable="false"
    size="small"
  >
    <div id="map">
      <p>
        This is a simple modal example using Naive UI with the
      </p>
    </div>

    <n-button @click="showModal = false">Close</n-button>
  </n-modal>
</template>


<script setup>
import { onMounted, ref } from 'vue'
import { NModal, NButton, NSpin, useMessage } from 'naive-ui'

import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

let map;

const props = defineProps({
  data: {
    type: Object
  },
})




const showModal = ref(true)
const isLoading = ref(true)

onMounted(() => {
  console.log([props.data.capitalInfo.latlng[1], props.data.capitalInfo.latlng[0]])

  // mapboxgl.accessToken = 'pk.eyJ1IjoiYXJzaGF2c2t5IiwiYSI6ImNtNDRwcTBnMDBtcmQybHF4bmQ4ZmU5aGkifQ.IRUrgbtq7fiPTwO40MqgTQ';
  // map = new mapboxgl.Map({
  //   container: 'map', // container ID
  //   style: 'mapbox://styles/mapbox/streets-v12', // style URL
  //   center: [props.data.capitalInfo.latlng[1], props.data.capitalInfo.latlng[0]], // starting position [lng, lat]
  //   zoom: 9, // starting zoom
  // });


  isLoading.value = false
})
</script>
