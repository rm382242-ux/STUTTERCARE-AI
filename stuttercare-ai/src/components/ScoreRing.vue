<script setup>
import { computed } from 'vue'
const props = defineProps({ value: { type: Number, default: 0 }, size: { type: Number, default: 150 } })
const C = 2 * Math.PI * 52
const offset = computed(() => C * (1 - Math.min(100, props.value) / 100))
</script>

<template>
  <div class="ring" :style="{ width: size + 'px', height: size + 'px' }" role="img" :aria-label="`Fluency score ${value} out of 100`">
    <svg viewBox="0 0 120 120">
      <circle cx="60" cy="60" r="52" fill="none" stroke="var(--lav-soft)" stroke-width="12" />
      <circle cx="60" cy="60" r="52" fill="none" stroke="var(--brand)" stroke-width="12" stroke-linecap="round" :stroke-dasharray="C" :stroke-dashoffset="offset" transform="rotate(-90 60 60)" style="transition: stroke-dashoffset 1s ease" />
    </svg>
    <div class="num"><strong>{{ value }}</strong><span>score</span></div>
  </div>
</template>

<style scoped>
.ring { position: relative; }
.num { position: absolute; inset: 0; display: grid; place-content: center; text-align: center; }
.num strong { font: 800 2.4rem var(--font-display); line-height: 1; }
.num span { font-size: .8rem; color: #5d5580; }
</style>
