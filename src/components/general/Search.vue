<template>
  <div class="search">
    <a-row :gutter="20">
      <a-col :span="8">
        <label>Localização</label>
        <a-auto-complete
          v-model="value"
          :data-source="dataSource"
          style="width: 100%"
          placeholder="Digite a sua cidade, estado..."
          size="large"
          @select="onSelect"
          @search="onSearch"
          @change="onChange"
          allowEnter
        >
          <a-input>
            <template #suffix
              ><img src="../../assets/images/location-pin.png" width="30"
            /></template>
          </a-input>
        </a-auto-complete>
      </a-col>

      <a-col :span="6">
        <label>O que você procura?</label>
        <a-select
          show-search
          placeholder="Selecione"
          size="large"
          v-model="search.type"
          style="width: 100%"
        >
          <a-select-option
            v-for="(item, index) of vehicleTypes"
            :key="index"
            :value="item.value"
          >
            {{ item.label }}
          </a-select-option>
        </a-select>
      </a-col>

      <a-col :span="8">
        <label>Quando?</label>
        <date-picker
          class="mb-20"
          v-model="selectedDate"
          :disabled-date="disabledBeforeTodayAndAfterAWeek"
          range-separator=" a "
          range
          :format="'DD/MM/YYYY'"
        ></date-picker>
      </a-col>

      <a-col :span="2">
        <a-button type="primary" icon="search" />
      </a-col>
    </a-row>
  </div>
</template>

<script>
import vehicleTypes from "@/json/vehicleTypes.json";

export default {
  data() {
    return {
      search: {
        type: undefined,
      },
      value: "",
      dataSource: [],
      selectedDate: "",
      vehicleTypes,
    };
  },
  watch: {
    value(val) {
      console.log("value", val);
    },
  },
  methods: {
    disabledBeforeTodayAndAfterAWeek(date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      return date < today;
    },
    onSearch(searchText) {
      this.dataSource = !searchText
        ? []
        : [searchText, searchText.repeat(2), searchText.repeat(3)];
    },
    onSelect(value) {
      console.log("onSelect", value);
    },
    onChange(value) {
      console.log("onChange", value);
    },
  },
};
</script>

<style lang="sass" scoped>
input.ant-input
  padding: 20px !important
  height: auto !important
  font-size: 18px !important

.search
  background: #FFF
  border-radius: 0
  padding: 8px 20px
  // input.ant-input
  //   font-size: 24px !important
</style>
