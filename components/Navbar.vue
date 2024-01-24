<template>
  <header
    class="sticky top-0 z-50 flex justify-between items-center space-x-1 border-b bg-white p-4 shadow-md"
  >
    <NuxtLink class="text-3xl font-mono" to="/">cartrader</NuxtLink>
    <div v-if="user" class="flex">
      <NuxtLink to="/profile/listings" class="mr-5">Profile</NuxtLink>
      <span @click="logout" class="cursor-pointer">Logout</span>
    </div>
    <NavLink v-if="!user" @click="login('github')" class="cursor-pointer"
      >Login</NavLink
    >
  </header>
</template>

<script setup>
const user = useSupabaseUser();

const { login, logout } = useAuth();
</script>
