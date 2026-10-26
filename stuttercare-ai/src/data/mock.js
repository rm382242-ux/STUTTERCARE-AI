// Demo data. Replace with Backend API calls (Exercises, Plans, Results modules).
export const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
export const todayName = () => DAYS[new Date().getDay()]
export const todayKey = () => new Date().toISOString().slice(0, 10)
export const fmtDate = (iso) => new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })

export const exercises = [
  { id: 'easy-onset', title: 'Easy onset', type: 'Fluency shaping', minutes: 4, level: 'Beginner', tracks: ['kids', 'adults'], goal: 'Start each word with a soft, relaxed breath.', steps: ['Take a slow breath in.', 'Let the air out gently as you start the word.', 'Stretch the first sound a little, like "mmmilk".', 'Pause, then read the next phrase.'], phrases: ['My name is...', 'Good morning', 'I would like some water', 'Can you help me please'] },
  { id: 'slow-rate', title: 'Slow and steady', type: 'Speech rate', minutes: 5, level: 'Beginner', tracks: ['kids', 'adults'], goal: 'Speak at a calm pace and keep it even.', steps: ['Read the sentence once silently.', 'Say it about half as fast as usual.', 'Keep the same pace until the end.'], phrases: ['The sun is warm today', 'I walk to school with my friend', 'Please pass me the blue book'] },
  { id: 'smart-pauses', title: 'Smart pauses', type: 'Phrasing', minutes: 5, level: 'Intermediate', tracks: ['kids', 'adults'], goal: 'Break speech into short phrases and pause between them.', steps: ['Look at where the slashes are.', 'Say one phrase, then pause and breathe.', 'Continue with the next phrase.'], phrases: ['Yesterday / I went to the market / with my sister', 'First / we made tea / then we talked'] },
  { id: 'light-contact', title: 'Light contact', type: 'Fluency shaping', minutes: 4, level: 'Intermediate', tracks: ['adults'], goal: 'Touch sounds lightly instead of pressing on them.', steps: ['Say the first sound with very little tension.', 'Glide into the rest of the word.', 'Notice any tight muscles and relax them.'], phrases: ['Please call me back', 'Table for two', 'Could you repeat that'] },
  { id: 'story-time', title: 'Story time', type: 'Conversation', minutes: 6, level: 'Intermediate', tracks: ['adults', 'kids'], goal: 'Tell a short story using easy onset and pauses.', steps: ['Pick a story: your day, a trip, or a movie.', 'Speak for about one minute.', 'Use pauses between ideas.'], phrases: ['Tell us about your weekend'] },
  { id: 'animal-echo', title: 'Animal echo', type: 'Play', minutes: 3, level: 'Beginner', tracks: ['kids'], goal: 'Say animal words slowly and softly.', steps: ['Listen to the animal name.', 'Say it slowly with a soft start.', 'Say it again like an echo.'], phrases: ['cat', 'rabbit', 'elephant', 'butterfly'] }
]
export const exerciseTitle = (id) => exercises.find((e) => e.id === id)?.title ?? simulations.find((s) => 'sim-' + s.id === id)?.title ?? 'Free practice'
export const defaultPlan = () => ({ Sun: ['easy-onset', 'slow-rate'], Mon: ['smart-pauses'], Tue: ['easy-onset', 'story-time'], Wed: ['slow-rate'], Thu: ['smart-pauses', 'light-contact'], Fri: ['easy-onset'], Sat: [] })

export function analyzeRecording(seconds) {
  // TODO (AI service): send the recording to the Backend and use the model's real output.
  const r = (n) => { const x = Math.sin(seconds * 12.9898 + n * 78.233) * 43758.5453; return x - Math.floor(x) }
  const wpm = Math.round(95 + r(1) * 55)
  const pauses = Math.round(r(2) * 6) + 1
  const repetitions = Math.round(r(3) * 5)
  const score = Math.max(40, Math.min(96, Math.round(92 - pauses * 2.5 - repetitions * 3 + r(4) * 8)))
  return { wpm, pauses, repetitions, score }
}

