<template>
  <div>
    <CarDetailsHero :car="car" />
    <CarDetailsAttribute :features="car.features" />
    <CarDetailsDescription :description="car.description" />
    <CarDetailsContact />
  </div>
</template>

<script setup>
const { toTitleCase } = useUtils();
const route = useRoute();
const { cars } = useCars();

definePageMeta({
  layout: "custom",
});
useHead({
  title: toTitleCase(route.params.name),
});

const car = computed(() => {
  return cars.find((c) => c.id === parseInt(route.params.id));
});

if (!car.value) {
  throw createError({
    statusCode: 404,
    message: `Car with ID of ${route.params.id} does not exist`,
  });
}
</script>
