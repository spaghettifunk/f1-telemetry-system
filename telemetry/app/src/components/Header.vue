<script setup lang="ts">
import { useGlobalStore } from '../store/past';

const globalStore = useGlobalStore();
</script>

<template>
  <div v-if="globalStore.sessionData.length === 0"></div>
  <div v-else>
    <n-page-header>
      <n-grid :cols="5">
        <n-gi>
          <n-statistic label="Session ID" v-model:value="globalStore.sessionData[0].sessionID" />
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
      </n-grid>
      <template #title>
        <a
          style="text-decoration: none; color: inherit"
        >{{ globalStore.sessionData[0].sessionType }}</a>
      </template>
      <template #header></template>
      <template #avatar>
        <n-avatar src="./f1.png" />
      </template>
    </n-page-header>
  </div>
</template>

<style>
</style>