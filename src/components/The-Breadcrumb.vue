<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const router = useRouter();
// const routerList = router.currentRoute.value.path.split('/');
let breadcrumbHome = ref({ icon: 'pi pi-home', to: '/' });
let breadcrumbItems = ref([{ label: t('corporative-carts') }]);

function formatRouter() {
    const routerList = router.currentRoute.value.matched.map((el) => {
        return {
            label: el.path === '/' ? '' : t(el.path.split('/')[1]),
            icon: el.path === '/' ? 'pi pi-home' : undefined,
            to: el.path
        };
    });
  breadcrumbItems.value = routerList.filter(el => el.to !== '/')
  breadcrumbHome.value = routerList.find(el => el.to === '/')

}
formatRouter();
</script>

<template>
    <Breadcrumb :home="breadcrumbHome" :model="breadcrumbItems" class="mb-4">
        <template #item="{ item, props }">
            <router-link v-slot="{ href, navigate }" :to="item.to" custom>
                <a :href="href" v-bind="props.action" @click="navigate">
                    <span :class="[item.icon, 'text-color', 'ml-2']" />
                    <span class="text-primary font-semibold">{{ item.label }}</span>
                </a>
            </router-link>
        </template>
    </Breadcrumb>
</template>

<style scoped lang="scss"></style>
