export interface WalletSector {
    name: string;
    color: string;
}

export const useWallet = defineStore("wallet", () => {
    const walletSummary = ref<number>(100000);
    const walletCurrency = ref<string>("PLN");
    const walletSectors = ref<number[]>([65000, 25000, 5000, 5000, 5000]);
    const walletSectorsLabels = ref<WalletSector[]>([
        { name: "Akcje", color: "#9837c4" },
        { name: "Obligacje", color: "#26991c" },
        { name: "Złoto", color: "#fab223" },
        { name: "Kryptowaluty", color: "#c20c21" },
        { name: "Nieruchomości", color: "#4287f5" },
    ]);

    const formatAmount = (amount: number, currency: string = walletCurrency.value): string => {
        const symbols = {
            PLN: "zł",
            USD: "$",
            EUR: "€",
            GBP: "£",
        };

        const symbol = symbols[currency as keyof typeof symbols] || currency;
        return `${amount.toLocaleString("pl-PL", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })} ${symbol}`;
    };

    return { walletSummary, walletCurrency, formatAmount, walletSectors, walletSectorsLabels };
});
