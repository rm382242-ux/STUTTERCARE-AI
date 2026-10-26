<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { useRouter } from 'vue-router'
import WaveMark from '../../components/WaveMark.vue'

const router = useRouter()
const fluent = ref(false)
let t1, t2
onMounted(() => {
  t1 = setTimeout(() => (fluent.value = true), 500)
  t2 = setTimeout(() => router.push('/welcome'), 3200)
})
onBeforeUnmount(() => { clearTimeout(t1); clearTimeout(t2) })
</script>

<template>
  <section class="screen splash" @click="router.push('/welcome')">
    <WaveMark :fluent="fluent" :size="140" />
    <h1>StutterCare <span>AI</span></h1>
    <p class="muted">Practice at your own pace.</p>
  </section>
</template>

<style scoped>
.splash { min-height: 100dvh; align-items: center; justify-content: center; gap: 22px; text-align: center; background: linear-gradient(180deg, var(--paper), var(--mist)); cursor: pointer; }
h1 { font-size: 2.6rem; font-weight: 800; }
h1 span { color: var(--brand); }
</style>
