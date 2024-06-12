<script setup>
import { useRoute } from "vue-router";
import { reactive, ref } from "vue";
import Forms from "@/components/TForms.vue";
import { useStore } from "vuex";
const route = useRoute()
const store = useStore()
let nameItem = reactive(undefined)

if(route.params.id !== 'new') {
  store.dispatch('getTechListItem',route.params.id)
    .then(res => {
      nameItem = res.name
    })
}
</script>

<template>
<div>
  <Forms v-if="route.params.id === 'new'"/>
  <Forms v-if="nameItem?.length" :name-item="nameItem"/>
</div>
</template>

<style scoped lang="scss">

</style>