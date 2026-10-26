<script setup>
import { computed } from 'vue'
import PageHeader from '../../components/PageHeader.vue'
import { session } from '../../stores/session'
import { exerciseTitle, fmtDate } from '../../data/mock'

const print = () => window.print()
const rows = computed(() => [...session.results].reverse())
</script>

<template>
  <PageHeader title="Performance reports" subtitle="Every recorded session, newest first.">
    <button class="pill ghost" @click="print">Print report</button>
  </PageHeader>
  <section class="panel table-wrap" v-if="rows.length">
    <table class="table">
      <thead><tr><th>Date</th><th>Exercise</th><th>Score</th><th>Rate (wpm)</th><th>Pauses</th><th>Repetitions</th><th /></tr></thead>
      <tbody>
        <tr v-for="r in rows" :key="r.id">
          <td>{{ fmtDate(r.date) }}</td><td>{{ exerciseTitle(r.exerciseId) }}</td><td><strong>{{ r.score }}</strong></td>
          <td>{{ r.wpm }}</td><td>{{ r.pauses }}</td><td>{{ r.repetitions }}</td>
          <td><RouterLink :to="`/app/results/${r.id}`" class="link">View</RouterLink></td>
        </tr>
      </tbody>
    </table>
  </section>
  <p v-else class="empty">No reports yet.</p>
</template>

