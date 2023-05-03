<template>
  <form class="form">
    <label for="newGroupName"> {{ languagePack.groupFormCreator.label }}</label>
    <input type="text" id="newGroupName" class="form__input" />
    <button type="submit" class="form__submit-button"></button>
  </form>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useLanguageStore } from "../stores/language";

const languageStore = useLanguageStore();
const { languagePack } = storeToRefs(languageStore);
</script>

<style scoped lang="scss">
form {
  display: grid;
  grid-template-columns: 1fr;

  @media screen and (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
