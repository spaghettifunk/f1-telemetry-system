<script setup lang="ts">
import { usePastStore } from '../store/past';

const pastStore = usePastStore();
</script>

<template>
  <div v-if="pastStore.sessionData === null"></div>
  <div v-else>
    <n-page-header>
      <n-grid :cols="5">
        <n-gi>
          <n-statistic label="Session ID" v-model:value="pastStore.sessionData.session_id" />
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
        <a style="text-decoration: none; color: inherit">{{ pastStore.sessionData.session_type }}</a>
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