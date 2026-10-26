<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import AppButton from '../../components/AppButton.vue'
import TextField from '../../components/TextField.vue'
import { signIn } from '../../stores/session'

const router = useRouter()
const roles = [
  { id: 'patient', label: 'I want to practice' },
  { id: 'parent', label: "I'm a parent" },
  { id: 'therapist', label: "I'm a therapist" }
]
const form = reactive({ name: '', email: '', password: '', confirm: '', role: 'patient' })
const errors = ref({})

function validate() {
  const e = {}
  if (form.name.trim().length < 2) e.name = 'Enter your full name.'
  if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email address.'
  if (form.password.length < 8) e.password = 'Use at least 8 characters.'
  if (form.confirm !== form.password) e.confirm = 'Passwords do not match.'
  errors.value = e
  return Object.keys(e).length === 0
}

function submit() {
  if (!validate()) return
  // TODO (Backend): POST /auth/register
  signIn({ name: form.name, email: form.email, role: form.role })
  router.push(form.role === 'patient' ? '/track' : '/profile')
}
</script>

<template>
  <form class="screen" novalidate @submit.prevent="submit">
    <button type="button" class="back" @click="router.back()">Back</button>
    <h1>Create your account</h1>
    <div class="roles" role="radiogroup" aria-label="Account type">
      <button v-for="r in roles" :key="r.id" type="button" role="radio" :aria-checked="form.role === r.id" :class="{ on: form.role === r.id }" @click="form.role = r.id">{{ r.label }}</button>
    </div>
    <div class="stack fields">
      <TextField v-model="form.name" label="Full name" :error="errors.name" />
      <TextField v-model="form.email" label="Email" type="email" :error="errors.email" />
      <TextField v-model="form.password" label="Password" type="password" :error="errors.password" />
      <TextField v-model="form.confirm" label="Confirm password" type="password" :error="errors.confirm" />
    </div>
    <AppButton type="submit">Create account</AppButton>
    <p class="muted foot">Have an account? <RouterLink class="link" to="/login">Log in</RouterLink></p>
  </form>
</template>

<style scoped>
h1 { font-size: 2.1rem; margin: 6px 0 18px; }
.roles { display: flex; gap: 8px; margin-bottom: 18px; }
.roles button { flex: 1; font: 700 .82rem var(--font-body); padding: 12px 8px; border-radius: var(--radius-md); border: 2px solid var(--line); background: #fff; color: var(--ink); cursor: pointer; }
.roles button.on { background: var(--brand); border-color: var(--brand); color: #fff; }
.fields { margin-bottom: 22px; }
.foot { text-align: center; margin-top: 16px; }
</style>
