
//PARTE 1
const form = document.getElementById('form');
const noteInput = document.getElementById('noteInput');
const notesContainer = document.getElementById('notesContainer');

// Cargar notas desde localstorage al cargar la página
window.addEventListener('load', () => {
  loadNotes();
});

// Agregar una nueva nota
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const noteText = noteInput.value;
  if (noteText.trim() !== '') {
    addNoteToLocalStorage(noteText);
    noteInput.value = '';
    loadNotes();
  }
});
//PARTE 2
// Editar una nota existente
notesContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('edit-button')) {
    const noteElement = e.target.parentNode;
    const noteId = noteElement.dataset.id;
    const existingNoteText = noteElement.querySelector('.note-text').textContent;

    const newNoteText = prompt('Escribe una nueva nota:', existingNoteText);

    if (newNoteText != null && newNoteText.trim() !== '') {
      updateNoteInLocalStorage(noteId, newNoteText);
      loadNotes();
    }
  }
});

// Eliminar una nota existente
notesContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-button')) {
    const noteElement = e.target.parentNode;
    const noteId = noteElement.dataset.id;

    deleteNoteFromLocalStorage(noteId);
    loadNotes();
  }
});
//PARTE 3
// Cargar notas desde localstorage
function loadNotes() {
  notesContainer.innerHTML = '';

  const notes = getNotesFromLocalStorage();

  notes.forEach((note) => {
    const noteElement = document.createElement('div');
    noteElement.classList.add('note');
    noteElement.dataset.id = note.id;

    const noteTextElement = document.createElement('span');
    noteTextElement.classList.add('note-text');
    noteTextElement.textContent = note.text;

    const editButton = document.createElement('button');
    editButton.classList.add('edit-button');
    editButton.textContent = 'Editar';

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = 'Eliminar';

    noteElement.appendChild(noteTextElement);
    noteElement.appendChild(editButton);
    noteElement.appendChild(deleteButton);

    notesContainer.appendChild(noteElement);
  });
}

// Obtener las notas almacenadas en localstorage
function getNotesFromLocalStorage() {
  let notes = localStorage.getItem('notes');
  if (notes === null) {
    return [];
  } else {
    return JSON.parse(notes);
  }
}
//PARTE 4
// Agregar una nota a localstorage
function addNoteToLocalStorage(text) {
  const notes = getNotesFromLocalStorage();
  const newNote = { id: Date.now(), text: text };
  notes.push(newNote);
  localStorage.setItem('notes', JSON.stringify(notes));
}

// Actualizar una nota en localstorage
function updateNoteInLocalStorage(id, newText) {
  const notes = getNotesFromLocalStorage();
  const noteToUpdate = notes.find((note) => note.id == id);
  if (noteToUpdate != null) {
    noteToUpdate.text = newText;
    localStorage.setItem('notes', JSON.stringify(notes));
  }
}

// Eliminar una nota de localstorage
function deleteNoteFromLocalStorage(id) {
  const notes = getNotesFromLocalStorage();
  const updatedNotes = notes.filter((note) => note.id != id);
  localStorage.setItem('notes', JSON.stringify(updatedNotes));
}