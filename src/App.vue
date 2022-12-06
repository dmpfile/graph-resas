<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import AppHeader from './components/AppHeader.vue'
  import PrefList from './components/PrefList.vue'
  import ChartGraph from './components/ChartGraph.vue'
  import resas from '@/api/resas'
  import type { PrefObject, GraphData } from 'Resas'

  const prefData = ref<PrefObject>()
  const graphData = ref<GraphData[]>([])
  const prefCompareList = ref<number[]>([])

  const addGraph = (prefList: number[]) => {
    prefList.forEach(async (code) => {
      // チェックを外したときも処理が動くので、チェックしたままのデータを再度リクエストしないように
      if (graphData.value.some((graph) => graph.code === code)) return

      const res = await resas.fetchPopulationByPref(`${code}`)
      if (res.data) {
        graphData.value?.push({ code, data: res.data })
      }
    })
  }

  const removeGraph = (prefCode: number) => {
    const index = graphData.value.findIndex((graph) => graph.code === prefCode)
    graphData.value.splice(index, 1)
  }

  const updateCompareList = (prefList: number[]) => {
    prefCompareList.value.splice(0)
    prefCompareList.value.push(...prefList)
  }

  const resetPrefNameColor = () => {
    const allPrefItem =
      document.querySelectorAll<HTMLElement>('.pref-list__item')
    allPrefItem.forEach((pref) => {
      pref.style.color = ''
    })
  }

  const resetCheckbox = () => {
    const allPrefCheckbox =
      document.querySelectorAll<HTMLInputElement>('[id^="pref_"]')
    allPrefCheckbox.forEach((pref) => {
      pref.checked = false
    })
  }

  const updateGraph = (prefList: number[]) => {
    // 初回チェック時
    if (prefCompareList.value.length === 0) {
      prefCompareList.value.push(...prefList)
    }

    // チェック追加したとき（初回は都道府県の選択数が同じになるため「以上」にしている）
    if (prefList.length >= prefCompareList.value.length) {
      addGraph(prefList)
    }

    // チェック外れたとき
    if (prefList.length < prefCompareList.value.length) {
      const targetCode = prefCompareList.value.filter((prefCompareCode) =>
        prefList.some((prefCode) => prefCompareCode !== prefCode)
      )

      targetCode.length === 0
        ? graphData.value.splice(0)
        : removeGraph(targetCode[0])
    }

    resetPrefNameColor()
    updateCompareList(prefList)
  }

  const resetGraph = () => {
    graphData.value.splice(0)
    prefCompareList.value.splice(0)
    resetPrefNameColor()
    resetCheckbox()
  }

  onMounted(async () => {
    prefData.value = (await resas.fetchPrefList()).data
  })
</script>

<template>
  <AppHeader />
  <div class="main">
    <PrefList
      :data="prefData"
      v-on:update-pref="updateGraph"
      v-on:reset-pref="resetGraph"
    />
    <ChartGraph v-if="graphData.length" :data="graphData" />
  </div>
</template>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap');
  #app {
    font-family: $main-font;
  }
</style>
