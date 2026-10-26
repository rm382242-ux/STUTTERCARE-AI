import { createRouter, createWebHistory } from 'vue-router'
import { session, homeFor } from '../stores/session'

const all = ['patient', 'parent', 'therapist']
const views = import.meta.glob('../views/**/*.vue')
const page = (path, file, roles, extra = {}) => ({ path, component: views[`../views/${file}.vue`], meta: { roles, ...extra } })

const routes = [
  { path: '/', name: 'splash', component: () => import('../views/auth/SplashView.vue') }, // 1
  { path: '/', component: () => import('../layouts/PublicLayout.vue'), children: [{ path: 'welcome', name: 'welcome', component: () => import('../views/auth/WelcomeView.vue') }] }, // 2
  {
    path: '/', component: () => import('../layouts/AuthLayout.vue'),
    children: [
      { path: 'register', name: 'register', component: () => import('../views/auth/RegisterView.vue') }, // 3
      { path: 'login', name: 'login', component: () => import('../views/auth/LoginView.vue') }, // 4
      page('track', 'auth/TrackSelectionView', all, { wide: true }), // 5
      page('profile', 'auth/CompleteProfileView', all) // 6
    ]
  },
  {
    path: '/app', component: () => import('../layouts/AppLayout.vue'),
    children: [
      page('home', 'patient/PatientHomeView', ['patient']), // 7
      page('exercises', 'patient/DailyExercisesView', ['patient']), // 8
      page('exercises/:id', 'patient/ExerciseDetailsView', ['patient']), // 9
      page('record/:id', 'patient/SpeechRecordingView', ['patient']), // 10
      page('results/:id', 'patient/AIResultsView', ['patient']), // 11
      page('progress', 'patient/ProgressTrackingView', ['patient']), // 12
      page('reports', 'patient/PerformanceReportsView', ['patient']), // 13
      page('plan', 'patient/WeeklyPlanView', ['patient']), // 14
      page('feedback', 'patient/TherapistFeedbackView', ['patient']), // 15
      page('notifications', 'patient/NotificationsView', all), // 16
      page('games', 'patient/KidsGamesView', ['patient']), // 17
      page('rewards', 'patient/KidsRewardsView', ['patient']), // 18
      page('simulations', 'patient/AdultsSimulationsView', ['patient']), // 19
      page('parent', 'parent/ParentDashboardView', ['parent']), // 20
      page('child', 'parent/ChildProgressView', ['parent']), // 21
      page('therapist', 'therapist/TherapistDashboardView', ['therapist']), // 22
      page('patients/:id', 'therapist/PatientReportsView', ['therapist']), // 23
      page('plans', 'therapist/TrainingPlanView', ['therapist']) // 24
    ]
  },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({ history: createWebHistory(), routes, scrollBehavior: () => ({ top: 0 }) })

router.beforeEach((to) => {
  const roles = to.meta.roles
  if (!roles) return
  if (!session.user) return { name: 'login' }
  if (!roles.includes(session.user.role)) return homeFor(session.user)
})

export default router
