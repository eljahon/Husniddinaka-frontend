<script setup>
import {ref} from 'vue'
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import router from "@/router";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
const store = useStore()
const route = useRoute()
const maritaList = [
    { name: 'single', value: 'single' },
    { name: 'married', value: 'married' },
    { name: 'widowed', value: 'widowed' },
    { name: 'divorced', value: 'divorced' },
    { name: 'separated', value: 'separated' },
    { name: 'certain', value: 'certain' },
    { name: 'cases', value: 'cases' },
    { name: 'registered', value: 'registered' },
    { name: 'partnership', value: 'partnership' }
];
const langList =[{name: 'Beginner', value: 'Beginner'},{name: 'Intermediate', value: 'Intermediate'}, {name: 'Advanced', value: 'Advanced'}]
const genderList =[{name: 'MALE', value: 'male'},{name: 'FEMALE', value: 'female'}]
const techList = ref([])
const schema = yup.object({
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    bad_habits: yup.string().required(),
    contacts: yup.string().required(),
    registration_addres: yup.string().required(),
    addres: yup.string().required(),
    age: yup.number().required(),
    current_addres: yup.string().required(),
    current_position: yup.string().required(),
    acdemic_rank: yup.string().required(),
    degree: yup.string().required(),
    acdemic_degree: yup.string().required(),
    education: yup.string().required(),
    graduted: yup.string().required(),
    habits: yup.string().required(),
    phone_number: yup.string().required(),
    dateOfBirth: yup.date().required(),
    birth_place: yup.string().required(),
    gender: yup.string().required(),
    marital_status: yup.string().required(),
    language_list: yup.string().required(),
   technical_language_id: yup.string().required()
});

const { defineField, handleSubmit, resetForm, errors, isSubmitting, isValidating } = useForm({
    validationSchema: schema
});
const [first_name] = defineField('first_name');
const [birth_place] = defineField('birth_place');
const [graduted] = defineField('graduted');
const [acdemic_degree] = defineField('acdemic_degree');
const [education] = defineField('education');
const [acdemic_rank] = defineField('acdemic_rank');
const [current_position] = defineField('current_position');
const [degree] = defineField('degree');
const [habits] = defineField('habits');
const [dateOfBirth] = defineField('dateOfBirth');
const [gender] = defineField('gender');
const [language_list] = defineField('language_list')
const [last_name] = defineField('last_name');
const [bad_habits] = defineField('bad_habits');
const [phone_number] = defineField('phone_number');
const [age] = defineField('age');
const [addres] = defineField('addres');
const [marital_status] = defineField('marital_status');
const [contacts] = defineField('contacts');
const [current_addres] = defineField('current_addres');
const [registration_addres] = defineField('registration_addres');
const [technical_language_id] = defineField('technical_language_id');

const onSubmit = handleSubmit(async (values) => {
    console.log('Submitted with', values);
    values.age =+values.age
    store.dispatch('postCorpotative', values)
      .then(res => {
        router.go(-1)
      })
});
if(route.params.id !== 'new') {
  store.dispatch('getCorpotative',route.query.id)
}
const getTechno = () => {
  store.dispatch('getTechList')
    .then(res => {
      techList.value = res.map(el => {
        return {
          name: el.name,
          value: el.id
        }
      });
      console.log(res);
    })
}
const options = ['Enterprise', 'Pro', 'Freelance'].map((o) => ({
    name: o,
    value: o.toLowerCase()
}));
getTechno()
</script>

