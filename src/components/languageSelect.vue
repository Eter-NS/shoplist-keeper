<template>
  <div
    @mouseover="force = true"
    @click="force = true"
    @mouseleave="force = false"
    class="language-button"
  >
    <button type="button" class="language-button__button">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 24 24"
        class="language-svg"
      >
        <path d="M0 0h24v24H0z" fill="none"></path>
        <path
          d=" M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z "
        ></path>
      </svg>
    </button>
    <ul
      :style="
        force
          ? {
              opacity: '1',
              transform: 'rotateX(0deg)',
              display: 'visible',
            }
          : {
              opacity: '0',
              transform: 'rotateX(90deg)',
              display: 'hidden',
            }
      "
      @mouseleave="force = false"
      class="language-button__list"
    >
      <li
        v-for="(language, index) in supportedLanguages"
        :key="index"
        @click="updateLanguage(language)"
        class="language-button__list-element"
      >
        {{ language }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useLanguageStore, LanguageList } from "./stores/language";
import { ref } from "vue";

const languageStore = useLanguageStore();
const { languagePack, currentLanguage, supportedLanguages } =
  storeToRefs(languageStore);
const { selectLanguage } = languageStore;

const force = ref<boolean>(false);

const updateLanguage = (languageName: string) => {
  if (supportedLanguages.value.includes(languageName)) {
    selectLanguage(languageName as LanguageList);

    document.querySelector<HTMLUListElement>(
      ".language-button__list"
    )!.style.transform = "rotateX(90deg)";
  }
};
</script>

<style scoped lang="scss">
.language-button {
  position: relative;

  &__button {
    background-color: var(--root-color-2);
  }

  &__list {
    position: absolute;
    top: 102%;
    right: 0%;
    width: 150%;
    border: 2px solid #757575;
    border-radius: 10px;
    transform-origin: top center;
    transition: transform 500ms ease;
    overflow-y: hidden;

    &-element {
      // margin: 0 auto;
      list-style: none;
      padding: 5%;
      cursor: pointer;
      background-color: var(--bg-color);
      backdrop-filter: opacity(100%);
      transition: backdrop-filter 500ms ease;

      &:hover {
        // background-color: #444;
        backdrop-filter: opacity(0%);
      }
    }
  }
}
.language-svg {
  width: 24px;
  height: 24px;
  fill: white;

  @media (prefers-color-scheme: light) {
    fill: #0f0f0f;
  }
}
</style>
