import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { AuthStatus, type User } from '@/modules/auth/interfaces';
import { checkAuthAction, loginAction, registerAction } from '@/modules/auth/actions';
import { useLocalStorage } from '@vueuse/core';

export const useAuthStore = defineStore('auth', () => {
  const authStatus = ref(AuthStatus.Checking);
  const user = ref<User | undefined>();
  const token = ref(useLocalStorage('token', ''));

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

  const register = async (fullName: string, email: string, password: string) => {
    try {
      const response = await registerAction(fullName, email, password);

      if (!response.ok) {
        logout();
        return {
          ok: false,
          message: response.message,
        };
      }

      user.value = response.user;
      token.value = response.token;
      authStatus.value = AuthStatus.Authenticated;

      return {
        ok: true,
        message: 'User registered successfully.',
      };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        message: 'An error occurred while registering the user.',
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');

    authStatus.value = AuthStatus.Unauthenticated;
    user.value = undefined;
    token.value = '';
    return false;
  };

  const checkAuthStatus = async (): Promise<boolean> => {
    try {
      const response = await checkAuthAction();

      if (!response.ok) {
        logout();

        return false;
      }

      authStatus.value = AuthStatus.Authenticated;
      user.value = response.user;
      token.value = response.token;

      return true;
    } catch (error) {
      logout();
      return false;
    }
  };

  return {
    authStatus,
    user,
    token,

    // getters
    isChecking: computed(() => authStatus.value === AuthStatus.Checking),
    isAuthenticated: computed(() => authStatus.value === AuthStatus.Authenticated),
    isAdmin: computed(() => user.value?.roles.includes('admin') ?? false),
    username: computed(() => user.value?.fullName),

    // actions
    login,
    register,
    logout,
    checkAuthStatus,
  };
});
