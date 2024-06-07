document.addEventListener('DOMContentLoaded', (event) => {
    const notesList = document.getElementById('notes-list');
    const noteTitle = document.getElementById('note-title');
    const noteText = document.getElementById('note-text');
    const saveNoteButton = document.getElementById('save-note');
    const clearNoteButton = document.getElementById('clear-note');

    function getNotes() {
        fetch('/api/notes')
            .then(response => response.json())
            .then(data => {
                notesList.innerHTML = '';
                data.forEach(note => {
                    const li = document.createElement('li');
                    li.textContent = note.title;
                    li.dataset.id = note.id;
                    li.addEventListener('click', () => {
                        noteTitle.value = note.title;
                        noteText.value = note.text;
                    });
                    notesList.appendChild(li);
                });
            });
    }

    function saveNote() {
        const note = {
            title: noteTitle.value,
            text: noteText.value
        };

        fetch('/api/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
        .then(response => response.json())
        .then(() => {
            noteTitle.value = '';
            noteText.value = '';
            getNotes();
        });
    }

    function clearNote() {
        noteTitle.value = '';
        noteText.value = '';
    }

    saveNoteButton.addEventListener('click', saveNote);
    clearNoteButton.addEventListener('click', clearNote);

    getNotes();
});