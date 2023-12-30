<template>
  <div>
    <div class="mt-32 flex">
      <CarSideBar />
      <NuxtPage />
    </div>
  </div>
</template>

<script setup>
const { getPageTitle } = useUtils()

definePageMeta({
  layout: 'custom'
})

useHead({
  title: getPageTitle()
})

</script>