const seedScores = [48, 55, 58, 57, 64, 68, 71]
export const seedResults = () => seedScores.map((score, i) => ({
  id: 'seed' + i, exerciseId: exercises[i % 4].id, score, wpm: 150 - i * 6, pauses: 7 - Math.floor(i / 2), repetitions: 5 - Math.floor(i / 2), duration: 20 + i,
  date: new Date(Date.now() - (seedScores.length - i) * 864e5).toISOString()
}))
export const seedNotifications = () => [
  { id: 1, title: "Time for today's practice", text: 'Your exercises for today are waiting.', time: 'Today, 9:00', read: false },
  { id: 2, title: 'New note from your therapist', text: 'Dr. Salma left feedback on your last session.', time: 'Yesterday', read: false },
  { id: 3, title: 'Weekly report ready', text: 'See how your week went in Reports.', time: 'Mon', read: true }
]
export const seedFeedback = () => [
  { id: 1, from: 'Dr. Salma', date: new Date(Date.now() - 2 * 864e5).toISOString(), text: 'Nice progress with easy onset. Keep the first sound soft, and take one full breath before long sentences.' },
  { id: 2, from: 'Dr. Salma', date: new Date(Date.now() - 9 * 864e5).toISOString(), text: 'Please practice smart pauses three times this week. Do not worry about perfect scores.' }
]

export const patients = [
  { id: 'p1', name: 'Omar K.', track: 'adults', age: 24, adherence: 82, scores: [52, 58, 61, 60, 67, 72] },
  { id: 'p2', name: 'Lina A.', track: 'kids', age: 8, adherence: 91, scores: [45, 50, 56, 63, 66, 74] },
  { id: 'p3', name: 'Youssef M.', track: 'adults', age: 31, adherence: 54, scores: [64, 62, 66, 61, 63, 62] },
  { id: 'p4', name: 'Nour S.', track: 'kids', age: 10, adherence: 70, scores: [40, 47, 49, 55, 58, 60] }
]
export const appointments = [
  { id: 1, who: 'Omar K.', when: 'Today, 4:00 PM' }, { id: 2, who: 'Lina A.', when: 'Tomorrow, 5:30 PM' }, { id: 3, who: 'Nour S.', when: 'Thu, 6:00 PM' }
]
export const games = [
  { id: 'balloons', title: 'Pop the balloons', desc: 'Say each word slowly to pop a balloon.', words: ['sun', 'banana', 'rainbow', 'puppy', 'train'] },
  { id: 'rocket', title: 'Rocket launch', desc: 'Count down softly: start every number gently.', words: ['five', 'four', 'three', 'two', 'one'] },
  { id: 'echo', title: 'Echo cave', desc: 'Say the phrase, then echo it quietly.', words: ['hello friend', 'good night', 'let us play', 'thank you'] }
]
export const badges = [{ at: 5, name: 'First steps' }, { at: 15, name: 'Steady voice' }, { at: 30, name: 'Brave speaker' }, { at: 60, name: 'Star of the day' }]
export const simulations = [
  { id: 'interview', title: 'Job interview', lines: [{ who: 'Interviewer', text: 'Hello! Please tell me a bit about yourself.' }, { who: 'You', text: 'Start slowly: "My name is... and I work in..."' }, { who: 'Interviewer', text: 'Why do you want this job?' }, { who: 'You', text: 'Pause after each idea. Use easy onset.' }] },
  { id: 'phone', title: 'Phone call', lines: [{ who: 'Receptionist', text: 'Good morning, how can I help you?' }, { who: 'You', text: 'Breathe, then: "I would like to book an appointment."' }, { who: 'Receptionist', text: 'What day works for you?' }, { who: 'You', text: 'Say the day with a light first sound.' }] },
  { id: 'food', title: 'Ordering food', lines: [{ who: 'Waiter', text: 'Welcome! What would you like?' }, { who: 'You', text: 'Take your time: "I would like the chicken, please."' }, { who: 'Waiter', text: 'Anything to drink?' }, { who: 'You', text: 'Pause, then answer in a short phrase.' }] }
]
