<script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
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
  import tinycolor from 'tinycolor2'
  import type { GraphData } from 'Resas'

  interface Props {
    data?: GraphData[]
  }

  interface ChartData {
    labels: number[]
    datasets: {
      label?: string
      borderColor: string
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

  const chartData = ref<ChartData>({
    labels: [],
    datasets: [],
  })

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  }

  const targetLabel = '総人口'

  // X軸生成
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

  // データ生成
  const setDatasets = () => {
    if (!props.data?.length) return

    chartData.value.datasets.splice(0) // グラフ初期化

    const datasets = props.data.map((data) => {
      const dataList = data.data.result.data
        .map((resultData) => {
          if (resultData.label === targetLabel) {
            return resultData.data.map((data) => data.value)
          }
        })
        .filter((val) => val)[0]

      return {
        code: data.code,
        data: dataList,
      }
    })

    datasets.forEach((dataset) => {
      if (!dataset.data?.length) return

      const color = tinycolor(
        `hsl(${Math.random() * 100}, 80, 50)`
      ).toHslString()

      const prefItem = document.getElementById(`prefItem_${dataset.code}`)
      if (prefItem) prefItem.style.color = color

      chartData.value.datasets.push({
        label: (
          document.getElementById(`pref_${dataset.code}`) as HTMLInputElement
        ).name,
        data: dataset.data,
        borderColor: color,
        backgroundColor: color,
      })
    })
  }

  onMounted(() => {
    buildLabels()
    setDatasets()
  })

  onBeforeUnmount(() => {
    chartData.value.datasets.splice(0)
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
      padding: 0 28px;
    }
  }
</style>
