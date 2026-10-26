<script setup>
import { computed } from 'vue'
import PageHeader from '../../components/PageHeader.vue'
import LineChart from '../../components/LineChart.vue'
import StatCard from '../../components/StatCard.vue'
import { session } from '../../stores/session'
import { fmtDate } from '../../data/mock'

const recent = computed(() => session.results.slice(-8))
const points = computed(() => recent.value.map((r) => ({ label: fmtDate(r.date), value: r.score })))
const last = computed(() => recent.value.at(-1))
</script>

<template>
  <PageHeader title="Child progress" subtitle="Reports shared with you." />
  <div class="grid-3 gap" v-if="last">
    <StatCard label="Speech rate" :value="last.wpm" hint="wpm, latest session" tone="soft" />
    <StatCard label="Pauses" :value="last.pauses" hint="latest session" tone="sun" />
    <StatCard label="Repetitions" :value="last.repetitions" hint="latest session" tone="mint" />
  </div>
  <section class="panel"><h3>Fluency practice score</h3><LineChart :points="points" /></section>
  <p class="notice">You only see data for the child linked to your account. Scores are practice feedback, not a diagnosis. Ask the therapist if anything worries you.</p>
</template>

<style scoped>
.gap { margin-bottom: 20px; } h3 { margin-bottom: 14px; } .notice { margin-top: 20px; }
</style>
