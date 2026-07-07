import { useAuthStore } from '@/stores/auth.store';
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { AuthStatus } from '../interfaces';

const isNotAuthenticatedGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const authStore = useAuthStore();

  await authStore.checkAuthStatus();

  authStore.authStatus === AuthStatus.Authenticated ? next({ name: 'Home' }) : next();
};

export default isNotAuthenticatedGuard;
