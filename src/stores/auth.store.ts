import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { AuthStatus, type User } from '@/modules/auth/interfaces';
import { loginAction } from '@/modules/auth/actions';

export const useAuthStore = defineStore('auth', () => {
  const authStatus = ref(AuthStatus.Checking);
  const user = ref<User | undefined>();
  const token = ref('');

  const login = async (email: string, password: string) => {
    try {
      const response = await loginAction(email, password);

      if (!response.ok) {
        logout();
        return false;
      }

      user.value = response.user;
      token.value = response.token;
      authStatus.value = AuthStatus.Authenticated;

      return true;
    } catch (error) {
      return logout();
    }
  };

  const logout = () => {
    authStatus.value = AuthStatus.Unauthenticated;
    user.value = undefined;
    token.value = '';
    return false;
  };

  return {
    authStatus,
    user,
    token,

    // getters
    isChecking: computed(() => authStatus.value === AuthStatus.Checking),
    isAuthenticated: computed(() => authStatus.value === AuthStatus.Authenticated),
    username: computed(() => user.value?.fullName),

    // actions
    login,
  };
});
