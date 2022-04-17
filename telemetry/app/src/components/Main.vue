<script setup lang="ts">
import { ArrowLeft } from '@vicons/carbon'
import { usePastStore } from '../store/past';

import Engine from '../charts/Engine.vue';
import TrackTemperatures from '../charts/TrackTemperatures.vue'
import ThrottleBrake from '../charts/ThrottleBrake.vue';
import Participants from '../charts/Participants.vue';

const pastStore = usePastStore();

</script>

<template>
    <div v-if="pastStore.sessionData === null">
        <n-empty description="Select a session from the Sidebar">
            <template #icon>
                <n-icon>
                    <ArrowLeft />
                </n-icon>
            </template>
            <template #extra>
                <n-button size="small">Or choose a random one</n-button>
            </template>
        </n-empty>
    </div>
    <div v-else class="main">
        <Participants />   </div>
</template>

<style>
.main {
    height: 100vh;
    margin-top: 65px;
    margin-bottom: 600px;
}

.chart {
    height: 400px;
    margin-bottom: 50px;
}
</style>