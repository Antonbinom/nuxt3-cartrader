<template>
  <div class="columns-md-5 offset-md-1 mt-2 w-[100%]">
    <label class="mb-1 text-sm text-cyan-500" for="">Image*</label>
    <form class="mt-2">
      <div class="form-group">
        <div class="relative">
          <input
            class="opacity-0 absolute cursor-pointer"
            type="file"
            accept="image/*"
            @change="onImageUpload"
          />
          <span class="cursor-pointer">Browser File</span>
        </div>
        <div class="pt-2 mt-3 w-56 border" v-if="image.preview"></div>
        <img class="img-fluid" :src="image.preview" />
      </div>
    </form>
  </div>
</template>

<script setup>
const image = useState("carImage", () => {
  return {
    preview: null,
    image: null,
  };
});

const emits = defineEmits(["changeInput"]);

const onImageUpload = (event) => {
  const input = event.target;
  if (input.files) {
    const reader = new FileReader();
    reader.onload = (e) => {
      image.value.preview = e.target.result;
    };
    image.value.image = input.files[0];
    reader.readAsDataURL(input.files[0]);

    emits("changeInput", input.files[0].name, "url");
  }
};
</script>
