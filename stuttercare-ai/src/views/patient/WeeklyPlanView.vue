<script setup>
import PageHeader from '../../components/PageHeader.vue'
import { session, isDone } from '../../stores/session'
import { DAYS, exercises, todayName } from '../../data/mock'

const title = (id) => exercises.find((e) => e.id === id)?.title ?? id
</script>

<template>
  <PageHeader title="Weekly plan" subtitle="Set with your therapist. Today is highlighted." />
  <div class="week">
    <section v-for="d in DAYS" :key="d" :class="['panel day', { today: d === todayName() }]">
      <h3>{{ d }}</h3>
      <p v-if="!session.plan[d]?.length" class="muted">Rest day</p>
      <RouterLink v-for="id in session.plan[d]" :key="id" :to="`/app/exercises/${id}`" class="chip">
        {{ title(id) }}<span v-if="d === todayName() && isDone(id)"> ✓</span>
      </RouterLink>
    </section>
  </div>
</template>

<style scoped>
.week { display: grid; gap: 14px; grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)); }
.day { display: flex; flex-direction: column; gap: 8px; min-height: 150px; }
.day.today { border-color: var(--brand); background: var(--lav-soft); }
.chip { background: #fff; border: 1px solid var(--line); border-radius: 12px; padding: 8px 12px; font-weight: 700; font-size: .9rem; text-decoration: none; }
.chip:hover { border-color: var(--brand); }
</style>
