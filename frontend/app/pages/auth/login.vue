<script setup>
const toast = useToast();

const user = reactive({
    email: "",
    password: "",
});

async function onSubmit() {
    try {
        const response = await $fetch("/api/auth/login", {
            method: "POST",
            body: user,
        });

        if (!response.ok) {
            throw new Error(response.error);
        }

        toast.add({
            title: "Login",
            description: "Login successful",
            color: "green",
        });

        navigateTo("/dashboard");
    } catch {
        toast.add({
            title: "Login",
            description: "Login failed",
            color: "red",
        });
    }
}
</script>

<template>
    <UContainer>
        <div class="wrapper">
            <UCard class="card">
                <template #header>
                    <h1 class="headline">Login</h1>
                </template>

                <UForm :state="user" class="form">
                    <UFormField label="Email" name="email" class="form-field">
                        <UInput v-model="user.email" type="email" />
                    </UFormField>

                    <UFormField label="Password" name="password" class="form-field">
                        <UInput v-model="user.password" type="password" />
                    </UFormField>
                </UForm>

                <template #footer>
                    <div class="footer-btns">
                        <UButton type="submit" @click="onSubmit">Login</UButton>
                        <UButton to="/auth/register" variant="outline">Register</UButton>
                    </div>
                </template>
            </UCard>
        </div>
    </UContainer>
</template>

<style scoped>
.wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;

    .card {
        width: 100%;
        max-width: 400px;
    }

    .headline {
        text-align: center;
        font-size: 1rem;

        @media (width > 640px) {
            font-size: 1.5rem;
        }
    }

    .footer-btns {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
        flex-wrap: wrap;
    }

    :deep(.form) {
        display: flex;
        flex-direction: column;
        gap: 10px;

        :deep(.form-field .relative) {
            width: 100%;
        }
    }
}
</style>