<template>
    <div class="q-pl-md card">
        <div class="q-mt-md q-gutter-md">
            <form @submit="onSubmit">
                <div class="grid grid-cols-4 gap-4">
                    <div class="field">
                        <label for="fullName">{{ $t('first_name') }}</label>
                        <InputText v-model="first_name" aria-describedby="fullName-help" :class="{ 'p-invalid': errors.first_name }" />
                        <small id="fullName-help" class="p-error">
                            {{ errors.first_name }}
                        </small>
                    </div>
                    <div class="field">
                        <label for="password">{{ $t('last_name') }}</label>
                        <InputText v-model="last_name" aria-describedby="password-help" :class="{ 'p-invalid': errors.last_name }" />
                        <small id="password-help" class="p-error">
                            {{ errors.last_name }}
                        </small>
                    </div>
                    <div class="field">
                        <label for="bad_habits">{{ $t('bad_habits') }}</label>
                        <InputText v-model="bad_habits" aria-describedby="password-confirm-help" :class="{ 'p-invalid': errors.bad_habits }" />
                        <small id="password-confirm-help" class="p-error">
                            {{ errors.bad_habits }}
                        </small>
                    </div>
                    <div class="field">
                        <label for="phone_number">{{ $t('phone_number') }}</label>
                        <InputText v-model="phone_number" aria-describedby="phone_number-help" :class="{ 'p-invalid': errors.phone_number }" />
                        <small id="phone_number-help" class="p-error">
                            {{ errors.phone_number }}
                        </small>
                    </div>
                    <div class="field">
                        <label for="bad_habits">{{ $t('age') }}</label>
                        <InputText v-model="age" aria-describedby="password-confirm-help" type="number" :class="{ 'p-invalid': errors.age }" />
                        <small id="password-confirm-help" class="p-error">
                            {{ errors.age }}
                        </small>
                    </div>
                    <div class="field">
                        <label for="contacts">{{ $t('contacts') }}</label>
                        <InputText v-model="contacts" aria-describedby="contacts-help" :class="{ 'p-invalid': errors.contacts }" />
                        <small id="contacts-help" class="p-error">
                            {{ errors.contacts }}
                        </small>
                    </div>
                    <div class="field">
                          <label for="addres">{{ $t('addres') }}</label>
                          <InputText v-model="addres" aria-describedby="addres-help"  :class="{ 'p-invalid': errors.addres }" />
                          <small id="addres-help" class="p-error">
                              {{ errors.addres }}
                          </small>
                      </div>
                    <div class="field">
                          <label for="registration_addres">{{ $t('registration_addres') }}</label>
                          <InputText v-model="registration_addres" aria-describedby="registration_addres-help"  :class="{ 'p-invalid': errors.registration_addres }" />
                          <small id="registration_addres-help" class="p-error">
                              {{ errors.registration_addres }}
                          </small>
                      </div>
                    <div class="field">
                          <label for="current_addres">{{ $t('current_addres') }}</label>
                          <InputText v-model="current_addres" aria-describedby="current_addres-help"  :class="{ 'p-invalid': errors.current_addres }" />
                          <small id="current_addres-help" class="p-error">
                              {{ errors.current_addres }}
                          </small>
                      </div>
                    <div class="field">
                          <label for="habits">{{ $t('habits') }}</label>
                          <InputText v-model="habits" aria-describedby="habits-help"  :class="{ 'p-invalid': errors.habits }" />
                          <small id="habits-help" class="p-error">
                              {{ errors.habits }}
                          </small>
                      </div>
                    <div class="field">
                          <label for="degree">{{ $t('degree') }}</label>
                          <InputText v-model="degree" aria-describedby="degree-help"  :class="{ 'p-invalid': errors.degree }" />
                          <small id="habits-help" class="p-error">
                              {{ errors.degree }}
                          </small>
                      </div>
                    <div class="field">
                          <label for="current_position">{{ $t('current_position') }}</label>
                          <InputText v-model="current_position" aria-describedby="current_position-help"  :class="{ 'p-invalid': errors.current_position }" />
                          <small id="current_position-help" class="p-error">
                              {{ errors.current_position }}
                          </small>
                      </div>
                    <div class="field">
                          <label for="acdemic_rank">{{ $t('acdemic_rank') }}</label>
                          <InputText v-model="acdemic_rank" aria-describedby="acdemic_rank-help"  :class="{ 'p-invalid': errors.acdemic_rank }" />
                          <small id="acdemic_rank-help" class="p-error">
                              {{ errors.acdemic_rank }}
                          </small>
                      </div>
                    <div class="field">
                          <label for="education">{{ $t('education') }}</label>
                          <InputText v-model="education" aria-describedby="education-help"  :class="{ 'p-invalid': errors.education }" />
                          <small id="education-help" class="p-error">
                              {{ errors.acdemic_rank }}
                          </small>
                      </div>
                    <div class="field">
                          <label for="acdemic_degree">{{ $t('acdemic_degree') }}</label>
                          <InputText v-model="acdemic_degree" aria-describedby="acdemic_degree-help"  :class="{ 'p-invalid': errors.acdemic_degree }" />
                          <small id="acdemic_degree-help" class="p-error">
                              {{ errors.acdemic_degree }}
                          </small>
                      </div>
                    <div class="field">
                          <label for="graduted">{{ $t('graduted') }}</label>
                          <InputText v-model="graduted" aria-describedby="graduted-help"  :class="{ 'p-invalid': errors.graduted }" />
                          <small id="acdemic_degree-help" class="p-error">
                              {{ errors.graduted }}
                          </small>
                      </div>
                    <div class="field">
                          <label for="birth_place">{{ $t('birth_place') }}</label>
                          <InputText v-model="birth_place" aria-describedby="birth_place-help"  :class="{ 'p-invalid': errors.birth_place }" />
                          <small id="birth_place-help" class="p-error">
                              {{ errors.birth_place }}
                          </small>
                      </div>

                    <div class="field">
                        <label for="type">{{ $t('language_list') }}</label>
                        <Dropdown v-model="language_list" :options="langList" optionLabel="name" optionValue="value" :class="{ 'p-invalid': errors.language_list }" placeholder="Select a type" />

                        <small id="language_list-help" class="p-error">{{ errors.language_list }}</small>
                    </div>
                  <div class="field">
                        <label for="type">{{ $t('genderList') }}</label>
                        <Dropdown v-model="gender" :options="genderList" optionLabel="name" optionValue="value" :class="{ 'p-invalid': errors.gender }" placeholder="Select a type" />

                        <small id="language_list-help" class="p-error">{{ errors.gender }}</small>
                    </div>
                  <div class="field">
                        <label for="type">{{ $t('dateOfBirth') }}</label>
                    <Calendar class="w-full" v-model="dateOfBirth" showIcon iconDisplay="input" :class="{ 'p-invalid': errors.dateOfBirth }" date-format="yy-mm-dd" />
                    <small id="language_list-help" class="p-error">{{ errors.dateOfBirth }}</small>
                    </div>
                  <div class="field">
                        <label for="type">{{ $t('marital_status') }}</label>
                        <Dropdown v-model="marital_status" :options="maritaList" optionLabel="name" optionValue="value" :class="{ 'p-invalid': errors.marital_status }" placeholder="Select a type" />

                        <small id="email-help" class="p-error">{{ errors.marital_status }}</small>
                    </div>
                  <div class="field">
                        <label for="type">{{ $t('technical_language_id') }}</label>
                        <Dropdown v-model="technical_language_id" :options="techList" optionLabel="name" optionValue="value" :class="{ 'p-invalid': errors.technical_language_id }" :placeholder="$t('technical_language_id')" />
                        <small id="email-help" class="p-error">{{ errors.technical_language_id }}</small>
                    </div>
                </div>
                <div class="footer">
                    <Button label="Submit" type="submit" />

                    <Button label="Reset" type="button" @click="resetForm" class="p-button-secondary" />
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
label {
    display: block;
    margin-top: 20px;
    margin-bottom: 4px;
}

.footer {
    margin-top: 20px;
    display: flex;
    gap: 10px;
}

.p-error {
    display: block;
}
</style>
