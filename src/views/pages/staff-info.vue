<script setup>
import { ref, onBeforeMount, reactive } from 'vue';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import TheBreadcrumb from '@/components/The-Breadcrumb.vue';
import dayjs from 'dayjs';
import { debounce } from "lodash";
const { t } = useI18n();
const loading = ref(null);
const techList = ref([]);
const closed = ref(true);
const router = useRouter();
const route = useRoute();
const products = ref([]);
const store = useStore();
const _filters = ref({
    search: route.query?.search ?? undefined,
    marita: route.query?.marita ?? undefined,
    technical: route.query?.technical ?? undefined,
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


const getCorporatives = async () => {
    loading.value = true;
    const _query = { ...route.query };
    return await store
        .dispatch('getCorpotatives', { ..._query })
        .then((res) => {
            console.log(res);
            products.value = res;
            loading.value = false;
        })
        .catch((err) => {
            loading.value = err;
        });
};
const routerPush = async (query) => {
    const _query = { ...route.query };
    await router.replace({ query: { ..._query, ...query } });
    await getCorporatives();
};
const getTechno = () => {
    store.dispatch('getTechList').then((res) => {
        console.log(res);
        techList.value = res.map((el) => {
            return {
                name: el.name,
                value: el.id
            };
        });
    });
};
onBeforeMount(() => {
    getCorporatives();
    getTechno();
});

function confirmDeleteProduct(data) {
    console.log(data);
}

function editProduct(data) {
    router.push({ name: 'staff-create', params: { id: data.id } });
}
function deleteItem (data) {
  store.dispatch('deleteCorpotative', data.id)
    .then(res => {
      getCorporatives()
    })
}
let  search = (value) => {
  if(value) routerPush({search: value});
  else routerPush({search: undefined})
}
 search = debounce(search, 1500)
</script>

<template>
    <div class="grid">
        <div class="col-12">
            <TheBreadcrumb />
            <div class="flex justify-content-between m-2">
                <div class="flex gap-1">
                    <InputText :placeholder="$t('search-phone-number')" v-model="_filters.search" @update:model-value="search"/>
<!--                    <Dropdown v-model="_filters.marita" :options="maritaList" optionLabel="name" optionValue="value" :placeholder="$t('marital_status')" />-->
<!--                    <Dropdown v-model="_filters.technical" :options="techList" optionLabel="name" optionValue="value" :placeholder="$t('technical_language_id')" />-->
                </div>
                <Button :label="$t('new-create')" class="m-2" severity="success" @click="router.push({ name: 'staff-create', params: { id: 'new' } })" />
            </div>
            <div class="card">
                <h5>{{ $t('staff-info') }}</h5>

                <!--                <SelectButton @update:modelValue="onChangeTab" v-model="currentTab" :options="tabList" optionLabel="name" />-->
                <DataTable :loading="loading" :value="products" class="mt-3">
                    <Column field="vendor.user.name" :header="$t('user-full-name')" style="min-width: 200px" frozen>
                        <template #body="{ data }">
                            <div class="flex align-items-center gap-2">
                                <!--                          <img alt="flag" src="/demo/images/flag/flag_placeholder.png" :class="`flag flag-${data?.country?.code}`" style="width: 24px" />-->
                                <span>{{ data?.first_name }} {{ data?.last_name }}</span>
                            </div>
                        </template>
                    </Column>
                    <Column field="company.name" :header="$t('user-phone')" style="min-width: 200px" frozen>
                        <template #body="{ data }">
                            <div class="flex align-items-center gap-2">
                                <span>{{ data?.phone_number }}</span>
                            </div>
                        </template>
                    </Column>
                    <Column :header="$t('dateOfBirth')" style="min-width: 200px">
                        <template #body="{ data }">
                            <div class="flex align-items-center gap-2">
                                <span>{{ dayjs(data?.dateOfBirth).format('YYYY-MM-DD') }}</span>
                            </div>
                        </template>
                    </Column>

                    <!--                    <Column field="company" header="Company" style="min-width: 200px"></Column>-->
                    <!--                    <Column field="status" header="Status" style="min-width: 200px">-->
                    <!--                        <template #body="{ data }">-->
                    <!--                            <Tag :severity="getSeverity(data.status) ">{{ data.status.toUpperCase() }}</Tag>-->
                    <!--                        </template>-->
                    <!--                    </Column>-->
                    <!--                    <Column field="activity" header="Activity" style="min-width: 200px"></Column>-->
                    <!--                    <Column field="representative.name" header="Representative" style="min-width: 200px">-->
                    <!--                        <template #body="{ data }">-->
                    <!--&lt;!&ndash;                            <div class="flex align-items-center gap-2">&ndash;&gt;-->
                    <!--&lt;!&ndash;&lt;!&ndash;                                <img :alt="data.representative.name" :src="`https://primefaces.org/cdn/primevue/images/avatar/${data.representative.image}`" style="width: 32px" />&ndash;&gt;&ndash;&gt;-->
                    <!--&lt;!&ndash;                                <span>{{ data.representative.name }}</span>&ndash;&gt;-->
                    <!--&lt;!&ndash;                            </div>&ndash;&gt;-->
                    <!--                        </template>-->
                    <!--                    </Column>-->
                    <Column field="limit" :header="$t('age')" style="min-width: 200px" frozen alignFrozen="right">
                        <template #body="{ data }">
                            <span class="text-bold">{{ data.age }}</span>
                        </template>
                    </Column>
                    <Column field="status" :header="$t('gender')" style="min-width: 200px">
                        <template #body="{ data }">
                            <Tag :severity="data?.gender === 'male' ? 'sussecc' : 'warning'">
                                <i class="pi" :class="{ 'text-green-500 pi-check-circle': data?.gender === 'male', 'text-pink-500 pi-times-circle ': !data?.gender === 'male' }"></i><span class="ml-2">{{ $t('male') }}</span></Tag
                            >
                        </template>
                    </Column>
                    <Column headerStyle="min-width:10rem;" :header="$t('action')">
                        <template #body="{ data }">
                            <Button icon="pi pi-pencil" class="mr-2" severity="success" rounded @click="editProduct(data)" />
                            <Button icon="pi pi-trash" class="mt-2" severity="warning" rounded @click="deleteItem(data)" />
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
