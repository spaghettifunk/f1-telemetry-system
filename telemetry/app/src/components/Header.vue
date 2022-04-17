<script setup lang="ts">
import { onBeforeUpdate, ref } from "vue";
import { usePastStore } from "../store/past";

const pastStore = usePastStore();
const dataRef = ref({} as any);

onBeforeUpdate(() => {
  pastStore
    .fetchSessionData(pastStore.currentUserID, pastStore.currentSessionID)
    .then(() => {
      if (pastStore.getSessionData != null) {
        let sessData = pastStore.getSessionData;
        dataRef.value = {
          sessionID: pastStore.currentSessionID,
          trackName: sessData.track_name,
          type: sessData.session_type,
        };
      }
    });
});
</script>

<template>
  <div v-if="pastStore.getSessionData === null"></div>
  <div v-else>
    <n-page-header>
      <n-grid :cols="2">
        <n-gi>
          <n-statistic label="Session ID" v-model:value="dataRef.sessionID" />
        </n-gi>
        <n-gi>
          <n-statistic label="Grand Prix" v-model:value="dataRef.trackName" />
        </n-gi>
      </n-grid>
      <template #title>
        <a style="text-decoration: none; color: inherit">{{ dataRef.type }}</a>
      </template>
      <template #header></template>
      <template #avatar>
        <n-avatar src="./f1.png" />
      </template>
    </n-page-header>
  </div>
</template>

<style></style>
