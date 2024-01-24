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
      />
      <CarAdTextarea
        title="Description *"
        placeholder=""
        name="description"
        @change-input="onChangeInput"
      />
      <CarAdImage />
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
    image: null,
  };
});

const inputs = [
  {
    id: 1,
    title: "Make *",
    name: "make",
    placeholder: "Honda",
  },
  {
    id: 2,
    title: "Year *",
    name: "year",
    placeholder: "2022",
  },
  {
    id: 3,
    title: "City *",
    name: "city",
    placeholder: "New York",
  },
  {
    id: 4,
    title: "Features *",
    name: "featuers",
    placeholder: "No Accidents",
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

const onChangeInput = (data, name) => {
  info.value[name] = data;
};
</script>
