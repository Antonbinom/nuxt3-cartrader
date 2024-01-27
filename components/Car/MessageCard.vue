<template>
  <div class="p-4 even:bg-gray-100">
    <h1 class="font-bold text-2xl">{{ message.name }}</h1>
    <p class="text-gray-700">
      {{ message.message }}
    </p>
    <div class="mt-4 flex items-center">
      <a
        :href="`mailto:${message.email}`"
        class="text-green-700 mr-10 cursor-pointer"
        >{{ message.email }}</a
      >
      <a :href="`tel:${message.phone}`" class="text-blue-500 cursor-pointer">{{
        message.phone
      }}</a>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  message: Array,
});
</script>
