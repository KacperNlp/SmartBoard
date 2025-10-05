<script setup>
const walletStore = useWallet();

const wallets = computed(() => walletStore.wallets);

const walletSummary = computed(() => [
    {
        title: $t("dashboard.walletsValue"),
        value: walletStore.formatAmount(walletStore.walletSummary, "PLN"),
        isColored: false,
        isNeutral: false,
    },
    {
        title: $t("dashboard.walletTotalProfit"),
        value: walletStore.formatAmount(walletStore.walletTotalProfit, "PLN"),
        isColored: true,
        isPositive: walletStore.walletTotalProfit > 0,
        isNeutral: walletStore.walletTotalProfit === 0,
    },
    {
        title: $t("dashboard.walletCurrentProfit"),
        value: walletStore.formatAmount(walletStore.walletCurrentProfit, "PLN"),
        isColored: true,
        isPositive: walletStore.walletCurrentProfit > 0,
        isNeutral: walletStore.walletCurrentProfit === 0,
    },
    {
        title: $t("dashboard.walletDailyProfit"),
        value: walletStore.formatAmount(walletStore.walletDailyProfit, "PLN"),
        isColored: true,
        isPositive: walletStore.walletDailyProfit > 0,
        isNeutral: walletStore.walletDailyProfit === 0,
    },
    {
        title: $t("dashboard.walletRateOfReturn"),
        value: `${walletStore.walletRateOfReturn > 0 ? "+" : ""}${walletStore.walletRateOfReturn}%`,
        isColored: true,
        isPositive: walletStore.walletRateOfReturn > 0,
        isNeutral: walletStore.walletRateOfReturn === 0,
    },
    {
        title: $t("dashboard.walletAverageAnnualReturn"),
        value: `${walletStore.walletAverageAnnualReturn > 0 ? "+" : ""}${
            walletStore.walletAverageAnnualReturn
        }%`,
        isColored: true,
        isPositive: walletStore.walletAverageAnnualReturn > 0,
        isNeutral: walletStore.walletAverageAnnualReturn === 0,
    },
    {
        title: $t("dashboard.walletValuesIncrease"),
        value: walletStore.walletValuesIncrease,
        isColored: true,
        isPositive: walletStore.walletValuesIncrease > 0,
        isNeutral: walletStore.walletValuesIncrease === 0,
    },
    {
        title: $t("dashboard.walletValuesDecrease"),
        value: walletStore.walletValuesDecrease,
        isColored: true,
        isNeutral: walletStore.walletValuesDecrease === 0,
    },
]);
</script>

<template>
    <UContainer class="flex justify-end py-8">
        <UModal title="Dodaj portfel">
            <UButton>
                <UIcon name="i-heroicons-plus" />
                {{ $t("dashboard.addWallet") }}
            </UButton>

            <template #body>
                <WalletForm />
            </template>
        </UModal>
    </UContainer>

    <UContainer v-if="wallets.length === 0">
        <UAlert
            :title="$t('dashboard.welcome')"
            :description="$t('dashboard.welcomeDescription')"
            color="primary"
            variant="subtle"
        />
    </UContainer>
    <template v-else>
        <UContainer class="mb-16">
            <h1 class="text-2xl font-bold mb-4">{{ $t("dashboard.walletSummary") }}</h1>

            <div class="flex flex-col gap-4 md:grid md:grid-cols-3 lg:grid-cols-4">
                <UCard v-for="item in walletSummary" :key="item.title">
                    <template #header>
                        <span class="text-sm text-gray-500">{{ item.title }}</span>
                    </template>
                    <p
                        class="text-xl font-semibold"
                        :class="{
                            'text-green-500': item.isPositive && item.isColored && !item.isNeutral,
                            'text-red-500': !item.isPositive && item.isColored && !item.isNeutral,
                            'text-gray-500': item.isNeutral,
                        }"
                    >
                        {{ item.value }}
                    </p>
                </UCard>
            </div>
        </UContainer>

        <UContainer v-if="wallets.length">
            <h2 class="text-2xl font-bold mb-4">{{ $t("dashboard.walletsList") }}</h2>
            <div class="flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
                <NuxtLink
                    v-for="wallet in wallets"
                    :key="wallet.id"
                    :to="`/dashboard/wallet/${wallet.id}`"
                >
                    <UCard class="border-1 border-gray-800 hover:border-primary-600 duration-300">
                        <h2 class="text-xl font-bold mb-4">{{ wallet.name }}</h2>
                        <p class="text-2xl font-semibold">
                            {{ walletStore.formatAmount(wallet.value, wallet.currency) }}
                        </p>
                    </UCard>
                </NuxtLink>
            </div>
        </UContainer>
    </template>
</template>
