<script setup lang="ts">
import { onMounted } from 'vue';
import { Session } from '../models/telemetry.model';
import { useGlobalStore } from '../store/past';

const globalStore = useGlobalStore();
const userID = '7f443b8f-1cad-4d00-ac25-2f1fe444d600';

onMounted(() => {
    globalStore.fetchSessions(userID);
})

const setSelectedSession = (session: Session) => {
    // fetch all the data
    globalStore.fetchSessionData(userID, session.sessionID);
    globalStore.fetchEvents(userID, session.sessionID);
    globalStore.fetchLaps(userID, session.sessionID);
    globalStore.fetchCarTelemetries(userID, session.sessionID);
    globalStore.fetchCarStatuses(userID, session.sessionID);
    globalStore.fetchMotionsData(userID, session.sessionID);
}

</script>

<template>
    <h1>Your Sessions</h1>
    <n-space vertical>
        <n-timeline>
            <n-timeline-item
                style="cursor:pointer;"
                v-for="session in globalStore.allSessionsByUserID(userID)"
                :key="session.sessionID"
                type="info"
                v-bind:title="'Session: ' + session.sessionType"
                v-bind:content="'Track: ' + session.trackName"
                v-bind:time="session.time"
                @click="setSelectedSession(session)"
            />
            <n-timeline-item content="Where it all started" />
        </n-timeline>
    </n-space>
</template>