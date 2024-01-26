<template>
  <div>
    <CarCards v-if="cars?.length" :cars="cars" />
    <h1 v-else>No cars in these conditions</h1>
  </div>
</template>

<script setup>
const route = useRoute();

const getCars = () => {
  const { data } = useFetchCars(route.params.city, {
    make: route.query.make,
    minPrice: route.query.minPrice,
    maxPrice: route.query.maxPrice,
    city: route.params.city,
  });
  return data;
};

let cars = getCars();

watch(
  () => route.query,
  () => {
    cars = getCars();
  }
);
</script>
