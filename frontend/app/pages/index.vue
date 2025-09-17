<script setup>
const auth = useAuth();

const dashboardLink = computed(() => {
    return auth.isAuthenticated ? "/dashboard" : "/auth/login";
});
</script>

<template>
    <header>
        <h1>Home Page</h1>
        <NuxtLink :to="dashboardLink">{{ auth.isAuthenticated ? "Dashboard" : "Login" }}</NuxtLink>
    </header>
</template>
