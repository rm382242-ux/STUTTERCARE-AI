<script setup>
import WaveMark from '../../components/WaveMark.vue'

const steps = [
  { t: 'Create your account', d: 'Choose Kids or Adults and finish a short profile.' },
  { t: 'Practice every day', d: 'Short guided exercises set by you and your therapist.' },
  { t: 'Record and get feedback', d: 'The AI finds pauses, repetitions and speech rate in seconds.' },
  { t: 'Your therapist adjusts the plan', d: 'Results are shared with the people you approve.' }
]
const measures = [
  { t: 'Pauses', d: 'Long gaps in speech, counted per recording.' },
  { t: 'Repetitions', d: 'Repeated sounds or words, so you can see them dropping over time.' },
  { t: 'Speech rate', d: 'Words per minute, to help you keep a calm, even pace.' }
]
const faq = [
  { q: 'Does the AI diagnose stuttering?', a: 'No. Results are practice feedback. A qualified speech therapist makes clinical decisions.' },
  { q: 'Who can see my results?', a: 'Only you, plus the parent or therapist linked to your account.' },
  { q: 'Do I need two apps for kids and adults?', a: 'No. One app, with content and games that change by track.' },
  { q: 'What if the AI makes a mistake?', a: 'It can. Treat numbers as a guide, and talk to your therapist about anything that looks off.' }
]
</script>

<template>
  <main>
    <section class="hero">
      <div class="container heroGrid">
        <div class="stack copy">
          <span class="tag">Kids and adults</span>
          <h1>Speech practice that fits your voice.</h1>
          <p class="lead">Guided daily exercises, instant feedback on pauses, repetitions and speech rate, and a speech therapist who stays in the loop.</p>
          <div class="row">
            <RouterLink to="/register" class="pill">Get started</RouterLink>
            <RouterLink to="/login" class="pill ghost">Log in</RouterLink>
          </div>
        </div>
        <div class="art" aria-hidden="true">
          <WaveMark fluent :size="160" />
          <div class="float f1"><small>Speech rate</small><strong>112 wpm</strong></div>
          <div class="float f2"><small>Pauses</small><strong>3 this session</strong></div>
          <div class="float f3"><small>Sample data</small><strong>Score 74</strong></div>
        </div>
      </div>
    </section>

    <section class="container block">
      <h2>One app, two tracks</h2>
      <div class="cards-2 tracks">
        <div class="panel kids"><h3>Kids</h3><p>Voice games, stars and badges. Parents follow progress from their own dashboard.</p></div>
        <div class="panel adults"><h3>Adults</h3><p>Real-life rehearsal: job interviews, phone calls and ordering food.</p></div>
      </div>
    </section>

    <section id="how" class="container block">
      <h2>How it works</h2>
      <div class="grid-4">
        <div v-for="(s, i) in steps" :key="s.t" class="panel soft">
          <span class="num">{{ i + 1 }}</span><h3>{{ s.t }}</h3><p class="muted">{{ s.d }}</p>
        </div>
      </div>
    </section>

    <section id="measure" class="container block">
      <h2>What we measure</h2>
      <div class="grid-3">
        <div v-for="m in measures" :key="m.t" class="panel"><h3>{{ m.t }}</h3><p class="muted">{{ m.d }}</p></div>
      </div>
      <p class="notice">AI results are practice feedback, not a medical diagnosis. The app supports a qualified speech therapist and does not replace one.</p>
    </section>

    <section id="faq" class="container block narrow">
      <h2>Questions</h2>
      <details v-for="f in faq" :key="f.q" class="panel q"><summary>{{ f.q }}</summary><p class="muted">{{ f.a }}</p></details>
    </section>

    <section class="container block">
      <div class="cta">
        <h2>Ready for your first exercise?</h2>
        <RouterLink to="/register" class="pill sun">Create a free account</RouterLink>
      </div>
    </section>
  </main>
</template>

<style scoped>
.hero { background: var(--lav); padding: 64px 0 72px; border-radius: 0 0 48px 48px; }
.heroGrid { display: grid; gap: 40px; align-items: center; }
h1 { font-size: clamp(2.6rem, 6vw, 4.4rem); font-weight: 800; color: var(--brand-deep); }
.lead { font-size: 1.2rem; max-width: 520px; }
.art { position: relative; min-height: 340px; background: #fff; border-radius: 40px 90px 40px 90px; display: grid; place-items: center; }
.float { position: absolute; background: var(--lav-soft); border-radius: 18px; padding: 12px 16px; display: flex; flex-direction: column; box-shadow: 0 10px 30px rgba(42, 26, 94, .12); }
.float small { font-size: .75rem; color: #5d5580; }
.f1 { top: 22px; left: 22px; } .f2 { bottom: 26px; left: 30px; background: var(--mint); } .f3 { top: 40px; right: 22px; background: #ffe9b0; }
.block { margin-top: 84px; display: flex; flex-direction: column; gap: 24px; }
.block h2 { font-size: clamp(1.9rem, 4vw, 2.8rem); }
.tracks .panel { min-height: 200px; display: flex; flex-direction: column; justify-content: flex-end; gap: 8px; border: 0; }
.kids { background: var(--sun); border-top-left-radius: 70px; } .adults { background: var(--brand); color: #fff; border-bottom-right-radius: 70px; }
.num { display: inline-grid; place-items: center; width: 36px; height: 36px; border-radius: 50%; background: var(--brand); color: #fff; font-weight: 800; margin-bottom: 10px; }
.narrow { max-width: 760px; } .q { padding: 18px 22px; } .q summary { font-weight: 700; cursor: pointer; } .q p { margin-top: 10px; }
.cta { background: var(--brand-deep); color: #fff; border-radius: 40px; padding: 48px 28px; display: flex; flex-direction: column; align-items: center; gap: 20px; text-align: center; }
@media (min-width: 900px) { .heroGrid { grid-template-columns: 1.1fr 1fr; } }
</style>
