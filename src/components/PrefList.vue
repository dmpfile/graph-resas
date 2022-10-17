<script setup lang="ts">
  import { ref } from 'vue'
  import type { PrefObject } from 'Resas'

  interface Props {
    data: PrefObject | undefined
  }

  interface Emits {
    (e: 'updatePref', value: number[]): void
    (e: 'resetPref'): void
  }

  const props = defineProps<Props>()
  const emit = defineEmits<Emits>()

  const checkedPrefCode = ref<number[]>([])
  const handlerCheckbox = (prefCode: number) => {
    if (checkedPrefCode.value.includes(prefCode)) {
      const i = checkedPrefCode.value.indexOf(prefCode)
      checkedPrefCode.value.splice(i, 1)
    } else {
      checkedPrefCode.value.push(prefCode)
    }

    emit('updatePref', checkedPrefCode.value)
  }

  const handlerReset = () => {
    checkedPrefCode.value.splice(0)
    emit('resetPref')
  }
</script>

<template>
  <div class="pref">
    <div class="pref__inner">
      <h2 class="pref-title">都道府県</h2>
      <ul v-if="props.data" class="pref-list">
        <li
          v-for="(pref, i) in props.data.result"
          :key="i"
          :id="`prefItem_${pref.prefCode}`"
          class="pref-list__item"
        >
          <label :for="`pref_${pref.prefCode}`">
            <input
              type="checkbox"
              :name="`${pref.prefName}`"
              :id="`pref_${pref.prefCode}`"
              @change="handlerCheckbox(pref.prefCode)"
            />{{ pref.prefName }}
          </label>
        </li>
        <li class="pref-list__item" @click="handlerReset()">
          <label for="pref_reset">
            <input type="button" id="pref_reset" value="すべて解除" />
          </label>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .pref {
    margin: 25px auto 50px;
    &__inner {
      width: 100%;
      max-width: 1080px;
      margin: 0 auto;
    }
  }

  .pref-title {
    font-size: 20px;
    font-weight: bold;
    color: $color_pink;
  }

  .pref-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    justify-content: center;
    align-items: center;
    gap: 50px 30px;
    padding: 40px 50px 30px;
    list-style: none;
    &__item {
      font-size: 20px;
      font-weight: bold;
      transition: all 0.6s;
      :hover {
        opacity: 0.6;
      }
      > label {
        cursor: pointer;
        > input {
          margin-right: 8px;
        }
      }
    }
  }
</style>
