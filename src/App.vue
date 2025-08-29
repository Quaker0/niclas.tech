<script setup lang="ts">
import WriteText from "./components/WriteText.vue";
import pageText from "./pageText.json";
import avatar from "./assets/avatar.png";
import { ref } from "vue";

const writeElement = ref(0);

function next(step: number, delay = 2000) {
  setTimeout(() => {
    writeElement.value = step;
  }, delay);
}
</script>

<template>
  <img :src="avatar" class="logo" alt="Niclas" />
  <WriteText
    header="Background"
    :text="pageText.background"
    :active="writeElement === 0"
    :writingDone="() => next(1)"
  />
  <WriteText
    header="Contact"
    :text="pageText.contact"
    :links="pageText.links"
    :active="writeElement === 1"
    :writingDone="() => next(2)"
  />
  <div
    class="fade-in"
    v-if="writeElement >= 2"
    style="
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-bottom: 10rem;
    "
  >
    <div v-for="(project, index) in pageText.projects" class="project">
      <WriteText
        :key="project.title + index"
        :header="'Project ' + (index + 1) + ' - ' + project.title"
        :text="project.description"
        :links="project.links"
        :active="writeElement === 2 + index"
        :tags="project.technologies"
        :writingDone="() => next(3 + index)"
      />
    </div>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
}

.project {
  max-width: 750px;
  padding: 1rem;
}
</style>
