export default defineEventHandler(async (event) => {
    const accessToken = getCookie(event, "access-token");
    const config = useRuntimeConfig();

    if (!accessToken) {
        throw createError({
            statusCode: 401,
            statusMessage: "No access token found",
        });
    }

    try {
        const response = await $fetch(`${config.public.apiUrl}/auth/me`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        });

        return {
            user: response.user,
            message: "User authenticated",
        };
    } catch (error) {
        throw createError({
            statusCode: 401,
            statusMessage: "Invalid or expired token",
        });
    }
});
