<script setup>
const wallet = useWallet();
</script>

<template>
    <UContainer>
        <UCard>
            <h2 class="text-xl font-bold mb-4">Całkowita wartość portfela</h2>
            <p class="text-2xl font-semibold">{{ wallet.formatAmount(wallet.walletSummary) }}</p>
        </UCard>
    </UContainer>

    <UContainer>
        <h2 class="text-xl font-bold mb-4">Udział poszczególnych sektorów</h2>
        <DonutChart
            :data="wallet.walletSectors"
            :height="300"
            :radius="0"
            :type="'full'"
            :labels="wallet.walletSectorsLabels"
        >
            <div class="absolute text-center">
                <div class="font-semibold">Label</div>
                <div class="text-muted">2 seconds ago</div>
            </div>
        </DonutChart>
    </UContainer>
</template>
