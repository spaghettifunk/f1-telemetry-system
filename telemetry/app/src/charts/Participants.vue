<script setup lang="ts">
import { computed, onMounted, ref, h } from "vue";
import { Participant, Lap } from "../../../models/telemetry.model";
import { usePastStore } from "../store/past";

const pastStore = usePastStore();

const participantsRef = ref([] as Participant[]);
const lapsRef = ref([] as Lap[]);
const loadingRef = ref(true);
const columns = [
  {
    title: "Driver",
    key: "driver_name",
  },
  {
    title: "Number",
    key: "driver_race_number",
  },
  {
    title: "Fastest Lap",
    key: "fastest_lap",
  },
  {
    title: "Team",
    key: "team_name",
  },
];

onMounted(() => {
  pastStore
    .fetchParticipants(pastStore.currentUserID, pastStore.currentSessionID)
    .then(() => {
      loadingRef.value = false;
      let data = pastStore.getParticipants.filter(
        ({ driver_nationality }) => driver_nationality !== "None"
      );
      data.forEach(
        (p) =>
          (p.driver_name =
            p.driver_name.charAt(0).toUpperCase() +
            p.driver_name.slice(1).toLowerCase())
      );
      participantsRef.value = data;
    });
});

var participantsData = computed(() => ({
  columns: columns,
  data: participantsRef,
}));
</script>

<template>
  <div>
    <n-data-table
      remote
      size="small"
      :loading="loadingRef"
      :columns="participantsData.columns"
      :data="participantsData.data.value"
    />
  </div>
</template>

<style></style>
