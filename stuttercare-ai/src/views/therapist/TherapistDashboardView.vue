<script setup>
import PageHeader from '../../components/PageHeader.vue'
import { patients, appointments } from '../../data/mock'

const trend = (s) => (s.at(-1) - s[0] >= 5 ? 'Improving' : s.at(-1) - s[0] <= -2 ? 'Declining' : 'Steady')
</script>

<template>
  <PageHeader title="Therapist dashboard" subtitle="Only patients linked to your account are listed." />
  <section class="panel table-wrap gap">
    <table class="table">
      <thead><tr><th>Patient</th><th>Track</th><th>Adherence</th><th>Latest score</th><th>Trend</th><th /></tr></thead>
      <tbody>
        <tr v-for="p in patients" :key="p.id">
          <td><strong>{{ p.name }}</strong></td><td>{{ p.track }}</td><td>{{ p.adherence }}%</td><td>{{ p.scores.at(-1) }}</td>
          <td><span :class="['tag', { good: trend(p.scores) === 'Improving', warn: trend(p.scores) !== 'Improving' }]">{{ trend(p.scores) }}</span></td>
          <td><RouterLink :to="`/app/patients/${p.id}`" class="link">Open</RouterLink></td>
        </tr>
      </tbody>
    </table>
  </section>
  <section class="panel soft">
    <h3>Upcoming follow-ups</h3>
    <div v-for="a in appointments" :key="a.id" class="row between item"><span>{{ a.who }}</span><span class="muted">{{ a.when }}</span></div>
  </section>
</template>

<style scoped>
.gap { margin-bottom: 20px; } h3 { margin-bottom: 8px; } .item { padding: 10px 0; }
</style>
