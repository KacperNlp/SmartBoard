export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const config = useRuntimeConfig();

    try {
        const response = await $fetch(`${config.public.apiUrl}/auth/login`, {
            method: "POST",
            body,
            headers: {
                "Content-Type": "application/json",
            },
        });

        setCookie(event, "access-token", response.token, {
            httpOnly: true,
            secure: true,
            maxAge: 60 * 15,
            sameSite: "strict",
            path: "/",
        });

        setCookie(event, "refresh-token", response.refreshToken, {
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60 * 24 * 30,
            sameSite: "strict",
            path: "/",
        });

        return {
            message: "Login successful",
            user: response.user,
        };
    } catch (error) {
        throw createError({
            statusCode: 400,
            statusMessage: "Failed to login",
            data: error,
        });
    }
});
