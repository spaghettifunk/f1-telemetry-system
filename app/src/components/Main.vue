<script setup lang="ts">
import { ArrowLeft } from '@vicons/carbon'
import { useGlobalStore } from '../store/index';

const globalStore = useGlobalStore();

</script>

<template>
    <div v-if="globalStore.selectedSession === null">
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
    <div v-else>
        <!-- render all the graphs -->
    </div>
</template>

<style>
</style>