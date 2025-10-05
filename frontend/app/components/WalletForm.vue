<script setup>
const walletStore = useWallet();

const form = reactive({
    name: "",
    currency: "",
    value: 0,
});

const currencies = ["PLN", "USD", "EUR", "GBP"];

function onSubmit() {
    const wallletId = Math.floor(Math.random() * 1000000);

    const walletValue = Number(form.value.replace(/[,\s]/g, ""));

    const wallet = {
        id: wallletId,
        name: form.name,
        currency: form.currency,
        value: walletValue,
    };

    walletStore.addWallet(wallet);
    emit("close");
}
</script>

<template>
    <UForm :state="form" class="flex flex-col items-center gap-4">
        <UFormField label="Nazwa" name="name" class="w-full">
            <UInput v-model="form.name" name="name" class="w-full" />
        </UFormField>

        <UFormField label="Waluta" name="currency" class="w-full">
            <USelect v-model="form.currency" name="currency" :items="currencies" class="w-full" />
        </UFormField>

        <UFormField label="Wartość" name="value" class="w-full">
            <UInput v-model="form.value" name="value" class="w-full" />
        </UFormField>

        <UButton type="submit" @click="onSubmit" class="mt-4">Dodaj portfel</UButton>
    </UForm>
</template>
