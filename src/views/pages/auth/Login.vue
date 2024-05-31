<script setup>
import { useLayout } from '@/layout/composables/layout';
import { ref, computed, reactive } from 'vue';
import Logo from '@/components/Logo.vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import { useI18n } from 'vue-i18n';
// import AppConfig from '@/layout/AppConfig.vue';

const { layoutConfig } = useLayout();
const email = ref('');
const toast = useToast();
const { t } = useI18n();
const password = ref('');
const loading = ref(false);
const _form = reactive({
    identifier: '',
    password: ''
});
const router = useRouter();
const checked = ref(false);
const isCheck = ref({});
const store = useStore();
const logoUrl = computed(() => {
    return `/layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
});

const isChechValidation = () => {
    let set = {};
    for (let key in _form) {
        if (!_form[key]) set[key] = true;
        if (_form[key]) set[key] = false;
    }
    isCheck.value = set;

    return Object.values(set).find((el) => !el) || true;
};

function onSubmit() {
    loading.value = true;
    const isValid = isChechValidation();
    if (isValid) {
        store
            .dispatch('Login', _form)
            .then((res) => {
                console.log(res);
                store.dispatch('getUserMe').then((res) => {
                    if (res.company) {
                        router.push('/');
                    } else {
                      localStorage.clear()
                        toast.add({ severity: 'error', summary: 'Error Message', detail: t('user-not-found-company'), life: 3000 });
                    }
                    loading.value = false;
                });
            })
            .catch((err) => {
                console.log(err);
                loading.value = false;
                toast.add({ severity: 'error', summary: 'Error Message', detail: t('error-login-submit'), life: 3000 });
            });
    }
}
</script>

<template>
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <!--            <img :src="logoUrl" alt="Sakai logo"  />-->
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <div class="text-center mb-5">
                        <Logo class="w-full" />
                        <!--                        <img src="/demo/images/login/avatar.png" alt="Image" height="50" class="mb-3" />-->
                        <div class="text-900 text-3xl font-medium mb-3">Welcome, Isabel!</div>
                        <span class="text-600 font-medium">Sign in to continue</span>
                    </div>

                    <div>
                        <label for="email1" class="block text-900 text-xl font-medium mb-2">Login</label>
                        <InputText id="email1" type="text" placeholder="identifier" class="w-full md:w-30rem mb-5" style="padding: 1rem" v-model="_form.identifier" :invalid="isCheck?.identifier" />

                        <label for="password1" class="block text-900 font-medium text-xl mb-2">Password</label>
                        <Password id="password1" v-model="_form.password" placeholder="Password" :toggleMask="true" class="w-full mb-3" inputClass="w-full" :invalid="isCheck?.password" :inputStyle="{ padding: '1rem' }"></Password>

                        <div class="flex align-items-center justify-content-between mb-5 gap-5">
                            <div class="flex align-items-center">
                                <Checkbox v-model="checked" id="rememberme1" binary class="mr-2"></Checkbox>
                                <label for="rememberme1">Remember me</label>
                            </div>
                            <a class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)">Forgot password?</a>
                        </div>
                        <Button @click="onSubmit" :loading="loading" :label="$t('submit')" aria-label="Submit" class="w-full p-3 text-xl" iconPos="right"></Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--    <AppConfig simple />-->
</template>

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>
