<script setup>
import WaveMark from '../components/WaveMark.vue'
</script>

<template>
  <div class="auth">
    <aside class="brandpane">
      <RouterLink to="/welcome" class="logo">StutterCare AI</RouterLink>
      <div class="mid">
        <WaveMark fluent :size="120" />
        <h2>Speak at your own pace.</h2>
        <p>Daily exercises, instant practice feedback, and a therapist who stays in the loop.</p>
      </div>
      <p class="small">AI feedback supports practice. It is not a medical diagnosis.</p>
    </aside>
    <main class="formpane">
      <div :class="['card', { wide: $route.meta.wide }]">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<style scoped>
.auth { min-height: 100dvh; display: grid; grid-template-columns: 1fr; }
.brandpane { display: none; background: var(--lav); padding: 40px; flex-direction: column; justify-content: space-between; }
.logo { font: 800 1.4rem var(--font-display); text-decoration: none; color: var(--brand-deep); }
.mid { display: flex; flex-direction: column; gap: 18px; max-width: 420px; }
.mid h2 { font-size: 3rem; color: var(--brand-deep); }
.small { font-size: .85rem; }
.formpane { display: grid; place-items: center; padding: 32px 20px; }
.card { width: 100%; max-width: 480px; display: flex; flex-direction: column; }
.card.wide { max-width: 760px; }
@media (min-width: 900px) { .auth { grid-template-columns: 5fr 6fr; } .brandpane { display: flex; } }
</style>
