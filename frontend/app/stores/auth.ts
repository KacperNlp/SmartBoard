export const useAuth = defineStore("auth", () => {
    const isAuthenticated = ref(false);

    return { isAuthenticated };
});
