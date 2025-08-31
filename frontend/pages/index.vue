<template>
  <div class="max-w-xl mx-auto mt-10 p-4">
    <h1 class="text-3xl font-bold mb-4">Mini Note App</h1>

    <!-- Add Note Form -->
    <form @submit.prevent="addNote" class="mb-6 flex gap-2">
      <input v-model="newTitle" placeholder="Title" class="border p-2 flex-1 rounded"/>
      <input v-model="newContent" placeholder="Content" class="border p-2 flex-2 rounded"/>
      <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Add</button>
    </form>

    <!-- Notes List -->
    <div class="space-y-4">
      <NoteCard
        v-for="note in notes"
        :key="note.id"
        :note="note"
        @delete-note="deleteNote"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import NoteCard from "../components/NoteCard.vue";

const notes = ref([]);
const newTitle = ref("");
const newContent = ref("");

const fetchNotes = async () => {
  const res = await fetch("http://localhost:3001/notes");
  notes.value = await res.json();
};

const addNote = async () => {
  if (!newTitle.value || !newContent.value) return;
  const res = await fetch("http://localhost:3001/notes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: newTitle.value, content: newContent.value }),
  });
  const note = await res.json();
  notes.value.push(note);
  newTitle.value = "";
  newContent.value = "";
};

const deleteNote = async (id) => {
  await fetch(`http://localhost:3001/notes/${id}`, { method: "DELETE" });
  notes.value = notes.value.filter(n => n.id !== id);
};

onMounted(fetchNotes);
</script>
