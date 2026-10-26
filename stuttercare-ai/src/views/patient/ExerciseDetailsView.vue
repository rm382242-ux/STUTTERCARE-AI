<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import PageHeader from '../../components/PageHeader.vue'
import { exercises } from '../../data/mock'

const route = useRoute()
const ex = computed(() => exercises.find((e) => e.id === route.params.id))
</script>

<template>
  <div v-if="ex">
    <RouterLink to="/app/exercises" class="link">Back to exercises</RouterLink>
    <PageHeader :title="ex.title" :subtitle="ex.goal">
      <RouterLink :to="`/app/record/${ex.id}`" class="pill">Start recording</RouterLink>
    </PageHeader>
    <div class="grid-2">
      <section class="panel">
        <h3>Instructions</h3>
        <ol><li v-for="s in ex.steps" :key="s">{{ s }}</li></ol>
        <p class="muted">{{ ex.minutes }} minutes · {{ ex.level }} · {{ ex.type }}</p>
      </section>
      <section class="panel soft">
        <h3>Say these</h3>
        <p v-for="p in ex.phrases" :key="p" class="phrase">{{ p }}</p>
      </section>
    </div>
  </div>
  <p v-else class="empty">Exercise not found. <RouterLink to="/app/exercises" class="link">See all exercises</RouterLink></p>
</template>

<style scoped>
ol { padding-left: 20px; display: flex; flex-direction: column; gap: 10px; line-height: 1.5; }
.phrase { font: 700 1.3rem var(--font-display); padding: 10px 0; border-bottom: 1px solid var(--line); }
h3 { margin-bottom: 12px; }
</style>
