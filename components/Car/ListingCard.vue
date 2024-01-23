<template>
  <div class="flex justify-between mb-4 shadow rounded overflow-hidden">
    <div class="flex">
      <img class="w-80 h-44 mr-3" :src="listing.url" alt="" />
      <div class="p-3">
        <h1 class="text-2xl">{{ listing.name }}</h1>
        <p class="text-blue-400">${{ listing.price }}</p>
      </div>
    </div>
    <div class="flex p-3">
      <NuxtLink
        class="mr-4 text-blue-500"
        :to="`/profile/listings/view/${listing.id}`"
        >View</NuxtLink
      >
      <p class="text-red-400 cursor-pointer">Delete</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  listing: Object,
});
</script>
