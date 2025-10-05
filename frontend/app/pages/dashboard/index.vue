<script setup>
const router = useRouter();
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

const walletStats = computed(() =>
    wallets.value.map((wallet) => ({
        ...wallet,
        profit: walletStore.getWalletProfit(wallet),
        rateOfReturn: walletStore.getWalletRateOfReturn(wallet),
        formattedProfit: walletStore.formatAmount(
            walletStore.getWalletProfit(wallet),
            wallet.currency
        ),
        formattedRateOfReturn: `${Math.floor(walletStore.getWalletRateOfReturn(wallet), 2)}%`,
    }))
);

function goToWallet(id) {
    router.push(`/dashboard/wallet/${id}`);
}

function editWallet(id) {
    console.log("Edit wallet", id);
}

function removeWallet(id) {
    walletStore.removeWallet(id);
}
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
                <UCard
                    v-for="wallet in walletStats"
                    :key="wallet.id"
                    class="border-1 border-gray-800 hover:border-primary-600 duration-300 cursor-pointer"
                    @click="goToWallet(wallet.id)"
                >
                    <template #header>
                        <div class="flex justify-between">
                            <span class="text-sm text-gray-500 uppercase">{{ wallet.name }}</span>
                            <div class="flex gap-2">
                                <UButton
                                    @click.stop="editWallet(wallet.id)"
                                    size="sm"
                                    icon="i-heroicons-pencil"
                                />
                                <UButton
                                    @click.stop="removeWallet(wallet.id)"
                                    color="error"
                                    size="sm"
                                    icon="i-heroicons-trash"
                                />
                            </div>
                        </div>
                    </template>
                    <p class="text-xl font-semibold">
                        {{ walletStore.formatAmount(wallet.value, wallet.currency) }}
                    </p>

                    <div class="flex justify-between">
                        <p
                            class="text-sm text-gray-500"
                            :class="{
                                'text-green-500': wallet.profit > 0,
                                'text-red-500': wallet.profit < 0,
                            }"
                        >
                            {{
                                `${wallet.profit > 0 ? "+" : ""}${walletStore.formatAmount(
                                    wallet.profit,
                                    wallet.currency
                                )}`
                            }}
                        </p>
                        <p
                            class="text-sm text-gray-500"
                            :class="{
                                'text-green-500': wallet.rateOfReturn > 0,
                                'text-red-500': wallet.rateOfReturn < 0,
                            }"
                        >
                            {{
                                `${Math.floor(wallet.rateOfReturn, 2) > 0 ? "+" : ""}${Math.floor(
                                    wallet.rateOfReturn,
                                    2
                                )}%`
                            }}
                        </p>
                    </div>
                </UCard>
            </div>
        </UContainer>
    </template>
</template>
