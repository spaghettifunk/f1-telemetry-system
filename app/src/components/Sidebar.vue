<script setup lang="ts">
import { Session } from '../models/telemetry.model';
import { useGlobalStore } from '../store/index';

const globalStore = useGlobalStore();

const setSelectedSession = (session: Session) => {
    globalStore.selectedSession = session;

    // fetch all the data
    globalStore.fetchEvents(session.sessionID);
    globalStore.fetchLaps(session.sessionID);
    globalStore.fetchCarTelemetries(session.sessionID);
    globalStore.fetchCarStatuses(session.sessionID);
    globalStore.fetchMotionsData(session.sessionID);
}

</script>

<template>
    <h1>Your Sessions</h1>
    <n-space vertical>
        <n-timeline>
            <n-timeline-item
                style="cursor:pointer;"
                v-for="session in globalStore.allSessionsByUserID('7f443b8f-1cad-4d00-ac25-2f1fe444d600')"
                :key="session.sessionID"
                type="info"
                v-bind:title="'Session: ' + session.sessionType"
                v-bind:content="'Track: ' + session.trackName"
                v-bind:time="session.time"
                @click="setSelectedSession(session)"
            />
        </n-timeline>
    </n-space>
</template>