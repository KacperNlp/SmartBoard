import type { User } from "@/types/index";

export const useAuth = defineStore("auth", () => {
    const isAuthenticated = ref(false);
    const user = ref<User | null>(null);
    const isLoading = ref(false);

    const checkAuth = async () => {
        try {
            isLoading.value = true;
            const response = await $fetch("/api/auth/me");

            isAuthenticated.value = true;
            user.value = response.user;
        } catch (err) {
            if (err.status === 401 || err.status === 403) {
                await logout();
            } else {
                isAuthenticated.value = false;
                user.value = null;
                console.error("Network server error during auth checking");
            }
        } finally {
            isLoading.value = false;
        }
    };

    const login = async (credentials: { email: string; password: string }) => {
        isLoading.value = true;

        try {
            const response = await $fetch("/api/auth/login", {
                method: "POST",
                body: credentials,
            });
            isAuthenticated.value = true;
            user.value = response.user;
            return response;
        } catch (err) {
            isAuthenticated.value = false;
            user.value = null;
        } finally {
            isLoading.value = false;
        }
    };

    const logout = async () => {
        isLoading.value = true;

        try {
            await $fetch("/api/auth/logout", {
                method: "POST",
            });
        } catch (err) {
            throw err;
        } finally {
            isAuthenticated.value = false;
            user.value = null;
            isLoading.value = false;
        }
    };

    return { isAuthenticated, user, isLoading, checkAuth, login, logout };
});
