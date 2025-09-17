export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();

    console.log("Logout");
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
                console.error("Network server error during logout");
            }
        }

        deleteCookie(event, "access-token", {
            path: "/",
            sameSite: "strict",
            secure: true,
        });

        deleteCookie(event, "refresh-token", {
            path: "/",
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
