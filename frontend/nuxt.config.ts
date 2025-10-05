// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2025-07-15",
    devtools: { enabled: true },
    modules: ["@nuxt/ui", "@nuxt/fonts", "@pinia/nuxt", "nuxt-charts", "@nuxtjs/i18n"],

    css: ["~/assets/css/main.css"],

    runtimeConfig: {
        public: {
            apiUrl: process.env.API_URL || "http://localhost:8000",
        },
    },

    i18n: {
        defaultLocale: "pl",
        locales: [
            { code: "pl", name: "Polski", language: "pl-PL", file: "pl.json" },
            { code: "en", name: "English", language: "en-US", file: "en.json" },
        ],
    },
});
