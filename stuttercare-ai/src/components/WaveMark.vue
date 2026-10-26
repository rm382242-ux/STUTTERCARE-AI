<script setup>
// Bars start broken and uneven (a stutter) and settle into a smooth wave (fluent speech).
import { computed } from 'vue'
const props = defineProps({ fluent: Boolean, size: { type: Number, default: 120 } })
const COUNT = 15
const broken = [30, 8, 8, 70, 12, 55, 6, 6, 80, 20, 20, 45, 6, 60, 15]
const smooth = Array.from({ length: COUNT }, (_, i) => 20 + 60 * Math.abs(Math.sin((i / (COUNT - 1)) * Math.PI * 1.5 + 0.4)))
const bars = computed(() => (props.fluent ? smooth : broken))
</script>

<template>
  <div class="wave" :style="{ height: size + 'px' }" aria-hidden="true">
    <span v-for="(h, i) in bars" :key="i" :style="{ height: h + '%', transitionDelay: i * 45 + 'ms' }" />
  </div>
</template>

<style scoped>
.wave { display: flex; align-items: center; gap: 6px; }
.wave span { width: 9px; border-radius: 99px; background: var(--brand); transition: height .9s cubic-bezier(.3, 1.3, .5, 1); }
.wave span:nth-child(3n) { background: var(--sun); }
</style>
