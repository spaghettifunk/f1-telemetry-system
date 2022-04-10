<script setup lang="ts">
import { computed } from "vue";

import * as echarts from 'echarts/core';
import { GridComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import VChart from 'vue-echarts'

import { useGlobalStore } from '../store/past';

const globalStore = useGlobalStore();

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
            data: globalStore.carTelemetries.map(t => t.time),
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
                data: globalStore.carTelemetries.map(t => t.engineRPM)
            },
            {
                name: 'Speed',
                type: 'line',
                yAxisIndex: 1,
                data: globalStore.carTelemetries.map(t => t.speed)
            }
        ]
    })
);

/*

{
                type: 'value',
                name: 'temperature',
                min: 70,
                max: 120,
                axisLabel: {
                    formatter: '{value} °C'
                }
            },


            {
                name: 'Temperature',
                type: 'line',
                yAxisIndex: 1,
                data: globalStore.carTelemetries.map(t => t.engineTemperature)
            },

*/

</script>

<template>
    <v-chart class="chart" :option="option" />
</template>

<style>

</style>