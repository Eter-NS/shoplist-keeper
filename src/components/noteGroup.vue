<template>
  <div>
    <h3></h3>
    <div class="notes">
      <note
        v-for="(note, noteIndex) in currentGroup"
        :noteIndex="noteIndex"
        :noteGroup="currentGroup"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useNotesStore } from "./stores/notes";
import { storeToRefs } from "pinia";
import note from "./note.vue";

const notesStore = useNotesStore();

const { filteredNotes } = storeToRefs(notesStore);
// const {} = notesStore

// import { notes } from './stores/notes';
const { index } = defineProps({
  index: {
    required: true,
    type: Number,
  },
});

const isNotInGroupRange = filteredNotes.value.length < index || index < 0;
if (isNotInGroupRange) throw new Error("Unknown group");
const currentGroup = ref(filteredNotes.value[index]);
</script>

<style scoped lang="scss"></style>
