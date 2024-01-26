<template>
  <div class="mt-10">
    <div class="flex w-[600px] justify-between">
      <input
        @change="onChange"
        v-model="message.name"
        type="text"
        class="border p-1"
        placeholder="Name"
      />
      <input
        @change="onChange"
        v-model="message.email"
        type="text"
        class="border p-1"
        placeholder="Email"
      />
      <input
        @change="onChange"
        v-model="message.phone"
        type="text"
        class="border p-1"
        placeholder="Phone"
      />
    </div>
    <div class="flex mt-4 w-[600px]">
      <textarea
        v-model="message.message"
        class="border p-1 w-full"
        placeholder="Message"
      ></textarea>
    </div>
    <button
      :disabled="isSubmitDisabled"
      @click="onSubmit"
      class="bg-blue-400 text-white px-10 py-3 rounded mt-4"
      :class="
        isSubmitDisabled
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-blue-400 cursor-pointer'
      "
    >
      Submit
    </button>
    <div v-if="errorMessage" class="text-red-500 p-3 mt-4">
      {{ errorMessage }}
    </div>
    <div v-if="successMessage" class="text-green-500 p-3 mt-4">
      {{ successMessage }}
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const message = reactive({
  name: "",
  email: "",
  phone: "",
  message: "",
});

const errorMessage = ref("");
const successMessage = ref("");

const isSubmitDisabled = computed(() => {
  for (let key in message) {
    if (!message[key]) return true;
  }
  return false;
});

const onSubmit = async () => {
  successMessage.value = "";
  try {
    await $fetch(`/api/car/listings/${route.params.id}/message`, {
      method: "post",
      body: message,
    });
    for (let key in message) {
      message[key] = "";
    }
    errorMessage.value = "";
    successMessage.value = "Message sent";
  } catch (error) {
    errorMessage.value = error.statusMessage;
    successMessage.value = "";
  }
};

const onChange = () => {
  if (successMessage.value) successMessage.value = "";
};
</script>
