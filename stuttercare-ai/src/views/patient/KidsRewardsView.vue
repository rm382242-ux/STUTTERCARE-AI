<script setup>
import PageHeader from '../../components/PageHeader.vue'
import { session } from '../../stores/session'
import { badges } from '../../data/mock'

const next = () => badges.find((b) => b.at > session.stars)
</script>

<template>
  <PageHeader title="Rewards" subtitle="Practice and play to collect stars and badges." />
  <section class="panel soft big">
    <strong class="n">{{ session.stars }}</strong><span>stars collected</span>
    <p v-if="next()" class="muted">{{ next().at - session.stars }} more for "{{ next().name }}"</p>
    <p v-else class="muted">You earned every badge. Amazing!</p>
  </section>
  <div class="grid-4">
    <div v-for="b in badges" :key="b.name" :class="['panel b', { locked: session.stars < b.at }]">
      <div class="medal">{{ session.stars >= b.at ? '★' : '☆' }}</div>
      <h3>{{ b.name }}</h3><p class="muted">{{ b.at }} stars</p>
    </div>
  </div>
</template>

<style scoped>
.big { margin-bottom: 20px; display: flex; flex-direction: column; align-items: flex-start; }
.n { font: 800 4rem var(--font-display); line-height: 1; color: var(--brand); }
.b { text-align: center; } .b.locked { opacity: .5; }
.medal { width: 70px; height: 70px; margin: 0 auto 10px; border-radius: 50%; background: var(--sun); display: grid; place-items: center; font-size: 2rem; }
.locked .medal { background: var(--line); }
</style>
