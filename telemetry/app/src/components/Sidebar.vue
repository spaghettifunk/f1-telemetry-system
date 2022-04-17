<script setup lang="ts">
import { onMounted } from "vue";
import { Session } from "../../../models/telemetry.model";
import { usePastStore } from "../store/past";

const pastStore = usePastStore();
const userID = "7f443b8f-1cad-4d00-ac25-2f1fe444d600";

onMounted(() => {
  pastStore.fetchSessions(userID);
});

const setSelectedSession = (session: Session) => {
  pastStore.fetchSessionData(userID, session.session_id);
};
</script>

<template>
  <h1>Your Sessions</h1>
  <n-space vertical>
    <n-timeline>
      <n-timeline-item
        style="cursor: pointer"
        v-for="session in pastStore.sessions"
        :key="session.session_id"
        type="info"
        v-bind:title="'Session: ' + session.session_type"
        v-bind:content="'Track: ' + session.track_name"
        v-bind:time="session.time"
        @click="setSelectedSession(session)"
      />
      <n-timeline-item content="Where it all started" />
    </n-timeline>
  </n-space>
</template>
