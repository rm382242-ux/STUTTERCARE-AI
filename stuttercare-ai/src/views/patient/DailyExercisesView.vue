<script setup>
import { computed } from 'vue'
import PageHeader from '../../components/PageHeader.vue'
import { session, isDone } from '../../stores/session'
import { exercises, todayName } from '../../data/mock'

const available = computed(() => exercises.filter((e) => e.tracks.includes(session.track ?? 'adults')))
const today = computed(() => session.plan[todayName()] ?? [])
</script>

<template>
  <PageHeader title="Daily exercises" subtitle="Pick an exercise. Planned ones for today are marked." />
  <div class="grid-2">
    <RouterLink v-for="e in available" :key="e.id" :to="`/app/exercises/${e.id}`" class="panel card">
      <div class="row between"><span class="tag">{{ e.type }}</span><span class="tag good" v-if="isDone(e.id)">Done today</span><span class="tag warn" v-else-if="today.includes(e.id)">Planned today</span></div>
      <h3>{{ e.title }}</h3>
      <p class="muted">{{ e.goal }}</p>
      <small>{{ e.minutes }} min · {{ e.level }}</small>
    </RouterLink>
  </div>
</template>

<style scoped>
.card { text-decoration: none; display: flex; flex-direction: column; gap: 10px; transition: transform .15s, border-color .15s; }
.card:hover { transform: translateY(-3px); border-color: var(--brand); }
</style>
