<script setup>
import { computed, onBeforeUnmount, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PageHeader from '../../components/PageHeader.vue'
import { session, addResult, markDone, addStars } from '../../stores/session'
import { analyzeRecording, exerciseTitle } from '../../data/mock'

const route = useRoute()
const router = useRouter()
const state = ref('idle') // idle | recording | processing
const seconds = ref(0)
const levels = ref(Array(28).fill(8))
const error = ref('')
const title = computed(() => exerciseTitle(route.params.id))
let stream, ctx, analyser, raf, timer, recorder

async function start() {
  error.value = ''
  try { stream = await navigator.mediaDevices.getUserMedia({ audio: true }) } catch {
    error.value = 'Microphone access is blocked. Allow it in your browser settings, or use the demo recording.'
    return
  }
  ctx = new AudioContext()
  analyser = ctx.createAnalyser(); analyser.fftSize = 64
  ctx.createMediaStreamSource(stream).connect(analyser)
  recorder = new MediaRecorder(stream)
  recorder.start() // TODO (Backend): collect chunks and upload to POST /recordings
  state.value = 'recording'; seconds.value = 0
  timer = setInterval(() => seconds.value++, 1000)
  draw()
}
function draw() {
  const d = new Uint8Array(analyser.frequencyBinCount)
  analyser.getByteFrequencyData(d)
  levels.value = levels.value.map((_, i) => Math.max(8, (d[i] / 255) * 100))
  raf = requestAnimationFrame(draw)
}
function cleanup() {
  clearInterval(timer); cancelAnimationFrame(raf)
  if (recorder && recorder.state !== 'inactive') recorder.stop()
  stream?.getTracks().forEach((t) => t.stop())
  ctx?.close()
}
function stop() { const s = Math.max(seconds.value, 3); cleanup(); finish(s) }
function demo() { finish(12) }
function finish(sec) {
  state.value = 'processing'
  setTimeout(() => {
    const res = analyzeRecording(sec)
    const id = addResult({ exerciseId: route.params.id, duration: sec, ...res })
    markDone(route.params.id)
    if (session.track === 'kids') addStars(res.score >= 60 ? 3 : 2)
    router.push(`/app/results/${id}`)
  }, 1600)
}
onBeforeUnmount(cleanup)
const mmss = computed(() => `${String(Math.floor(seconds.value / 60)).padStart(2, '0')}:${String(seconds.value % 60).padStart(2, '0')}`)
</script>

<template>
  <PageHeader :title="title" subtitle="Read the phrases aloud at a comfortable pace." />
  <section class="panel rec">
    <div class="bars" aria-hidden="true"><span v-for="(h, i) in levels" :key="i" :style="{ height: h + '%' }" /></div>
    <p class="time">{{ mmss }}</p>
    <p v-if="state === 'processing'" class="muted" role="status">Analyzing your recording...</p>
    <div v-else class="row center">
      <button v-if="state === 'idle'" class="pill" @click="start">Start recording</button>
      <button v-else class="pill sun" @click="stop">Stop and analyze</button>
      <button v-if="state === 'idle'" class="pill ghost" @click="demo">Use demo recording</button>
    </div>
    <p v-if="error" class="err" role="alert">{{ error }}</p>
  </section>
  <p class="notice">Your recording is used for practice feedback only.</p>
</template>

<style scoped>
.rec { display: flex; flex-direction: column; align-items: center; gap: 22px; padding: 40px 20px; margin-bottom: 20px; }
.bars { display: flex; align-items: center; gap: 5px; height: 120px; }
.bars span { width: 8px; border-radius: 99px; background: var(--brand); transition: height .08s; }
.time { font: 800 2.6rem var(--font-display); }
.center { justify-content: center; }
.err { color: var(--berry); text-align: center; max-width: 440px; }
</style>
