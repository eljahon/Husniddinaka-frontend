<script setup>
import { useLayout } from '@/layout/composables/layout';
import { ref, computed, reactive } from "vue";
// import AppConfig from '@/layout/AppConfig.vue';

const { layoutConfig } = useLayout();
const email = ref('');
const password = ref('');
const loading = ref(false)
const _form = reactive({
  email: '',
  password: ''
})
const checked = ref(false);
const isCheck = ref({})

const logoUrl = computed(() => {
    return `/layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
});

const isChechValidation= () =>  {
  let set ={}
  for(let key in _form) {
    console.log(!_form[key],_form[key]);
      if(!_form[key]) set[key] = true;
      if(_form[key]) set[key] = false;
  }
  isCheck.value = set;
  console.log(set);

  return Object.values(set).find(el => !el)
}

function onSubmit () {
  loading.value = true
  const isValid = isChechValidation();
  console.log(isValid);
  if(isValid){}

  loading.value = false
}
</script>

<template>
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <img :src="logoUrl" alt="Sakai logo" class="mb-5 w-6rem flex-shrink-0" />
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <div class="text-center mb-5">
                        <img src="/demo/images/login/avatar.png" alt="Image" height="50" class="mb-3" />
                        <div class="text-900 text-3xl font-medium mb-3">Welcome, Isabel!</div>
                        <span class="text-600 font-medium">Sign in to continue</span>
                    </div>

                    <div>
                        <label for="email1" class="block text-900 text-xl font-medium mb-2">Email</label>
                        <InputText id="email1" type="text" placeholder="Email address" class="w-full md:w-30rem mb-5" style="padding: 1rem" v-model="_form.email" :invalid="isCheck?.email"/>

                        <label for="password1" class="block text-900 font-medium text-xl mb-2">Password</label>
                        <Password id="password1" v-model="_form.password" placeholder="Password" :toggleMask="true" class="w-full mb-3" inputClass="w-full" :invalid="isCheck?.password" :inputStyle="{ padding: '1rem' }"></Password>

                        <div class="flex align-items-center justify-content-between mb-5 gap-5">
                            <div class="flex align-items-center">
                                <Checkbox v-model="checked" id="rememberme1" binary class="mr-2"></Checkbox>
                                <label for="rememberme1">Remember me</label>
                            </div>
                            <a class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)">Forgot password?</a>
                        </div>
                        <Button @click="onSubmit"  :loading="loading" label="Sign In" aria-label="Submit" class="w-full p-3 text-xl" iconPos="right"></Button>
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
