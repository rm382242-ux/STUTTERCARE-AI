<script setup>
import PageHeader from '../../components/PageHeader.vue'
import { session } from '../../stores/session'
import { fmtDate } from '../../data/mock'
</script>

<template>
  <PageHeader title="Therapist feedback" subtitle="Notes and recommendations from your speech therapist." />
  <div class="stack">
    <article v-for="f in session.feedback" :key="f.id" class="panel">
      <div class="row between"><strong>{{ f.from }}</strong><span class="muted">{{ fmtDate(f.date) }}</span></div>
      <p>{{ f.text }}</p>
    </article>
    <p v-if="!session.feedback.length" class="empty">No notes yet. Your therapist's notes will show up here.</p>
  </div>
</template>
