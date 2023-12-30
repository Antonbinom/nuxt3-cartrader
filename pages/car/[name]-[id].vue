<template>
  <div>
    <CarDetailsHero />
    <CarDetailsAttribute />
    <CarDetailsDescription />
    <CarDetailsContact />
  </div>
</template>

<script setup>
const { toTitleCase } = useUtils();
const route = useRoute();
definePageMeta({
  layout: 'custom'
})
useHead({
  title: toTitleCase(route.params.name)
})

</script>