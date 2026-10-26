<script setup>
import { useRouter } from 'vue-router'
import { chooseTrack } from '../../stores/session'

const router = useRouter()
const tracks = [
  { id: 'kids', title: 'Kids', text: 'Voice games, stars and rewards.', tone: 'sun' },
  { id: 'adults', title: 'Adults', text: 'Real-life practice: interviews, calls, ordering food.', tone: 'brand' }
]
function pick(id) {
  chooseTrack(id)
  router.push('/profile')
}
</script>

<template>
  <section class="screen">
    <h1>Choose your track</h1>
    <p class="muted intro">You can change this later with your therapist.</p>
    <div class="cards-2">
      <button v-for="t in tracks" :key="t.id" :class="['card', t.tone]" @click="pick(t.id)">
        <h2>{{ t.title }}</h2>
        <p>{{ t.text }}</p>
      </button>
    </div>
  </section>
</template>

<style scoped>
h1 { font-size: 2.3rem; margin-top: 18px; }
.intro { margin: 8px 0 24px; }
.card { text-align: left; border: 0; border-radius: var(--radius-lg); padding: 28px 24px; min-height: 170px; cursor: pointer; font-family: var(--font-body); display: flex; flex-direction: column; justify-content: flex-end; gap: 8px; transition: transform .15s ease; }
.card:hover { transform: translateY(-3px); }
.card h2 { font-size: 2.2rem; }
.sun { background: var(--sun); color: var(--ink); border-top-left-radius: 70px; }
.brand { background: var(--brand); color: #fff; border-bottom-right-radius: 70px; }
</style>
