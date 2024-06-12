<script setup>
import {ref} from 'vue'
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import router from "@/router";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
const store = useStore()
const route = useRoute()
const schema = yup.object({
    name: yup.string().required(),
});


const props = defineProps({
  nameItem:{
    type:String
  }
})
const { defineField, handleSubmit, resetForm, errors } = useForm({
  validationSchema: schema,
  initialValues:{name: props.nameItem}
});

const onSubmit = handleSubmit(async (values) => {
  console.log('Submitted with', values);
 if(route.params.id === 'new') {
   store.dispatch('postTechList', values)
     .then(res => {
       router.go(-1)
     })
 } else {
   store.dispatch('putTechList',{id: route.params.id, data: values})
     .then(res => {
       router.go(-1)
     })
 }
});
const [name] = defineField('name');
console.log(props);
</script>

<template>
    <div class="q-pl-md card">
        <div class="q-mt-md q-gutter-md">
            <form @submit="onSubmit">
                <div class="grid grid-cols-4 gap-4">
                    <div class="field">
                        <label for="name">{{ $t('name') }}</label>
                        <InputText v-model="name" aria-describedby="name-help" :class="{ 'p-invalid': errors.name }" />
                        <small id="fullName-help" class="p-error">
                            {{ errors.name }}
                        </small>
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
