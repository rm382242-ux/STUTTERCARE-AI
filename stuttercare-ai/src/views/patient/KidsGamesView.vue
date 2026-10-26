<script setup>
import { computed, ref } from 'vue'
import PageHeader from '../../components/PageHeader.vue'
import { session, addStars } from '../../stores/session'
import { games } from '../../data/mock'

const active = ref(null)
const i = ref(0)
const finished = ref(false)
const word = computed(() => active.value?.words[i.value])
function play(g) { active.value = g; i.value = 0; finished.value = false }
function said() {
  addStars(1)
  if (i.value + 1 >= active.value.words.length) finished.value = true
  else i.value++
}
</script>

<template>
  <PageHeader title="Voice games" :subtitle="`You have ${session.stars} stars`" />
  <section v-if="active" class="panel play">
    <button class="back" @click="active = null">All games</button>
    <template v-if="!finished">
      <p class="muted">{{ active.title }} · {{ i + 1 }} of {{ active.words.length }}</p>
      <h2 class="word">{{ word }}</h2>
      <p class="muted">Say it slowly with a soft start.</p>
      <button class="pill sun" @click="said">I said it!</button>
    </template>
    <template v-else>
      <h2>Great job!</h2>
      <p class="muted">You collected {{ active.words.length }} stars.</p>
      <div class="row"><button class="pill" @click="play(active)">Play again</button><RouterLink to="/app/rewards" class="pill ghost">See rewards</RouterLink></div>
    </template>
  </section>
  <div v-else class="grid-3">
    <button v-for="g in games" :key="g.id" class="panel g" @click="play(g)"><h3>{{ g.title }}</h3><p class="muted">{{ g.desc }}</p><span class="pill small">Play</span></button>
  </div>
</template>

<style scoped>
.g { text-align: left; font: inherit; cursor: pointer; display: flex; flex-direction: column; gap: 10px; align-items: flex-start; }
.g:hover { border-color: var(--brand); }
.play { display: flex; flex-direction: column; align-items: center; gap: 16px; padding: 40px 20px; text-align: center; }
.word { font-size: clamp(3rem, 12vw, 6rem); color: var(--brand); }
</style>
