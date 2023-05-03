import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { add48Hours } from "./tools/add48Hours";
import { checkForExpiredNotes } from "./tools/checkForExpiredNotes";

type filterType = "all" | "active" | "toDelete";

export interface notes {
  text: string;
  creationDate: Date;
  dateToDelete?: Date;
}

export type NotesArray = Array<notes[]>;
const piniaStoreName = "notes";

export const useNotesStore = defineStore(piniaStoreName, () => {
  // states
  const filter = ref<filterType>("all");
  const notesOBJ = ref([] as NotesArray);
  const notesJSON = localStorage.getItem(piniaStoreName);
  if (notesJSON != null) {
    notesOBJ.value = JSON.parse(notesJSON);

    // test note
    notesOBJ.value.push([{ text: "Test1", creationDate: new Date() }]);

    notesOBJ.value = checkForExpiredNotes(notesOBJ.value);
  }

  // getters
  const filteredNotes = computed(() => {
    switch (filter.value) {
      case "all":
        return notesOBJ;
      case "active":
        notesOBJ.value.forEach((notesGroup) => {
          notesGroup = notesGroup.filter(
            (note) => note.dateToDelete === undefined
          );
        });
        return notesOBJ;
      case "toDelete":
        notesOBJ.value.forEach((notesGroup) => {
          notesGroup = notesGroup.filter(
            (note) => note.dateToDelete !== undefined
          );
        });
        return notesOBJ;
    }
  });

  // actions
  function createNewNote(
    { text, creationDate: dataCreation }: notes,
    level: notes[]
  ) {
    /*
    level argument is here as level access, when code calls it, it pushes the change directly into the level it wants

    if we want to add a group of notes, then as the argument we pass notesOBJ.value, when it's lower level, then we point the lover array, a child of notesOBJ.value.
    */
    // Error handling for arguments
    if (typeof text !== "string") throw new Error("The text is not a string");
    if (!text.length) throw new Error("You can't pass an empty text");
    if (typeof dataCreation !== "object")
      throw new Error("The dataCreation is not an object");
    if (!("getTime" in dataCreation))
      throw new Error("The dataCreation is not a Date Object");

    text = text.trim();
    level.push({ text, creationDate: dataCreation });
  }

  function markNoteToDelete(note: notes, array: notes[]) {
    const index = array.indexOf(note);
    if (index === -1)
      throw new Error(`Cannot find the note of text ${note.text}`);
    const expireDate = add48Hours(new Date());

    array[index].dateToDelete = expireDate;
  }

  function forceNotesDeletion() {
    notesOBJ.value.filter(() => false);
    localStorage.removeItem(piniaStoreName);
  }

  return {
    filter,
    filteredNotes,
    createNewNote,
    markNoteToDelete,
    forceNotesDeletion,
  };
});
