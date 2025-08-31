<template>
  <div class="border p-4 rounded shadow flex justify-between items-start">
    <div>
      <h2 class="font-bold">{{ note.title }}</h2>
      <p>{{ note.content }}</p>
    </div>
    <button @click="$emit('delete-note', note.id)" class="text-red-500 hover:underline">Delete</button>
  </div>
</template>

<script setup>
defineProps({ note: Object });
</script>
