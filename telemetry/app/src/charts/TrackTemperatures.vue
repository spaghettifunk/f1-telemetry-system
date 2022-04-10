<script setup lang="ts">
import { computed } from "vue";
import * as echarts from 'echarts/core';
import {
    TitleComponent,
    ToolboxComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    MarkLineComponent,
    MarkPointComponent
} from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import VChart from 'vue-echarts';

import { useGlobalStore } from '../store/past';

const globalStore = useGlobalStore();

echarts.use([
    TitleComponent,
    ToolboxComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    MarkLineComponent,
    MarkPointComponent,
    LineChart,
    CanvasRenderer,
    UniversalTransition
]);

var option = computed(() => (
    {
        title: {
            text: 'Temperatures'
        },
        legend: {},
        xAxis: {
            data: globalStore.sessionData.map(s => s.time)
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value} °C'
            }
        },
        series: [
            {
                name: 'Air',
                type: 'line',
                data: globalStore.sessionData.map(s => s.airTemperature),
                markPoint: {
                    data: [
                        { type: 'max', name: 'Max' },
                        { type: 'min', name: 'Min' }
                    ]
                }
            },
            {
                name: 'Track',
                type: 'line',
                data: globalStore.sessionData.map(s => s.trackTemperature),
                markPoint: {
                    data: [
                        { type: 'max', name: 'Max' },
                        { type: 'min', name: 'Min' }
                    ]
                }
            }
        ]
    })
);
</script>

<template>
    <v-chart class="chart" :option="option" />
</template>

<style>
</style>