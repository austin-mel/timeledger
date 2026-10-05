<script setup lang="ts">
import { useRouter } from 'vue-router'
import { AppHeader, LoginForm } from '@/components'

const router = useRouter()
</script>

<template>
  <AppHeader />
  <main class="flex flex-1 items-center justify-center px-5 py-14 sm:px-10 sm:py-20">
    <LoginForm @login="router.push('/dashboard')" />
  </main>
</template>
