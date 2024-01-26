<template>
  <div class="p-4 even:bg-gray-100">
    <h1 class="font-bold text-2xl">{{ message.name }}</h1>
    <p class="text-gray-700">
      {{ message.message }}
    </p>
    <div class="mt-4 flex items-center">
      <p class="text-green-700 mr-10">{{ message.email }}</p>
      <p class="text-blue-500">{{ message.phone }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  message: Array,
});
</script>
