<template>
  <div class="mt-20 shadow rounded">
    <CarMessageCard
      v-for="message in messages"
      :key="message.id"
      :message="message"
    />
  </div>
</template>

<script setup>
const route = useRoute();
definePageMeta({
  layout: "custom",
});

const { data: messages } = useFetch(
  `/api/car/listings/${route.params.id}/message`
);
</script>
