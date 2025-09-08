export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();

    try {
        const accessToken = getCookie(event, "access-token");
        if (accessToken) {
            try {
                await $fetch(`${config.public.apiUrl}/auth/logout`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                });
            } catch (error) {
                throw createError({
                    statusCode: 401,
                    statusMessage: "Invalid or expired token",
                });
            }
        }

        deleteCookie(event, "access-token", {
            path: "/",
            sameSite: "strict",
            secure: true,
        });

        deleteCookie(event, "refresh-token", {
            path: "/auth/refresh",
            sameSite: "strict",
            secure: true,
        });

        return {
            message: "Logged out successfully",
        };
    } catch (error) {
        throw createError({
            statusCode: 400,
            statusMessage: "Failed to logout",
        });
    }
});
