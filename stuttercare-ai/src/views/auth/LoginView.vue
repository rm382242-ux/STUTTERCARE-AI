<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import AppButton from '../../components/AppButton.vue'
import TextField from '../../components/TextField.vue'
import { session, signIn, homeFor } from '../../stores/session'

const router = useRouter()
const roles = [{ id: 'patient', label: 'Patient' }, { id: 'parent', label: 'Parent' }, { id: 'therapist', label: 'Therapist' }]
const form = reactive({ email: '', password: '', role: 'patient' })
const errors = ref({})

function submit() {
  const e = {}
  if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email address.'
  if (!form.password) e.password = 'Enter your password.'
  errors.value = e
  if (Object.keys(e).length) return
  // TODO (Backend): POST /auth/login. The server returns the real role; the picker is for the demo only.
  signIn({ name: form.email.split('@')[0], email: form.email, role: form.role })
  if (!session.track) session.track = 'adults'
  router.push(homeFor(session.user))
}
</script>

<template>
  <form class="screen" novalidate @submit.prevent="submit">
    <button type="button" class="back" @click="router.push('/welcome')">Back</button>
    <h1>Welcome back</h1>
    <p class="muted intro">Log in to continue today's practice.</p>
    <div class="roles" role="radiogroup" aria-label="Log in as">
      <button v-for="r in roles" :key="r.id" type="button" role="radio" :aria-checked="form.role === r.id" :class="{ on: form.role === r.id }" @click="form.role = r.id">{{ r.label }}</button>
    </div>
    <div class="stack fields">
      <TextField v-model="form.email" label="Email" type="email" :error="errors.email" />
      <TextField v-model="form.password" label="Password" type="password" :error="errors.password" />
    </div>
    <AppButton type="submit">Log in</AppButton>
    <p class="muted foot">New here? <RouterLink class="link" to="/register">Create an account</RouterLink></p>
  </form>
</template>

<style scoped>
h1 { font-size: 2.4rem; margin: 6px 0 8px; }
.intro { margin-bottom: 20px; }
.roles { display: flex; gap: 8px; margin-bottom: 18px; }
.roles button { flex: 1; font: 700 .9rem var(--font-body); padding: 12px 8px; border-radius: var(--radius-md); border: 2px solid var(--line); background: #fff; color: var(--ink); cursor: pointer; }
.roles button.on { background: var(--brand); border-color: var(--brand); color: #fff; }
.fields { margin-bottom: 22px; }
.foot { text-align: center; margin-top: 16px; }
</style>
