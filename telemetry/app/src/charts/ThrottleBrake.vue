<script setup lang="ts">
import { computed, DebuggerEvent } from "vue";

import * as echarts from 'echarts/core';
import { GridComponent, DataZoomComponent } from 'echarts/components';
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
    UniversalTransition,
    DataZoomComponent
]);

var option = computed(() => (
    {
        title: {
            text: 'Throttle vs Brake vs Speed'
        },
        legend: {
            data: ['Throttle', 'Speed', 'Brake']
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
        dataZoom: [
            {
                show: true,
                realtime: true,
                start: 30,
                end: 70,
                // height: 70,
                xAxisIndex: [0, 1]
            },
            {
                type: 'inside',
                realtime: true,
                // height: 70,
                start: 30,
                end: 70,
                xAxisIndex: [0, 1]
            }
        ],
        xAxis: {
            data: pastStore.carTelemetries.map(t => t.time),
            type: 'category',
            axisPointer: {
                type: 'shadow'
            }
        },
        yAxis: [
            {
                type: 'value',
                name: 'Throttle',
                min: 0,
                max: 1,
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
                name: 'Throttle',
                type: 'line',
                data: pastStore.carTelemetries.map(t => t.throttle_applied)
            },
            {
                name: 'Speed',
                type: 'line',
                yAxisIndex: 1,
                data: pastStore.carTelemetries.map(t => t.speed),
                tooltip: {
                    valueFormatter: function (value: any) {
                        return value + ' Km/h';
                    }
                },
            },
            {
                name: 'Brake',
                type: 'line',
                data: pastStore.carTelemetries.map(t => t.brake_applied)
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