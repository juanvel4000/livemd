<script setup lang="ts">
import { ref, watch } from "vue";

const content = ref("");

const html = ref("");
</script>

<template>
  <div
    class="min-h-screen bg-neutral-300 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-300 p-1"
  >
    <div
      class="border rounded-md border-neutral-200 dark:border-neutral-800 p-2"
    >
      <h1 class="font-bold animate-pulse">LiveMD</h1>
    </div>
    <div class="flex flex-1 gap-2 p-2 min-h-96">
      <textarea
        v-model="content"
        class="p-2 border border-neutral-200 dark:border-neutral-800 rounded-md flex-1 resize-none"
      ></textarea>
      <div
        class="p-2 border rounded-md border-neutral-200 dark:border-neutral-800 flex-1 overflow-auto prose dark:prose-invert"
        v-html="html"
      ></div>
    </div>
  </div>
</template>
