<script setup>
import { computed } from 'vue'
import PageHeader from '../../components/PageHeader.vue'
import StatCard from '../../components/StatCard.vue'
import LineChart from '../../components/LineChart.vue'
import { session } from '../../stores/session'
import { fmtDate } from '../../data/mock'

const recent = computed(() => session.results.slice(-8))
const points = computed(() => recent.value.map((r) => ({ label: fmtDate(r.date), value: r.score })))
const avg = computed(() => Math.round(recent.value.reduce((s, r) => s + r.score, 0) / (recent.value.length || 1)))
const change = computed(() => (recent.value.length > 1 ? recent.value.at(-1).score - recent.value[0].score : 0))
</script>

<template>
  <PageHeader title="Progress" subtitle="Your last sessions at a glance." />
  <div v-if="points.length">
    <div class="grid-3 gap">
      <StatCard label="Average score" :value="avg" tone="soft" />
      <StatCard label="Best score" :value="Math.max(...recent.map((r) => r.score))" tone="mint" />
      <StatCard label="Change" :value="(change >= 0 ? '+' : '') + change" hint="since first shown session" tone="sun" />
    </div>
    <section class="panel"><h3>Fluency practice score</h3><LineChart :points="points" /></section>
  </div>
  <p v-else class="empty">No sessions yet. <RouterLink to="/app/exercises" class="link">Start your first exercise</RouterLink></p>
</template>

<style scoped>
.gap { margin-bottom: 20px; }
h3 { margin-bottom: 14px; }
</style>
