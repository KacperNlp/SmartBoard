export interface WalletSector {
    name: string;
    color: string;
}

export interface Wallet {
    id: number;
    name: string;
    currency: string;
    value: number;
}

export const useWallet = defineStore("wallet", () => {
    const walletSectorsLabels = ref<WalletSector[]>([
        { name: "Akcje", color: "#9837c4" },
        { name: "Obligacje", color: "#26991c" },
        { name: "Złoto", color: "#fab223" },
        { name: "Kryptowaluty", color: "#c20c21" },
        { name: "Nieruchomości", color: "#4287f5" },
    ]);
    const wallets = ref<Wallet[]>([
        {
            id: 1,
            name: "Portfel 1",
            currency: "PLN",
            value: 100000,
        },
        {
            id: 2,
            name: "Portfel 2",
            currency: "PLN",
            value: 200000,
        },
    ]);

    const walletSummary = computed(() => {
        return wallets.value.reduce((acc, wallet) => acc + wallet.value, 0);
    });

    const walletDailyProfit = computed(() => {
        return 65.23;
    });

    const walletTotalProfit = computed(() => {
        return 100000;
    });

    const walletCurrentProfit = computed(() => {
        return 10000;
    });

    const walletRateOfReturn = computed(() => {
        return 18.9;
    });

    const walletAverageAnnualReturn = computed(() => {
        return 10.5;
    });

    const walletValuesIncrease = computed(() => {
        return 7;
    });

    const walletValuesDecrease = computed(() => {
        return 4;
    });

    const formatAmount = (amount: number, currency: string = "PLN"): string => {
        const symbols = {
            PLN: "zł",
            USD: "$",
            EUR: "€",
            GBP: "£",
        };

        const symbol = symbols[currency as keyof typeof symbols] || currency;

        const locales = {
            PLN: "pl-PL",
            USD: "en-US",
            EUR: "de-DE",
            GBP: "en-GB",
        };

        const locale = locales[currency as keyof typeof locales] || "pl-PL";

        return `${amount.toLocaleString(locale, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })} ${symbol}`;
    };

    const addWallet = (wallet: Wallet) => {
        wallets.value.push(wallet);
    };

    return {
        walletSummary,
        walletDailyProfit,
        walletTotalProfit,
        walletCurrentProfit,
        walletRateOfReturn,
        walletAverageAnnualReturn,
        walletValuesIncrease,
        walletValuesDecrease,
        formatAmount,
        walletSectorsLabels,
        wallets,
        addWallet,
    };
});
