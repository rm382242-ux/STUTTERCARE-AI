import { reactive, computed, watch } from 'vue'
import { seedResults, seedNotifications, seedFeedback, defaultPlan, todayKey } from '../data/mock'

const KEY = 'stuttercare-v1'
const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) } catch { return null } }

// In-memory state saved to localStorage for the demo. Replace with Backend API calls (Group 3).
export const session = reactive({
  user: null, track: null, stars: 0, done: {}, results: seedResults(), notifications: seedNotifications(),
  feedback: seedFeedback(), plan: defaultPlan(), patientPlans: {}, ...(load() ?? {})
})
watch(session, (v) => { try { localStorage.setItem(KEY, JSON.stringify(v)) } catch { /* storage unavailable */ } }, { deep: true })

export const unread = computed(() => session.notifications.filter((n) => !n.read).length)

export const homeFor = (user) => ({ parent: '/app/parent', therapist: '/app/therapist' }[user?.role] ?? '/app/home')
export const signIn = (user) => { session.user = { role: 'patient', ...user } }
export const chooseTrack = (track) => { session.track = track }
export const saveProfile = (profile) => { session.user = { ...session.user, profile } }
export const signOut = () => { session.user = null }
export const isDone = (exId) => !!session.done[todayKey() + ':' + exId]
export const markDone = (exId) => { session.done[todayKey() + ':' + exId] = true }
export const addStars = (n) => { session.stars += n }
export const markAllRead = () => session.notifications.forEach((n) => (n.read = true))
export function addResult(r) {
  const id = 'r' + Date.now()
  session.results.push({ id, date: new Date().toISOString(), ...r })
  return id
}
