export default defineNuxtRouteMiddleware(async (to, from) => {
    const auth = useAuth();

    const publicPages = ["/auth/login", "/auth/register", "/"];
    console.log(auth.isAuthenticated);

    try {
        await auth.checkAuth();
    } catch {
        auth.isAuthenticated = false;
        return navigateTo("/auth/login");
    }

    if (publicPages.includes(to.path)) {
        if (auth.isAuthenticated && (to.path === "/auth/login" || to.path === "/auth/register")) {
            return navigateTo("/dashboard");
        }
        return;
    }
});
