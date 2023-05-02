import { defineStore } from "pinia";
import { ref } from "vue";

const id = "language";
const defaultLanguage: LanguageList = "English";

type LanguageList = "Polish" | "English";
export type { LanguageList };

interface localStorageLanguage {
  currentLanguage: LanguageList;
}

interface languagePackFormula {
  [key: string]: string | languagePackFormula;
}

export const useLanguageStore = defineStore(id, () => {
  const supportedLanguages = ref<string[]>(["Polish", "English"]);
  const languageJSON = localStorage.getItem(id);

  const currentLanguage = ref<LanguageList>(defaultLanguage);
  // const languagePack = ref<languagePackFormula>({});
  const languagePack = ref();

  startup();

  function startup() {
    if (languageJSON != null) {
      const parsedJSON = JSON.parse(languageJSON);
      currentLanguage.value = parsedJSON.currentLanguage;
    } else {
      localStorage.setItem(
        id,
        JSON.stringify({ currentLanguage: currentLanguage.value })
      );
    }
    setLanguage();
  }

  function selectLanguage(language: LanguageList) {
    if (language === currentLanguage.value) return;
    switch (language) {
      case "English":
      case "Polish":
        currentLanguage.value = language;
        localStorage.setItem(
          id,
          JSON.stringify({ currentLanguage: currentLanguage.value })
        );
        setLanguage();
        break;

      default:
        throw new Error("Unknown language");
    }
  }

  function setLanguage() {
    fetch(`/src/assets/lang/${currentLanguage.value.toLowerCase()}.json`)
      .then((res) => res.json())
      .then((res) => {
        languagePack.value = res;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return { currentLanguage, selectLanguage, languagePack, supportedLanguages };
});
