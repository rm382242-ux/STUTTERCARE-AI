<script setup>
defineProps({ label: String, modelValue: [String, Number], type: { type: String, default: 'text' }, error: String })
defineEmits(['update:modelValue'])
</script>

<template>
  <label class="field">
    <span class="label">{{ label }}</span>
    <input :type="type" :value="modelValue" :class="{ bad: error }" @input="$emit('update:modelValue', $event.target.value)" />
    <span v-if="error" class="error" role="alert">{{ error }}</span>
  </label>
</template>

<style scoped>
.field { display: flex; flex-direction: column; gap: 6px; }
.label { font-weight: 700; font-size: .9rem; }
input { font: inherit; padding: 14px 16px; border-radius: var(--radius-md); border: 2px solid var(--line); background: #fff; color: var(--ink); }
input:focus { border-color: var(--brand); outline: none; }
input.bad { border-color: var(--berry); }
.error { color: var(--berry); font-size: .85rem; }
</style>
