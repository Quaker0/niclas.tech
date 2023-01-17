<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

const props = defineProps<{
  header: string;
  text: string;
  active?: boolean;
  writingDone?: () => void;
  links?: string[][];
  tags?: string[];
}>();

const timer = ref();
const counter = ref(0);

onMounted(() => {
  timer.value = setInterval(() => {
    if (props.active) {
      counter.value++;
    }
    if (counter.value === props.text.length) {
      counter.value++;
      props.writingDone?.();
    }
  }, 75);
});
onBeforeUnmount(() => {
  clearInterval(timer.value);
});
</script>

<template>
  <div>
    <h2 v-if="active || counter > 0" class="fade-in">{{ header }}</h2>
    <p
      :class="[
        'write-text',
        counter > text.length && 'blinking',
        active && 'active',
      ]"
    >
      {{ text.slice(0, counter) }}
    </p>
    <ul
      class="fade-in"
      v-if="counter > props.text.length"
      style="display: flex; justify-content: center"
    >
      <li v-for="tag in tags" style="padding-right: 2rem" class="tag">
        <strong>{{ tag }}</strong>
      </li>
    </ul>
    <ul
      class="fade-in"
      v-if="counter > props.text.length"
      style="display: flex; justify-content: center"
    >
      <li v-for="[title, link] in links" style="padding-right: 2rem">
        <a :href="link" target="_blank">{{ title }}</a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.write-text {
  color: white;
}

li.tag {
  display: block;
}

li.tag:before {
  content: "+";
  margin-right: 4px;
  margin-left: -1rem;
  font-weight: bold;
}

@keyframes cursor-blink {
  0% {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.fade-in {
  animation: fadeIn 2s;
}

.logo {
  width: 1rem;
}

.write-text.active::after {
  content: "";
  width: 3px;
  height: 15px;
  background: white;
  display: inline-block;
}

.write-text.blinking.active::after {
  animation: cursor-blink 1.3s steps(1) infinite;
}

.cursor {
  color: white;
}

a {
  color: rgb(62, 141, 216);
}
</style>
