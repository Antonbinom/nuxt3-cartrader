<template>
  <div>
    <CarCards v-if="cars?.length" :cars="cars" />
    <h1 v-else>No cars in these conditions</h1>
  </div>
</template>

<script setup>
const route = useRoute();
const { data: cars } = useFetchCars(route.params.city, {
  make: route.query.make,
  minPrice: route.query.minPrice,
  maxPrice: route.query.maxPrice,
  city: route.params.city,
});

watch(
  () => route.query,
  () => {
    window.location.reload(true);
  }
);
</script>
