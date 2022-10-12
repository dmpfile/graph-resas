<script setup lang="ts">
  import { ref, onMounted, watch } from 'vue'
  import { Line } from 'vue-chartjs'
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale,
  } from 'chart.js'

  import type { GraphData } from 'Resas'

  interface Props {
    data?: GraphData[]
  }

  interface ChartData {
    labels: number[]
    datasets: {
      label?: string
      backgroundColor: string
      data: number[]
    }[]
  }

  const props = defineProps<Props>()

  ChartJS.register(
    Title,
    Tooltip,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale
  )

  const targetLabel = '総人口'

  const buildLabels = () => {
    if (!props.data?.length) return
    const labels = props.data[0].data.result.data
      .map((resultData) => {
        if (resultData.label === targetLabel) {
          return resultData.data.map((data) => data.year)
        }
      })
      .filter((label) => label)[0]

    if (labels?.length) chartData.value.labels.push(...labels)
  }

  const setDatasets = () => {
    if (!props.data?.length) return

    // グラフ初期化
    chartData.value.datasets.splice(0)

    const datasets = props.data.map((data) => {
      return data.data.result.data
        .map((resultData) => {
          if (resultData.label === targetLabel) {
            return resultData.data.map((data) => data.value)
          }
        })
        .filter((val) => val)[0]
    })

    datasets.forEach((dataset, i) => {
      if (!dataset?.length) return

      chartData.value.datasets.push({
        backgroundColor: `#f8797${i}`,
        data: dataset,
      })
    })
  }

  const chartData = ref<ChartData>({
    labels: [],
    datasets: [],
  })

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  }

  onMounted(() => {
    buildLabels()
    setDatasets()
  })

  watch(
    () => props.data?.length,
    () => {
      setDatasets()
    }
  )
</script>

<template>
  <div class="graph">
    <div class="graph__inner">
      <Line :chart-data="chartData" :chart-options="chartOptions" />
    </div>
  </div>
</template>

<style scoped lang="scss">
  .graph {
    margin: 50px auto 74px;
    &__inner {
      width: 100%;
      max-width: 1020px;
      margin: 0 auto;
    }
  }
</style>
