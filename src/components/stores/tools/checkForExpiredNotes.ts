import { NotesArray, notes } from "../notes";

export function checkForExpiredNotes(notes: NotesArray): NotesArray {
  notes.forEach((noteGroup: notes[]) => {
    noteGroup = noteGroup.filter((note: notes) => {
      if (
        "dateToDelete" in note &&
        typeof note.dateToDelete === "object" &&
        "getTime" in note.dateToDelete
      ) {
        return note.dateToDelete!.getTime() >= Date.now();
        // Has the 48h passed already? if not, return the true
      } else {
        return true;
      }
    });
  });

  return notes;
}
