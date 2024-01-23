<template>
  <div class="flex flex-col mt-2 w-[48%]">
    <label class="mb-1 text-sm text-cyan-500">{{ title }}</label>
    <input
      @input="onChange"
      v-model="state"
      :placeholder="placeholder"
      class="w-100 p-2 rounded border"
      :name="name"
      type="text"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  name: String,
  placeholder: String,
});

const emits = defineEmits(["changeInput"]);
const state = ref("");
const onChange = () => {
  emits("changeInput", state.value, props.name);
};
</script>
