<script setup>
defineProps({ variant: { type: String, default: 'primary' }, type: { type: String, default: 'button' } })
</script>

<template>
  <button :type="type" :class="['btn', variant]"><slot /></button>
</template>

<style scoped>
.btn { font: 700 1.05rem var(--font-body); padding: 16px 20px; border-radius: 99px; border: 2px solid transparent; cursor: pointer; width: 100%; transition: transform .12s ease, background .2s; }
.btn:active { transform: scale(.98); }
.primary { background: var(--brand); color: #fff; }
.primary:hover { background: var(--brand-deep); }
.ghost { background: transparent; color: var(--brand); border-color: var(--line); }
.ghost:hover { border-color: var(--brand); }
</style>
