<script setup lang="ts">
import { ref } from 'vue'
import { demoProfiles, type DemoProfile } from '@/data/demoProfiles'
import { useDemoSession } from '@/composables/useDemoSession'

const emit = defineEmits<{
  login: []
}>()

const { login } = useDemoSession()
const email = ref('')
const password = ref('')
const error = ref('')

function fillProfile(profile: DemoProfile) {
  email.value = profile.email
  password.value = profile.password
  error.value = ''
}

function submit() {
  if (!login(email.value, password.value)) {
    error.value = 'Email or password is incorrect. Try one of the demo profiles below.'
    return
  }
  error.value = ''
  emit('login')
}
</script>

<template>
  <form
    aria-labelledby="login-title"
    class="w-full max-w-md space-y-7 rounded-2xl border border-slate-green/25 bg-lavender-mist p-7 shadow-xl shadow-charcoal-blue/15 sm:p-10"
    @submit.prevent="submit"
    @input="error = ''"
  >
    <h2 id="login-title" class="text-2xl font-semibold tracking-tight text-deep-pine">Login</h2>

    <div class="space-y-2">
      <label for="email" class="block text-sm font-medium text-deep-pine">Email</label>
      <input
        id="email"
        v-model="email"
        name="email"
        type="email"
        required
        :aria-invalid="Boolean(error)"
        :aria-describedby="error ? 'login-error' : undefined"
        autocomplete="email"
        placeholder="you@example.com"
        class="w-full rounded-lg border border-slate-green/25 bg-white/50 px-4 py-3 text-base text-ink outline-none placeholder:text-slate-green focus:border-forest-green focus:ring-4 focus:ring-forest-green/10 motion-safe:transition"
      />
    </div>

    <div class="space-y-2">
      <label for="password" class="block text-sm font-medium text-deep-pine">Password</label>
      <input
        id="password"
        v-model="password"
        name="password"
        type="password"
        required
        :aria-invalid="Boolean(error)"
        :aria-describedby="error ? 'login-error' : undefined"
        autocomplete="current-password"
        placeholder="Enter your password"
        class="w-full rounded-lg border border-slate-green/25 bg-white/50 px-4 py-3 text-base text-ink outline-none placeholder:text-slate-green focus:border-forest-green focus:ring-4 focus:ring-forest-green/10 motion-safe:transition"
      />
    </div>

    <p v-if="error" id="login-error" role="alert" class="text-sm text-red-700">{{ error }}</p>

    <button
      type="submit"
      class="w-full cursor-pointer rounded-lg bg-forest-green px-4 py-3 text-base font-semibold text-lavender-mist shadow-sm shadow-deep-pine/10 hover:bg-deep-pine focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest-green motion-safe:transition-colors"
    >
      Login
    </button>
    <section aria-labelledby="demo-profiles-title" class="border-t border-slate-green/20 pt-6">
      <h3 id="demo-profiles-title" class="text-sm font-semibold text-deep-pine">Demo profiles</h3>
      <p class="mt-1 text-xs leading-relaxed text-slate-green">Choose a profile to fill in the login fields.</p>
      <div class="mt-3 grid gap-2">
        <button
          v-for="profile in demoProfiles"
          :key="profile.id"
          type="button"
          class="cursor-pointer rounded-lg border border-slate-green/20 bg-white/60 p-3 text-left hover:border-forest-green hover:bg-soft-sage/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-green"
          @click="fillProfile(profile)"
        >
          <span class="block text-sm font-semibold text-deep-pine">
            {{ profile.role === 'admin' ? 'Admin' : 'Regular user' }} · {{ profile.name }}
          </span>
          <span class="mt-1 block text-xs text-slate-green">{{ profile.email }}</span>
        </button>
      </div>
      <p class="mt-3 text-xs text-slate-green">Demo password for both profiles: <code class="font-semibold text-deep-pine">demo123</code></p>
    </section>
  </form>
</template>
