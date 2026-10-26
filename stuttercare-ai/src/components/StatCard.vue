<script setup>
defineProps({ label: String, value: [String, Number], hint: String, tone: { type: String, default: 'soft' } })
</script>

<template>
  <div :class="['stat', tone]">
    <span class="l">{{ label }}</span>
    <strong>{{ value }}</strong>
    <span v-if="hint" class="h">{{ hint }}</span>
  </div>
</template>

<style scoped>
.stat { border-radius: 22px; padding: 20px; display: flex; flex-direction: column; gap: 4px; }
.soft { background: var(--lav-soft); } .sun { background: #ffe9b0; } .mint { background: var(--mint); } .white { background: #fff; border: 1px solid var(--line); }
.l { font-weight: 700; font-size: .9rem; }
strong { font: 800 2.2rem var(--font-display); line-height: 1.1; }
.h { font-size: .82rem; color: #4b4470; }
</style>
