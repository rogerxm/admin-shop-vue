<template>
  <FullScreenLoader v-if="authStore.isChecking" />
  <RouterView v-else />

  <VueQueryDevtools />
</template>

<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
import { useAuthStore } from './stores/auth.store';
import { useRoute, useRouter } from 'vue-router';
import { AuthStatus } from './modules/auth/interfaces';
import FullScreenLoader from './modules/common/componentes/FullScreenLoader.vue';

const authStore = useAuthStore();

const router = useRouter();
const route = useRoute();

authStore.$subscribe(
  (_, state) => {
    if (state.authStatus === AuthStatus.Checking) {
      authStore.checkAuthStatus();

      return;
    }

    if (route.path.includes('/auth') && state.authStatus === AuthStatus.Authenticated) {
      router.replace({ name: 'Home' });

      return;
    }
  },
  { immediate: true },
);
</script>
