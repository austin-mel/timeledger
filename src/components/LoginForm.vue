<script setup lang="ts">
const emit = defineEmits<{
  login: []
}>()
</script>

<template>
  <section
    aria-labelledby="login-title"
    class="w-full max-w-md space-y-7 rounded-2xl border border-slate-green/25 bg-lavender-mist p-7 shadow-xl shadow-charcoal-blue/15 sm:p-10"
  >
    <h2 id="login-title" class="text-2xl font-semibold tracking-tight text-deep-pine">Login</h2>

    <div class="space-y-2">
      <label for="email" class="block text-sm font-medium text-deep-pine">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        autocomplete="email"
        placeholder="you@example.com"
        class="w-full rounded-lg border border-slate-green/25 bg-white/50 px-4 py-3 text-base text-ink outline-none placeholder:text-slate-green focus:border-forest-green focus:ring-4 focus:ring-forest-green/10 motion-safe:transition"
      />
    </div>

    <div class="space-y-2">
      <label for="password" class="block text-sm font-medium text-deep-pine">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        autocomplete="current-password"
        placeholder="Enter your password"
        class="w-full rounded-lg border border-slate-green/25 bg-white/50 px-4 py-3 text-base text-ink outline-none placeholder:text-slate-green focus:border-forest-green focus:ring-4 focus:ring-forest-green/10 motion-safe:transition"
      />
    </div>

    <button
      type="button"
      class="w-full cursor-pointer rounded-lg bg-forest-green px-4 py-3 text-base font-semibold text-lavender-mist shadow-sm shadow-deep-pine/10 hover:bg-deep-pine focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest-green motion-safe:transition-colors"
      @click="emit('login')"
    >
      Login
    </button>
  </section>
</template>
