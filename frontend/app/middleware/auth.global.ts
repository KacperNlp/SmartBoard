export default defineNuxtRouteMiddleware(async (to, from) => {
    const auth = useAuth();

    const publicPages = ["/auth/login", "/auth/register", "/"];
    console.log(auth.isAuthenticated);

    if (publicPages.includes(to.path)) {
        if (auth.isAuthenticated && (to.path === "/auth/login" || to.path === "/auth/register")) {
            return navigateTo("/dashboard");
        }
        return;
    }

    try {
        await $fetch("/api/auth/me");
        return;
    } catch {
        auth.isAuthenticated = false;
        return navigateTo("/auth/login");
    }
});
