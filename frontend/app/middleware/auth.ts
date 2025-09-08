export default defineNuxtRouteMiddleware(async (to, from) => {
    const auth = useAuth();

    if (auth.isAuthenticated) {
        try {
            await auth.checkAuth();
            return;
        } catch (err) {
            console.error(err);
        }
    }

    return navigateTo("/auth/login");
});
