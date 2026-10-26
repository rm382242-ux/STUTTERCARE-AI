<script setup>
import { computed } from 'vue'
import PageHeader from '../../components/PageHeader.vue'
import StatCard from '../../components/StatCard.vue'
import { session } from '../../stores/session'
import { fmtDate, exerciseTitle, todayName } from '../../data/mock'

// TODO (Backend): load only the child linked to this parent account.
const child = computed(() => session.user?.profile?.childName || 'Your child')
const last = computed(() => session.results.at(-1))
const planned = computed(() => (session.plan[todayName()] ?? []).length)
</script>

<template>
  <PageHeader :title="`${child}'s dashboard`" subtitle="The child linked to your account." >
    <RouterLink to="/app/child" class="pill">See progress</RouterLink>
  </PageHeader>
  <div class="grid-3 gap">
    <StatCard label="Planned today" :value="planned" hint="exercises" tone="soft" />
    <StatCard label="Stars" :value="session.stars" hint="earned in games" tone="sun" />
    <StatCard label="Latest score" :value="last?.score ?? '-'" :hint="last ? fmtDate(last.date) : 'No sessions'" tone="mint" />
  </div>
  <section class="panel">
    <h3>Recent activity</h3>
    <div v-for="r in [...session.results].reverse().slice(0, 5)" :key="r.id" class="row between item">
      <span>{{ exerciseTitle(r.exerciseId) }}</span><span class="muted">{{ fmtDate(r.date) }} · score {{ r.score }}</span>
    </div>
  </section>
</template>

<style scoped>
.gap { margin-bottom: 20px; } h3 { margin-bottom: 8px; } .item { padding: 12px 0; border-bottom: 1px solid var(--line); }
</style>
