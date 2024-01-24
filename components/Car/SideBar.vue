<template>
  <div class="shadow border w-64 mr-10 z-30 h-[190px] min-w-fit">
    <div class="p-5 flex justify-between relative cursor-pointer border-b">
      <h3>Location</h3>
      <h3
        @click="updateModal('location')"
        class="text-blue-400 capitalize ml-2"
      >
        {{ route.params.city }}
      </h3>
      <div
        v-if="modal.location"
        class="absolute border shadow left-56 p-5 top-1 -m-1 bg-white"
      >
        <input type="text" class="border p-1 rounded" v-model="city" />
        <button
          @click="onChangeLocation"
          class="bg-blue-400 w-full mt-2 rounded text-white p-1"
        >
          Apply
        </button>
      </div>
    </div>

    <div class="p-5 flex justify-between relative cursor-pointer border-b">
      <h3>Make</h3>
      <h3 @click="updateModal('make')" class="text-blue-400 capitalize ml-2">
        {{ route.params.make || route.query.make || "Any" }}
      </h3>
      <div
        v-if="modal.make"
        class="absolute border shadow left-56 p-5 top-1 -m-1 w-[600px] flex justify-between flex-wrap bg-white"
      >
        <h4
          v-for="make in makes"
          :key="make"
          @click="onChangeMake(make)"
          class="w-1/3"
        >
          {{ make }}
        </h4>
      </div>
    </div>

    <div class="p-5 flex justify-between relative cursor-pointer border-b">
      <h3>Price</h3>
      <h3 @click="updateModal('price')" class="text-blue-400 capitalize ml-2">
        {{ priceRangeText }}
      </h3>
      <div
        v-if="modal.price"
        class="absolute border shadow left-65 p-5 top-1 -m-1 bg-white"
      >
        <input
          class="border p-1 rounded mb-1"
          v-model="priceRange.min"
          type="number"
          placeholder="Min"
        />
        <input
          class="border p-1 rounded"
          v-model="priceRange.max"
          type="number"
          placeholder="Max"
        />
        <button
          @click="onChangePrice"
          class="bg-blue-400 w-full mt-2 p-1 rounded to-white"
        >
          Apply
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const router = useRouter();

const { makes } = useCars();

const modal = ref({
  location: false,
  make: false,
  price: false,
});

const priceRangeText = computed(() => {
  const minPrice = route.query.minPrice;
  const maxPrice = route.query.maxPrice;
  if (!minPrice && !maxPrice) return "Any";
  else if (!minPrice && maxPrice) {
    return `$0 - $${maxPrice}`;
  } else if (minPrice && !maxPrice) {
    return `$${minPrice} - $99999999`;
  } else return `$${minPrice} - $${maxPrice}`;
});

const city = ref("");
const priceRange = ref({
  min: "",
  max: "",
});

const getRouteQueryParams = () => {
  const { make, minPrice, maxPrice } = route.query;

  return {
    make,
    minPrice,
    maxPrice,
  };
};

const updateModal = (key) => {
  modal.value[key] = !modal.value[key];
};

const onChangeLocation = () => {
  if (!city.value) return;
  if (!isNaN(parseInt(city.value))) {
    throw createError({
      statusCode: 400,
      message: "Invalid city format",
    });
  }
  updateModal("location");
  navigateTo(`/city/${city.value}/car/${route.params.make}`);
  city.value = "";
};

const onChangeMake = (make) => {
  const { minPrice, maxPrice } = getRouteQueryParams();
  const query = {};
  make && (query.make = make);
  minPrice && (query.minPrice = minPrice);
  maxPrice && (query.maxPrice = maxPrice);

  router.push({ query });

  updateModal("make");
};

const onChangePrice = () => {
  updateModal("price");
  const query = {};
  const { make } = getRouteQueryParams();
  make && (query.make = make);

  if (priceRange.value.min) query.minPrice = priceRange.value.min;
  if (priceRange.value.max) query.maxPrice = priceRange.value.max;
  if (
    priceRange.value.min &&
    priceRange.value.max &&
    priceRange.value.min > priceRange.value.max
  ) {
    return;
  }

  router.push({ query });
};
</script>
