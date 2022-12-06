<script setup lang="ts"></script>

<template>
  <header class="header">
    <div class="header__inner">
      <h1 class="header-title">RESAS総人口推移グラフ</h1>
    </div>
  </header>
</template>

<style scoped lang="scss">
  .header {
    background-color: $color_blue;
    &__inner {
      width: 100%;
      max-width: 1080px;
      padding: 18px 0 18px 15px;
      @include mq(sp) {
        padding: 10px 0;
        text-align: center;
      }
    }
  }

  .header-title {
    font-size: 24px;
    font-weight: bold;
    color: $color_white;
    @include mq(sp) {
      font-size: 18px;
    }
  }
</style>
