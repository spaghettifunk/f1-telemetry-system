<script setup lang="ts">
import { LineChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";

import { ref, computed } from "vue";

import { useGlobalStore } from '../store/index';

const globalStore = useGlobalStore();
Chart.register(...registerables);

const options = ref({
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Temperatures',
    },
  },
});

const temperaturesData = computed(() => ({
  labels: globalStore.sessionData.map(s => s.time),
  datasets: [
    {
      label: 'Air Temperature',
      data: globalStore.sessionData.map(s => s.airTemperature) as [],
      borderColor: '#0079AF',
      hidden: true
    },
    {
      label: 'Track Temperature',
      data: globalStore.sessionData.map(s => s.trackTemperature) as [],
      borderColor: '#77CEFF',
      fill: '-1'
    },
  ],
}));

</script>


<template>
  <div v-if="globalStore.sessionData.length === 0"></div>
  <div v-else>
    <!-- <n-page-header>
      <n-grid :cols="7">
        <n-gi>
          <n-statistic label="Session ID" v-model:value="globalStore.selectedSession.sessionID" />
        </n-gi>
        <n-gi>
          <n-statistic label="Current Lap" value="1" />
        </n-gi>
        <n-gi>
          <n-statistic label="Position" value="1" />
        </n-gi>
        <n-gi>
          <n-statistic label="Fastest Lap" value="1:26:236" />
        </n-gi>
        <n-gi>
          <n-statistic label="Weather" value="Sunny" />
        </n-gi>
        <n-gi>
          <n-statistic
            label="Air Temperature"
            v-model:value="globalStore.selectedSession.airTemperature"
          >
            <template #suffix>
              <n-icon>
                <TemperatureCelsius />
              </n-icon>
            </template>
          </n-statistic>
        </n-gi>
        <n-gi>
          <n-statistic
            label="Track Temperature"
            v-model:value="globalStore.selectedSession.trackTemperature"
          >
            <template #suffix>
              <n-icon>
                <TemperatureCelsius />
              </n-icon>
            </template>
          </n-statistic>
        </n-gi>
      </n-grid>
      <template #title>
        <a
          style="text-decoration: none; color: inherit"
        >{{ globalStore.selectedSession.sessionType }}</a>
      </template>
      <template #header></template>
      <template #avatar>
        <n-avatar src="./f1.png" />
      </template>
      <template #extra>
        <n-space>
          <n-button>Refresh</n-button>
        </n-space>
      </template>
    </n-page-header>-->

    <LineChart ref="temperaturesRef" :chartData="temperaturesData" :options="options" />
  </div>
</template>
