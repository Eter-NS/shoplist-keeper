<template>
  <div class="container">
    <LanguageSelect class="language-button" />
    <main>
      <div v-for="(note, index) in filteredNotes" :key="index">
        <NoteGroupComponent :noteGroup="note" :index="index" />
      </div>
    </main>
    <RouterLink to="/createGroup" class="routerlink">
      <div class="button-body">
        <p class="button-body__animation-element"></p>
      </div>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import { storeToRefs } from "pinia";
import LanguageSelect from "../languageSelect.vue";
import NoteGroupComponent from "../noteGroup.vue";
import { useNotesStore } from "../stores/notes";
import { ref } from "vue";

const notesStore = useNotesStore();
const { filteredNotes, filter } = storeToRefs(notesStore);
// const {} = notesStore;
</script>

<style scoped lang="scss">
@use "../../scss/components/addButton";

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.language-button {
  margin: 5px;
  align-self: flex-end;
}

.routerlink {
  position: fixed;
  bottom: 5vmin;
  right: 5vmin;
}
</style>
