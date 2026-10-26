# StutterCare AI (Vue 3)

AI-assisted speech practice for children and adults who stutter, with parent and speech-therapist roles.
AI results are practice feedback, not a medical diagnosis.

## Run
```bash
npm install
npm run dev
```
Demo: on the Login page pick Patient, Parent or Therapist (any email and password). Data is saved in the browser (localStorage).

## Structure
```
src/
  router/     routes (24 pages) + role guards
  stores/     session state: user, track, results, plan, notifications
  data/       demo data + placeholder analyzeRecording() (replace with the AI service)
  styles/     design tokens + global classes
  layouts/    PublicLayout (landing), AuthLayout, AppLayout (sidebar per role)
  components/ WaveMark, ScoreRing, LineChart, StatCard, PageHeader, AppButton, TextField
  views/auth/       1 Splash, 2 Welcome, 3 Register, 4 Login, 5 Track Selection, 6 Complete Profile
  views/patient/    7 Home, 8 Daily Exercises, 9 Exercise Details, 10 Speech Recording, 11 AI Results,
                    12 Progress, 13 Reports, 14 Weekly Plan, 15 Therapist Feedback, 16 Notifications,
                    17 Kids Games, 18 Kids Rewards, 19 Adults Simulations
  views/parent/     20 Parent Dashboard, 21 Child Progress
  views/therapist/  22 Therapist Dashboard, 23 Patient Reports, 24 Training Plan Management
```

## Connecting the Backend
Look for `TODO (Backend)` and `TODO (AI service)` comments: login/register, recording upload, analysis results, plans.
