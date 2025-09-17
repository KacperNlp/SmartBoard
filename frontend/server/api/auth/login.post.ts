import type { Response } from "./types";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const config = useRuntimeConfig();

    try {
        const response = await $fetch<Response>(`${config.public.apiUrl}/auth/login`, {
            method: "POST",
            body,
            headers: {
                "Content-Type": "application/json",
            },
        });

        setCookie(event, "refresh-token", response.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 30 * 24 * 60 * 60 * 1000,
            sameSite: "strict",
            path: "/",
        });

        setCookie(event, "access-token", response.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 15 * 60 * 1000,
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
