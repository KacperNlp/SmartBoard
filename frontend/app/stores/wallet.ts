export interface WalletSector {
    name: string;
    color: string;
}

export interface Wallet {
    id: number;
    name: string;
    currency: string;
    value: number;
    deposits: number;
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
            deposits: 89000,
        },
        {
            id: 2,
            name: "Portfel 2",
            currency: "PLN",
            value: 200000,
            deposits: 150000,
        },
        {
            id: 3,
            name: "Portfel ETF",
            currency: "EUR",
            value: 30000,
            deposits: 25000,
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

    const getWalletProfit = (wallet: Wallet) => {
        return wallet.value - wallet.deposits;
    };

    const getWalletRateOfReturn = (wallet: Wallet) => {
        return ((wallet.value - wallet.deposits) / wallet.deposits) * 100;
    };

    const removeWallet = (id: number) => {
        wallets.value = wallets.value.filter((wallet) => wallet.id !== id);
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
        getWalletProfit,
        getWalletRateOfReturn,
        removeWallet,
    };
});
