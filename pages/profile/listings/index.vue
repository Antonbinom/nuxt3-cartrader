<template>
  <div>
    <div class="flex justify-between m-24 items-center">
      <h1 class="text-6xl">My listings</h1>
      <NuxtLink
        class="w-9 h-9 bg-blue-400 flex justify-center items-center rounded-full text-white font-bold cursor-pointer"
        to="/profile/listings/create"
        >+</NuxtLink
      >
    </div>
    <div class="shadow rounded top-3 mt-5">
      <CarListingCard
        v-for="listing in listings"
        :key="listing.id"
        :listing="listing"
      />
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "custom",
});

const { listings } = useCars();
</script>
