<script setup>
import { ref, onBeforeMount, reactive } from 'vue';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import TheBreadcrumb from '@/components/The-Breadcrumb.vue';
import dayjs from 'dayjs';
const { t } = useI18n();
const loading = ref(null);
const techList = ref([]);
const closed = ref(true);
const router = useRouter();
const _filters = ref({
    search: undefined,
    marita: undefined,
    technical: undefined
});
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
const langList = [
    { name: 'Beginner', value: 'Beginner' },
    { name: 'Intermediate', value: 'Intermediate' },
    { name: 'Advanced', value: 'Advanced' }
];
const genderList = [
    { name: 'MALE', value: 'male' },
    { name: 'FEMALE', value: 'female' }
];
const route = useRoute();
const products = ref([]);
const store = useStore();



const getTechno = () => {
    store.dispatch('getTechList').then((res) => {
        console.log(res);
        techList.value = res;
    });
};
onBeforeMount(() => {
    getTechno();
});

function confirmDeleteProduct(data) {
    console.log(data);
}

function editProduct(data) {
    console.log(data);
    router.push({ name: 'technical-create', params: { id: data.id } });
}
</script>

<template>
    <div class="grid">
        <div class="col-12">
            <TheBreadcrumb />
            <div class="flex justify-content-end m-2">
                <Button :label="$t('new-create')" class="m-2" severity="success" @click="router.push({ name: 'technical-create', params: { id: 'new' } })" />
            </div>
            <div class="card">
                <h5>{{ $t('technalic') }}</h5>

                <!--                <SelectButton @update:modelValue="onChangeTab" v-model="currentTab" :options="tabList" optionLabel="name" />-->
                <DataTable :loading="loading" :value="techList" class="mt-3">
                    <Column field="name" :header="$t('technalic-name')" style="min-width: 200px" frozen>
                        <template #body="{ data }">
                            <div class="flex align-items-center gap-2">
                                <!--                          <img alt="flag" src="/demo/images/flag/flag_placeholder.png" :class="`flag flag-${data?.country?.code}`" style="width: 24px" />-->
                                <span>{{ data?.name }}</span>
                            </div>
                        </template>
                    </Column>
                    <Column headerStyle="min-width:10rem;" :header="$t('action')">
                        <template #body="{ data }">
                            <Button icon="pi pi-pencil" class="mr-2" severity="success" rounded @click="editProduct(data)" />
                            <Button icon="pi pi-trash" class="mt-2" severity="warning" rounded @click="confirmDeleteProduct(data)" />
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
:deep(.p-datatable-frozen-tbody) {
    font-weight: bold;
}

:deep(.p-datatable-scrollable .p-frozen-column) {
    font-weight: bold;
}
</style>
