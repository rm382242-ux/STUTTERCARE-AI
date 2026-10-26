<template>
  <header class="nav">
    <div class="container bar">
      <RouterLink to="/welcome" class="logo">StutterCare AI</RouterLink>
      <nav class="links">
        <a href="#how">How it works</a><a href="#measure">What we measure</a><a href="#faq">Questions</a>
      </nav>
      <div class="row">
        <RouterLink to="/login" class="pill ghost small">Log in</RouterLink>
        <RouterLink to="/register" class="pill small">Get started</RouterLink>
      </div>
    </div>
  </header>
  <RouterView />
  <footer class="foot">
    <div class="container">
      <strong>StutterCare AI</strong>
      <p>Speech practice for children and adults who stutter. Feedback is for practice and does not replace a qualified speech therapist.</p>
    </div>
  </footer>
</template>

<style scoped>
.nav { position: sticky; top: 0; z-index: 10; background: rgba(255, 255, 255, .92); backdrop-filter: blur(8px); border-bottom: 1px solid var(--line); }
.bar { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 12px 0; }
.logo { font: 800 1.3rem var(--font-display); text-decoration: none; color: var(--brand-deep); }
.links { display: none; gap: 28px; font-weight: 700; }
.links a { text-decoration: none; }
.links a:hover { color: var(--brand); }
.foot { background: var(--brand-deep); color: #e9e2ff; padding: 40px 0; margin-top: 80px; }
.foot p { margin-top: 8px; max-width: 560px; opacity: .85; }
@media (min-width: 800px) { .links { display: flex; } }
</style>
