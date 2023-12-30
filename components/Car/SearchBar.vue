<template>
  <div class="font-serif w-[1000px] text-2xl rounded-full bg-white flex justify-between overflow-hidden drop-shadow-2xl mx-auto"
    :class="searchError ? 'border-red-500 border' : ''">
    <input v-model="city" @input="!city ? (searchError = true) : (searchError = false)" type="text"
      class="py-3 px-5 w-full text-2xl rounded-full focus:outline-none" :placeholder="placeholder" />
    <button @click="handleSearch" class="bg-sky-500 px-10 text-white">Search</button>
  </div>
</template>

<script setup>
const city = ref('');
const placeholder = ref('Search by city...')
const searchError = ref(false)
// const router = useRouter();

const handleSearch = () => {
  if (!city.value) {
    searchError.value = true
    placeholder.value = 'Введите название города'
    return
  }
  navigateTo(`/city/${city.value}/car`)
  // router.push(`/city/${city.value}/car`)
}
</script>