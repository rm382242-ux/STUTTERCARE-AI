<script setup>
import { reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PageHeader from '../../components/PageHeader.vue'
import { session } from '../../stores/session'
import { DAYS, exercises, patients, defaultPlan } from '../../data/mock'

const route = useRoute()
const router = useRouter()
const pid = ref(route.query.patient || patients[0].id)
const plan = reactive({})
const note = ref('')
const saved = ref(false)

function load() {
  const s = session.patientPlans[pid.value]
  Object.assign(plan, JSON.parse(JSON.stringify(s?.plan ?? defaultPlan())))
  note.value = s?.note ?? ''
  saved.value = false
}
load()
watch(pid, () => { router.replace({ query: { patient: pid.value } }); load() })
function toggle(day, id) {
  const l = plan[day] ?? (plan[day] = [])
  const i = l.indexOf(id)
  i === -1 ? l.push(id) : l.splice(i, 1)
  saved.value = false
}
function save() {
  // TODO (Backend): PUT /patients/:id/plan
  session.patientPlans[pid.value] = { plan: JSON.parse(JSON.stringify(plan)), note: note.value }
  saved.value = true
}
</script>

<template>
  <PageHeader title="Training plan" subtitle="Choose weekly exercises and write recommendations." />
  <label class="sel"><span>Patient</span>
    <select v-model="pid"><option v-for="p in patients" :key="p.id" :value="p.id">{{ p.name }} ({{ p.track }})</option></select>
  </label>
  <section class="panel table-wrap">
    <table class="table">
      <thead><tr><th>Day</th><th v-for="e in exercises" :key="e.id">{{ e.title }}</th></tr></thead>
      <tbody>
        <tr v-for="d in DAYS" :key="d">
          <th>{{ d }}</th>
          <td v-for="e in exercises" :key="e.id"><input type="checkbox" :checked="plan[d]?.includes(e.id)" :aria-label="`${e.title} on ${d}`" @change="toggle(d, e.id)" /></td>
        </tr>
      </tbody>
    </table>
  </section>
  <label class="note"><span>Notes and recommendations</span><textarea v-model="note" rows="4" placeholder="What should this patient focus on this week?" @input="saved = false" /></label>
  <div class="row"><button class="pill" @click="save">Save plan</button><span v-if="saved" class="tag good" role="status">Plan saved</span></div>
</template>

<style scoped>
.sel, .note { display: flex; flex-direction: column; gap: 6px; font-weight: 700; margin-bottom: 20px; max-width: 520px; }
.note { max-width: none; margin-top: 20px; }
select, textarea { font: inherit; padding: 12px 14px; border-radius: 14px; border: 2px solid var(--line); background: #fff; }
td { text-align: center; }
input[type='checkbox'] { width: 20px; height: 20px; accent-color: var(--brand); }
</style>
