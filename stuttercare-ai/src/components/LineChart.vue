<script setup>
import { computed } from 'vue'
const props = defineProps({ points: { type: Array, default: () => [] }, height: { type: Number, default: 240 } })
const W = 600, pad = 30
const coords = computed(() => props.points.map((p, i, a) => ({ ...p, x: pad + (a.length < 2 ? 0 : (i * (W - pad * 2)) / (a.length - 1)), y: props.height - pad - (p.value / 100) * (props.height - pad * 2) })))
const line = computed(() => coords.value.map((c, i) => `${i ? 'L' : 'M'}${c.x},${c.y}`).join(' '))
const area = computed(() => (coords.value.length ? `${line.value} L${coords.value.at(-1).x},${props.height - pad} L${coords.value[0].x},${props.height - pad} Z` : ''))
const gy = (g) => props.height - pad - (g / 100) * (props.height - pad * 2)
</script>

<template>
  <svg :viewBox="`0 0 ${W} ${height}`" class="chart" role="img" aria-label="Fluency score over time">
    <g v-for="g in [0, 50, 100]" :key="g">
      <line :x1="pad" :x2="W - pad" :y1="gy(g)" :y2="gy(g)" stroke="var(--line)" />
      <text :x="4" :y="gy(g) + 4" font-size="11" fill="#5d5580">{{ g }}</text>
    </g>
    <path :d="area" fill="var(--lav-soft)" />
    <path :d="line" fill="none" stroke="var(--brand)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
    <g v-for="c in coords" :key="c.label + c.x">
      <circle :cx="c.x" :cy="c.y" r="6" fill="#fff" stroke="var(--brand)" stroke-width="3" />
      <text :x="c.x" :y="height - 6" font-size="11" text-anchor="middle" fill="#5d5580">{{ c.label }}</text>
    </g>
  </svg>
</template>

<style scoped>
.chart { width: 100%; height: auto; display: block; }
</style>
