import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCountriesAPI } from "./countryApi";

export const fetchCountries = createAsyncThunk(
  "countries/fetchCountries",
  async () => {
    return await fetchCountriesAPI();
  }
);
const countrySlice = createSlice({
  name: "countries",
  initialState: {
    all: [],
    filtered: [],
    visibleCount: 6,
    region: "All",
  },
  reducers: {
    filterByRegion: (state, action) => {
      state.region = action.payload;
      state.filtered =
        action.payload === "All"
          ? state.all
          : state.all.filter((c) => c.region === action.payload);
      state.visibleCount = 6;
    },
    loadMore: (state) => {
      state.visibleCount += 6;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCountries.fulfilled, (state, action) => {
      state.all = action.payload;
      state.filtered = action.payload;
    });
  },
});

export const { filterByRegion, loadMore } = countrySlice.actions;
export const selectFilteredCountries = (state) => state.countries.filtered;
export default countrySlice.reducer;
