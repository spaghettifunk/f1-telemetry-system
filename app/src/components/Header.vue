<script setup lang="ts">
import { TemperatureCelsius } from '@vicons/carbon'
import { useGlobalStore } from '../store/index';

const globalStore = useGlobalStore();

</script>


<template>
  <div v-if="globalStore.selectedSession === null"></div>
  <div v-else>
    <n-page-header>
      <n-grid :cols="7">
        <n-gi>
          <n-statistic label="Session ID" v-model:value="globalStore.selectedSession.sessionID" />
        </n-gi>
        <n-gi>
          <n-statistic label="Current Lap" v-model:value="globalStore.selectedSession.sessionID" />
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
    </n-page-header>
  </div>
</template>
