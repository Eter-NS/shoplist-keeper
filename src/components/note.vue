<template>
  <div class="list">
    <h3 class="list__text">{{ currentNote. }}</h3>
    <p
      :class="
        currentNote.dateToDelete
          ? 'list__creation-date--expire'
          : 'list__creation-date'
      "
    >
      {{
        currentNote.dateToDelete
          ? currentNote.dateToDelete.toLocaleDateString()
          : currentNote.creationDate.toLocaleDateString()
      }}
    </p>

    <button type="button" @click="markNoteToDelete(currentNote, noteGroup)">
      Mark to delete
    </button>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref } from "vue";
import { useNotesStore, notes } from "./stores/notes";
import { storeToRefs } from "pinia";

const { noteIndex, noteGroup } = defineProps({
  noteIndex: {
    required: true,
    type: Number,
  },
  noteGroup: {
    required: true,
    type: Array as PropType<notes[]>,
  },
});

const notesStore = useNotesStore();

const { filteredNotes } = storeToRefs(notesStore);
const { markNoteToDelete } = notesStore;

const currentNote = ref(noteGroup[noteIndex]);
</script>

<style scoped lang="scss"></style>
