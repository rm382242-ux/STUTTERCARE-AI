<script setup>
import { ref } from 'vue'
import PageHeader from '../../components/PageHeader.vue'
import { simulations } from '../../data/mock'

const current = ref(simulations[0])
</script>

<template>
  <PageHeader title="Simulations" subtitle="Rehearse real situations before they happen." />
  <div class="row tabs">
    <button v-for="s in simulations" :key="s.id" :class="['pill small', { ghost: current.id !== s.id }]" @click="current = s">{{ s.title }}</button>
  </div>
  <section class="panel">
    <div v-for="(l, i) in current.lines" :key="i" :class="['line', l.who === 'You' ? 'me' : 'them']">
      <small>{{ l.who }}</small><p>{{ l.text }}</p>
    </div>
    <RouterLink :to="`/app/record/sim-${current.id}`" class="pill go">Practice this scene</RouterLink>
  </section>
</template>

<style scoped>
.tabs { margin-bottom: 20px; }
.line { max-width: 560px; padding: 12px 16px; border-radius: 18px; margin-bottom: 12px; }
.them { background: var(--lav-soft); } .me { background: var(--mint); margin-left: auto; }
small { font-weight: 700; }
.go { margin-top: 10px; }
</style>
