<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import PageHeader from '../../components/PageHeader.vue'
import LineChart from '../../components/LineChart.vue'
import StatCard from '../../components/StatCard.vue'
import { patients } from '../../data/mock'

const route = useRoute()
const p = computed(() => patients.find((x) => x.id === route.params.id))
const points = computed(() => p.value.scores.map((v, i) => ({ label: 'S' + (i + 1), value: v })))
</script>

<template>
  <div v-if="p">
    <RouterLink to="/app/therapist" class="link">All patients</RouterLink>
    <PageHeader :title="p.name" :subtitle="`${p.track}, age ${p.age}`">
      <RouterLink :to="`/app/plans?patient=${p.id}`" class="pill">Edit training plan</RouterLink>
    </PageHeader>
    <div class="grid-3 gap">
      <StatCard label="Latest score" :value="p.scores.at(-1)" tone="soft" />
      <StatCard label="Best score" :value="Math.max(...p.scores)" tone="mint" />
      <StatCard label="Plan adherence" :value="p.adherence + '%'" tone="sun" />
    </div>
    <section class="panel"><h3>Fluency practice score by session</h3><LineChart :points="points" /></section>
    <p class="notice">AI results are practice feedback. Use your clinical judgement before changing a plan.</p>
  </div>
  <p v-else class="empty">Patient not found, or not linked to your account.</p>
</template>

<style scoped>
.gap { margin-bottom: 20px; } h3 { margin-bottom: 14px; } .notice { margin-top: 20px; }
</style>
