export const useAuth = defineStore("auth", () => {
    const user = ref(null);

    return { user };
});
