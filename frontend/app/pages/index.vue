<script setup>
const auth = useAuth();

useHead({
    title: "SmartBoard - Dashboard Inwestycyjny",
    meta: [
        {
            name: "description",
            content:
                "Zarządzaj swoim portfelem inwestycyjnym z łatwością. Śledź akcje, analizuj wyniki i podejmuj mądre decyzje inwestycyjne.",
        },
    ],
});

const navigateToAuth = () => {
    if (auth.isAuthenticated) {
        navigateTo("/dashboard");
    } else {
        navigateTo("/auth/login");
    }
};

const features = [
    {
        icon: "i-heroicons-chart-bar",
        title: "Analiza Portfela",
        description:
            "Śledź wyniki swoich inwestycji w czasie rzeczywistym z zaawansowanymi wykresami i statystykami.",
    },
    {
        icon: "i-heroicons-currency-dollar",
        title: "Zarządzanie Akcjami",
        description:
            "Dodawaj, edytuj i monitoruj swoje pozycje akcyjne w jednym, przejrzystym interfejsie.",
    },
    {
        icon: "i-heroicons-light-bulb",
        title: "Inteligentne Raporty",
        description:
            "Otrzymuj personalizowane analizy i rekomendacje oparte na Twoich celach inwestycyjnych.",
    },
];
</script>

<template>
    <div
        class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800"
    >
        <header
            class="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm"
        >
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-16">
                    <div class="flex items-center space-x-2">
                        <UIcon
                            name="i-heroicons-chart-bar-square"
                            class="w-8 h-8 text-primary-600"
                        />
                        <h1 class="text-xl font-bold text-gray-900 dark:text-white">SmartBoard</h1>
                    </div>

                    <UButton
                        @click="navigateToAuth"
                        :label="auth.isAuthenticated ? 'Dashboard' : 'Zaloguj się'"
                        :icon="
                            auth.isAuthenticated
                                ? 'i-heroicons-squares-2x2'
                                : 'i-heroicons-arrow-right-on-rectangle'
                        "
                        size="sm"
                        color="primary"
                        variant="solid"
                    />
                </div>
            </div>
        </header>

        <main>
            <section class="py-20 px-4 sm:px-6 lg:px-8">
                <div class="max-w-4xl mx-auto text-center">
                    <UBadge
                        label="Nowa wersja dostępna"
                        variant="subtle"
                        color="primary"
                        class="mb-6"
                    />

                    <h1
                        class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6"
                    >
                        Zarządzaj swoim
                        <span class="text-primary-600">portfelem inwestycyjnym</span>
                        z łatwością
                    </h1>

                    <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                        SmartBoard to nowoczesny dashboard, który pomoże Ci śledzić inwestycje,
                        analizować wyniki i podejmować mądre decyzje finansowe.
                    </p>

                    <div class="flex flex-col items-center sm:flex-row gap-4 justify-center">
                        <UButton
                            @click="navigateToAuth"
                            :label="
                                auth.isAuthenticated
                                    ? 'Przejdź do Dashboard'
                                    : 'Rozpocznij za darmo'
                            "
                            icon="i-heroicons-rocket-launch"
                            size="lg"
                            color="primary"
                            variant="solid"
                            class="px-8"
                        />
                    </div>
                </div>
            </section>

            <section class="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
                <div class="max-w-6xl mx-auto">
                    <div class="text-center mb-12">
                        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            Wszystko czego potrzebujesz w jednym miejscu
                        </h2>
                        <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Nasze narzędzia pomogą Ci lepiej zarządzać inwestycjami i osiągnąć cele
                            finansowe.
                        </p>
                    </div>

                    <div class="grid md:grid-cols-3 gap-8">
                        <UCard
                            v-for="feature in features"
                            :key="feature.title"
                            class="text-center hover:shadow-lg transition-shadow duration-300"
                        >
                            <template #header>
                                <div class="flex justify-center mb-4">
                                    <div
                                        class="p-3 bg-primary-100 dark:bg-primary-900 rounded-full"
                                    >
                                        <UIcon
                                            :name="feature.icon"
                                            class="w-8 h-8 text-primary-600"
                                        />
                                    </div>
                                </div>
                            </template>

                            <div>
                                <h3
                                    class="text-xl font-semibold text-gray-900 dark:text-white mb-3"
                                >
                                    {{ feature.title }}
                                </h3>
                                <p class="text-gray-600 dark:text-gray-300">
                                    {{ feature.description }}
                                </p>
                            </div>
                        </UCard>
                    </div>
                </div>
            </section>

            <section class="py-16 px-4 sm:px-6 lg:px-8 bg-primary-600">
                <div class="max-w-4xl mx-auto text-center">
                    <h2 class="text-3xl font-bold text-white mb-4">
                        Gotowy na lepsze zarządzanie inwestycjami?
                    </h2>
                    <p class="text-xl text-primary-100 mb-8">
                        Dołącz do tysięcy inwestorów, którzy już używają SmartBoard do zarządzania
                        swoimi portfelami.
                    </p>

                    <UButton
                        @click="navigateToAuth"
                        :label="
                            auth.isAuthenticated ? 'Przejdź do Dashboard' : 'Utwórz darmowe konto'
                        "
                        icon="i-heroicons-arrow-right"
                        size="lg"
                        color="white"
                        variant="solid"
                        class="px-8"
                    />
                </div>
            </section>
        </main>

        <footer class="bg-gray-900 text-white py-8">
            <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex flex-col md:flex-row justify-between items-center">
                    <div class="flex items-center space-x-2 mb-4 md:mb-0">
                        <UIcon
                            name="i-heroicons-chart-bar-square"
                            class="w-6 h-6 text-primary-400"
                        />
                        <span class="text-lg font-semibold">SmartBoard</span>
                    </div>

                    <p class="text-gray-400 text-sm">
                        © 2024 SmartBoard. Wszystkie prawa zastrzeżone.
                    </p>
                </div>
            </div>
        </footer>
    </div>
</template>
