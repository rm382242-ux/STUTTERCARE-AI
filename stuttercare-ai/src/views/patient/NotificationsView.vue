<script setup>
import PageHeader from '../../components/PageHeader.vue'
import { session, markAllRead, unread } from '../../stores/session'
</script>

<template>
  <PageHeader title="Notifications" :subtitle="unread ? `${unread} unread` : 'You are all caught up.'">
    <button v-if="unread" class="pill ghost small" @click="markAllRead">Mark all as read</button>
  </PageHeader>
  <div class="stack">
    <article v-for="n in session.notifications" :key="n.id" :class="['panel n', { new: !n.read }]" @click="n.read = true">
      <div class="row between"><strong>{{ n.title }}</strong><span class="muted">{{ n.time }}</span></div>
      <p class="muted">{{ n.text }}</p>
    </article>
  </div>
</template>

<style scoped>
.n { cursor: pointer; } .n.new { border-color: var(--brand); background: var(--lav-soft); }
</style>
