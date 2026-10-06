<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { AdminSidebar } from '@/components'
import { useDemoSession } from '@/composables/useDemoSession'

const route = useRoute()
const { isAdmin } = useDemoSession()
const showAdminSidebar = computed(() => isAdmin.value && route.name !== 'login')
</script>

<template>
  <div class="flex min-h-svh flex-col bg-lavender-mist font-sans text-ink antialiased">
    <AdminSidebar v-if="showAdminSidebar" />
    <div class="flex min-h-svh min-w-0 flex-1 flex-col" :class="{ 'pl-20 md:pl-60': showAdminSidebar }">
      <RouterView />
    </div>
  </div>
</template>
