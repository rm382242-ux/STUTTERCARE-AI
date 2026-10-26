<script setup>
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import AppButton from '../../components/AppButton.vue'
import TextField from '../../components/TextField.vue'
import { session, saveProfile, homeFor } from '../../stores/session'

const router = useRouter()
const role = computed(() => session.user?.role ?? 'patient')

// Fields per account type (Patient / Parent / Therapist).
const schema = {
  patient: [
    { key: 'age', label: 'Your age', type: 'number' },
    { key: 'since', label: 'Age when stuttering started (optional)', type: 'number', optional: true }
  ],
  parent: [
    { key: 'childName', label: "Child's name" },
    { key: 'childAge', label: "Child's age", type: 'number' }
  ],
  therapist: [
    { key: 'license', label: 'License number' },
    { key: 'clinic', label: 'Clinic or hospital' }
  ]
}
const fields = computed(() => schema[role.value])
const form = reactive({})
const errors = ref({})

function submit() {
  const e = {}
  for (const f of fields.value) if (!f.optional && !String(form[f.key] ?? '').trim()) e[f.key] = 'This field is required.'
  errors.value = e
  if (Object.keys(e).length) return
  saveProfile({ ...form })
  router.push(homeFor(session.user))
}
</script>

<template>
  <form class="screen" novalidate @submit.prevent="submit">
    <h1>Almost there</h1>
    <p class="muted intro">A few details so we can set up the right practice for you.</p>
    <div class="stack fields">
      <TextField v-for="f in fields" :key="f.key" v-model="form[f.key]" :label="f.label" :type="f.type" :error="errors[f.key]" />
    </div>
    <AppButton type="submit">Save and continue</AppButton>
  </form>
</template>

<style scoped>
h1 { font-size: 2.3rem; margin-top: 18px; }
.intro { margin: 8px 0 24px; }
.fields { margin-bottom: 22px; }
</style>
