<script setup>
const auth = useAuth();

onMounted(async () => {
    await auth.checkAuth();
});
</script>

<template>
    <UApp>
        <NuxtPage />
    </UApp>
</template>
