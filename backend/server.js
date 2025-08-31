import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json());

// Path to notes.json
const notesFile = path.join(process.cwd(), "notes.json");

// Helper function to read notes from file
const readNotes = () => {
  try {
    const data = fs.readFileSync(notesFile, "utf-8");
    return JSON.parse(data || "[]");
  } catch (err) {
    return [];
  }
};

// Helper function to write notes to file
const writeNotes = (notes) => {
  fs.writeFileSync(notesFile, JSON.stringify(notes, null, 2));
};

let notes = readNotes();

// Get all notes
app.get("/notes", (req, res) => {
  notes = readNotes(); // refresh from file
  res.json(notes);
});

// Add new note
app.post("/notes", (req, res) => {
  const { title, content } = req.body;
  const newNote = { id: Date.now(), title, content };
  notes.push(newNote);
  writeNotes(notes); // save to file
  res.status(201).json(newNote);
});

// Delete note
app.delete("/notes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  notes = notes.filter(note => note.id !== id);
  writeNotes(notes); // save to file
  res.status(204).send();
});

app.listen(3001, () => console.log("Server running on http://localhost:3001"));
