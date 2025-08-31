import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
app.use(cors());
app.use(express.json());

let notes = []; // In-memory storage. Optionally read from notes.json

// Get all notes
app.get("/notes", (req, res) => {
  res.json(notes);
});

// Add new note
app.post("/notes", (req, res) => {
  const { title, content } = req.body;
  const newNote = { id: Date.now(), title, content };
  notes.push(newNote);
  res.status(201).json(newNote);
});

// Delete note
app.delete("/notes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  notes = notes.filter(note => note.id !== id);
  res.status(204).send();
});

app.listen(3001, () => console.log("Server running on http://localhost:3001"));
