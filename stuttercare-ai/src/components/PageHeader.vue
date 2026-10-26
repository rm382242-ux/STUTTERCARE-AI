<script setup>
defineProps({ title: String, subtitle: String })
</script>

<template>
  <header class="head">
    <div>
      <h1>{{ title }}</h1>
      <p v-if="subtitle" class="muted">{{ subtitle }}</p>
    </div>
    <div class="actions"><slot /></div>
  </header>
</template>

<style scoped>
.head { display: flex; justify-content: space-between; align-items: flex-end; gap: 16px; flex-wrap: wrap; margin-bottom: 28px; }
h1 { font-size: clamp(1.9rem, 4vw, 2.6rem); margin-bottom: 6px; }
.actions { display: flex; gap: 10px; flex-wrap: wrap; }
</style>
