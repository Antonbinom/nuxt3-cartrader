<template>
  <div>
    <div>
      <h1 class="text-6xl mt-24">Create a New Listing</h1>
    </div>
    <div class="flex flex-wrap justify-between p-3 mt-5 shadow rounded">
      <CarAdSelect
        title="Make *"
        :options="makes"
        name="make"
        @change-input="onChangeInput"
      />
      <CarAdInput
        v-for="input in inputs"
        :key="input.id"
        :title="input.title"
        :placeholder="input.placeholder"
        :name="input.name"
        @change-input="onChangeInput"
      />
      <CarAdTextarea
        title="Description *"
        placeholder=""
        name="description"
        @change-input="onChangeInput"
      />
      <CarAdImage @change-input="onChangeInput" />
      <div>
        <button
          @click="handleSubmit"
          :disabled="isSubmitDisabled"
          class="text-white rounded py-2 px-7 mt-7"
          :class="
            isSubmitDisabled
              ? 'cursor-not-allowed bg-gray-400'
              : 'cursor-pointer bg-blue-400'
          "
        >
          Submit
        </button>
        <div class="text-red-500 p-3 mt-4">{{ errorMessage }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "custom",
  middleware: [
    function (to, from) {
      const user = useSupabaseUser();
      if (user.value) {
        return;
      }
      return navigateTo("/login");
    },
  ],
});

useHead({
  title: "create",
});

const user = useSupabaseUser();
const supabase = useSupabaseClient();

const { makes } = useCars();

const info = useState("adInfo", () => {
  return {
    model: "",
    make: "",
    miles: "",
    year: "",
    price: "",
    city: "",
    features: "",
    seats: "",
    description: "",
    url: null,
  };
});

const inputs = [
  {
    id: 1,
    title: "Year *",
    name: "year",
    placeholder: "2022",
  },
  {
    id: 2,
    title: "City *",
    name: "city",
    placeholder: "New York",
  },
  {
    id: 3,
    title: "Price *",
    name: "price",
    placeholder: "10000",
  },
  {
    id: 4,
    title: "Features *",
    name: "features",
    placeholder: "No Accidents, New Car",
  },
  {
    id: 5,
    title: "Model *",
    name: "model",
    placeholder: "S5",
  },
  {
    id: 6,
    title: "Miles *",
    name: "miles",
    placeholder: "50000",
  },
  {
    id: 7,
    title: "Number of Seats *",
    name: "seats",
    placeholder: "5",
  },
];

const errorMessage = ref("");

const isSubmitDisabled = computed(() => {
  for (let key in info.value) {
    if (!info.value[key]) return true;
  }
  return false;
});

const onChangeInput = (data, name) => {
  info.value[name] = data;
};

const handleSubmit = async () => {
  const fileName = Math.floor(Math.random() * 1000000000000000);
  const { data, error } = await supabase.storage
    .from("images")
    .upload("public/" + fileName, info.value.url);

  if (error) {
    errorMessage.value = "Can not upload image";
  }
  const body = {
    ...info.value,
    city: info.value.city.toLowerCase(),
    features: info.value.features.split(", "),
    miles: +info.value.miles,
    year: +info.value.year,
    price: +info.value.price,
    numberOfSeats: +info.value.seats,
    name: `${info.value.make} ${info.value.model}`,
    listerId: user.value.id,
    url: data.path,
  };

  delete body.seats;

  try {
    await $fetch("/api/car/listings", {
      method: "post",
      body,
    });
    navigateTo("/profile/listings");
  } catch (error) {
    errorMessage.value = error.statusMessage;
    await supabase.storage.from("images").remove(data.path);
  }
};
</script>
