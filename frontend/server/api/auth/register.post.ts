export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const config = useRuntimeConfig();

    try {
        const response = await $fetch(`${config.public.apiUrl}/auth/register`, {
            method: "POST",
            body,
            headers: {
                "Content-Type": "application/json",
            },
        });

        return {
            message: "Register successful",
            user: response.user,
        };
    } catch (error) {
        throw createError({
            statusCode: 400,
            statusMessage: "Failed to register",
            data: error,
        });
    }
});
