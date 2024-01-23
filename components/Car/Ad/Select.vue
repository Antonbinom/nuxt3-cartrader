<template>
  <div class="flex flex-col mt-2 w-[48%]">
    <label for="" class="mb-1 text-sm text-cyan-500">{{ title }}</label>
    <select
      @change="onChange"
      v-model="state"
      name=""
      id=""
      class="w-100 p-2 rounded border"
    >
      <option v-for="(option, index) in options" :key="index" :value="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  name: String,
  options: Array,
});

const emits = defineEmits(["changeInput"]);
const state = ref("");
const onChange = () => {
  emits("changeInput", state.value, props.name);
};
</script>
