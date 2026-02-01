<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { Marked } from "marked";
import DOMPurify from "dompurify";
import { getDocument, setDocument } from "./utils/persistance";

const content = ref(getDocument());
const marked = new Marked({
  gfm: true,
});

const html = computed(() =>
  DOMPurify.sanitize(marked.parse(content.value) as string),
);
function saveText() {
  const blob = new Blob([content.value], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "document.md";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function saveHTML() {
  const blob = new Blob([html.value], { type: "text/html" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "document.html";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

watch(content, (value) => {
  setDocument(value);
});

function isEditorFocused(): boolean {
  return document.activeElement?.tagName === "TEXTAREA";
}

function wrapSelection(wrapper: string) {
  const textarea = document.activeElement as HTMLTextAreaElement;
  if (!textarea) return;

  const { selectionStart, selectionEnd, value } = textarea;

  const before = value.slice(0, selectionStart);
  const selected = value.slice(selectionStart, selectionEnd);
  const after = value.slice(selectionEnd);

  content.value = `${before}${wrapper}${selected}${wrapper}${after}`;

  const cursor = selectionStart + wrapper.length;
  requestAnimationFrame(() => {
    textarea.selectionStart = textarea.selectionEnd = selected
      ? cursor + selected.length
      : cursor;
  });
}

function handleKeydown(e: KeyboardEvent) {
  if (!isEditorFocused()) return;

  if ((e.ctrlKey || e.metaKey) && e.key == "s") {
    e.preventDefault();

    if (e.shiftKey) saveHTML();
    else saveText();
  }
  if ((e.ctrlKey || e.metaKey) && e.key == "b") {
    e.preventDefault();
    wrapSelection("**");
  }
  if ((e.ctrlKey || e.metaKey) && e.key == "i") {
    e.preventDefault();
    wrapSelection("_");
  }
}

onMounted(() => {
  document.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
  <div
    class="min-h-screen bg-neutral-300 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-300 p-1"
  >
    <div
      class="border rounded-md border-neutral-200 dark:border-neutral-800 p-2 flex items-center justify-between"
    >
      <h1 class="font-bold">
        <span class="font-bold animate-pulse">LiveMD</span>
        <span class="font-semibold"
          >:
          <i
            >Minimalistic
            <span title="What You See Is What You Get">WYSIWYG</span>
            Markdown Editor</i
          >
        </span>
      </h1>
      <div class="font-bold">
        <button type="button" @click="saveText" class="hover:underline me-2">
          Save
        </button>
        <button type="button" @click="saveHTML" class="hover:underline">
          Save as HTML
        </button>
      </div>
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
