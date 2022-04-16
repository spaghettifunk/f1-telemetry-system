<script setup lang="ts">
import { computed } from "vue";

import * as echarts from 'echarts/core';
import { GridComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import VChart from 'vue-echarts'

import { usePastStore } from '../store/past';

const pastStore = usePastStore();

echarts.use([
    GridComponent,
    LineChart,
    CanvasRenderer,
    UniversalTransition
]);

var option = computed(() => (
    {
        title: {
            text: 'Engine'
        },
        legend: {
            data: ['RPM', 'Speed']
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            }
        },
        xAxis: {
            data: pastStore.carTelemetries.map(t => t.time),
            type: 'category',
            axisPointer: {
                type: 'shadow'
            }
        },
        dataZoom: [
            {
                show: true,
                realtime: true,
                start: 30,
                end: 70,
                xAxisIndex: [0, 1]
            },
            {
                type: 'inside',
                realtime: true,
                start: 30,
                end: 70,
                xAxisIndex: [0, 1]
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: 'RPM',
                min: 0,
                max: 17000,
                axisLabel: {
                    formatter: '{value} rpm'
                }
            },
            {
                type: 'value',
                name: 'Speed',
                min: 0,
                max: 350,
                axisLabel: {
                    formatter: '{value} Km/h'
                }
            }
        ],
        series: [
            {
                name: 'RPM',
                type: 'line',
                data: pastStore.carTelemetries.map(t => t.engine_rpm)
            },
            {
                name: 'Speed',
                type: 'line',
                yAxisIndex: 1,
                data: pastStore.carTelemetries.map(t => t.speed)
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