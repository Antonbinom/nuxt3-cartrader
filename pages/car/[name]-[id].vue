<template>
  <div>
    <CarDetailsHero v-if="car" :car="car" />
    <CarDetailsAttribute :features="car.features" />
    <CarDetailsDescription :description="car.description" />
    <CarDetailsContact />
  </div>
</template>

<script setup>
const route = useRoute();
const { toTitleCase } = useUtils();

definePageMeta({
  layout: "custom",
});
useHead({
  title: toTitleCase(route.params.name),
});

const { data: car } = await useFetchCar(route.params.id);
</script>
