<template>
  <div class="mt-10 flex flex-col items-center">
    <h1 class="text-5xl font-bold mb-7">Login</h1>
    <button
      @click="login('github')"
      class="w-[300px] bg-red-400 p-3 rounded text-white font-bold mb-3"
    >
      Login with GitHub
    </button>
    <button
      @click="login('facebook')"
      class="w-[300px] bg-red-400 p-3 rounded text-white font-bold"
    >
      Login with Facebook
    </button>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "custom",
});
useHead({
  title: "login",
});

const { login } = useAuth();
</script>
