<script setup>
const toast = useToast();

const user = reactive({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
});

async function onSubmit() {
    try {
        const response = await $fetch("/api/auth/register", {
            method: "POST",
            body: user,
        });

        if (!response.ok) {
            throw new Error(response.error);
        }

        toast.add({
            title: "Register",
            description: "Register successful",
            color: "green",
        });

        navigateTo("/");
    } catch {
        toast.add({
            title: "Register",
            description: "Register failed",
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
                    <h1 class="headline">{{ $t("auth.register") }}</h1>
                </template>

                <UForm :state="user" class="form">
                    <UFormField :label="$t('auth.name')" class="form-field">
                        <UInput v-model="user.name" name="name" />
                    </UFormField>

                    <UFormField :label="$t('auth.email')" class="form-field">
                        <UInput v-model="user.email" name="email" type="email" />
                    </UFormField>

                    <UFormField :label="$t('auth.password')" class="form-field">
                        <UInput v-model="user.password" name="password" type="password" />
                    </UFormField>

                    <UFormField label="Confirm Password" class="form-field">
                        <UInput
                            v-model="user.confirmPassword"
                            name="confirmPassword"
                            type="password"
                        />
                    </UFormField>
                </UForm>

                <template #footer>
                    <div class="footer-btns">
                        <UButton type="submit" @click="onSubmit">{{ $t("auth.register") }}</UButton>
                        <UButton to="/auth/login" variant="outline">{{ $t("auth.login") }}</UButton>
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
