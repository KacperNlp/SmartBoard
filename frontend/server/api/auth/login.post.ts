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
