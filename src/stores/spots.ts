import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Spot, SpotType } from "@/types/spot";
import spotsData from "@/data/spots.json";

export const useSpotsStore = defineStore("spots", () => {
  const spots = ref<Spot[]>(spotsData as Spot[]);
  const selectedType = ref<SpotType | "all">("all");
  const searchQuery = ref("");

  const filteredSpots = computed(() => {
    return spots.value.filter((spot) => {
      const matchType =
        selectedType.value === "all" || spot.type === selectedType.value;
      const matchSearch =
        !searchQuery.value ||
        spot.name.includes(searchQuery.value) ||
        spot.province.includes(searchQuery.value) ||
        spot.summary.includes(searchQuery.value);
      return matchType && matchSearch;
    });
  });

  function getSpotById(id: string): Spot | undefined {
    return spots.value.find((spot) => spot.id === id);
  }

  function getSpotIndex(id: string): number {
    return spots.value.findIndex((spot) => spot.id === id);
  }

  function getPrevSpot(id: string): Spot | undefined {
    const index = getSpotIndex(id);
    if (index <= 0) return undefined;
    return spots.value[index - 1];
  }

  function getNextSpot(id: string): Spot | undefined {
    const index = getSpotIndex(id);
    if (index >= spots.value.length - 1) return undefined;
    return spots.value[index + 1];
  }

  function setType(type: SpotType | "all") {
    selectedType.value = type;
  }

  function setSearch(query: string) {
    searchQuery.value = query;
  }

  return {
    spots,
    selectedType,
    searchQuery,
    filteredSpots,
    getSpotById,
    getPrevSpot,
    getNextSpot,
    setType,
    setSearch,
  };
});
