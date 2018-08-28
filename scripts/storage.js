let notesStorageName = 'notes';
let undoStorageName = 'undo';

if (typeof (Storage) !== "undefined") {
    loadNotes();
} else {
    // Sorry! No Web Storage support..
    console.log("Nope, storage not available...");
}

document.querySelector('#button').addEventListener("click", saveNote);

function saveNote() {
    // If Web Storage not supported show warning and leave function
    if (typeof (Storage) === 'undefined') {
        alert('Web Storage is not supported!');
        return;
    }

    // Get values:
    let titleValue = document.querySelector('#title').value;
    let contentValue = document.querySelector('#content').value;
    if (titleValue == "" || contentValue == "") {
        console.error("Missing input!");
        return;
    }

    // If there are stored notes, retrieve the string and parse the string into an array with objects
    let notes = [];
    if (window.localStorage[notesStorageName]) {
        notes = JSON.parse(window.localStorage[notesStorageName]);
    }

    notes.unshift({
        title: titleValue,
        content: contentValue,
        timestamp: new Date()
    });

    window.localStorage[notesStorageName] = JSON.stringify(notes);
    if (window.localStorage[undoStorageName]) { //Remove 'undo' value in case this was still there.
        window.localStorage.removeItem(undoStorageName);
    }

    document.querySelector('#title').value = '';
    document.querySelector('#content').value = '';

    loadNotes();
    hideNoteSection();
}

function loadNotes() {
    // If Web Storage not supported show warning and leave function
    if (typeof (Storage) === 'undefined') {
        alert('Web Storage is not supported!');
        return;
    }

    if (!window.localStorage[notesStorageName]) {
        showNoteSection();
        UpdateUndoButton();
        return;
    }

    let list = JSON.parse(window.localStorage[notesStorageName]);

    let template = document.querySelector('#noteTemplate');
    document.querySelector('#main').innerHTML = "";

    for (note of list) {
        let newNote = template.content.cloneNode(true);  // true = include all possible sub elements
        newNote.querySelector('.noteTitle').innerHTML = note.title;
        newNote.querySelector('.noteContent').innerHTML = note.content;
        let time = new Date(note.timestamp);
        newNote.querySelector('.noteTimestamp').innerHTML = time.customFormat("#DD#/#MM#/#YYYY# #hh#:#mm#");
        newNote.querySelector('.noteDeleteButton').setAttribute("onClick", "javascript: deleteNote(" + time.getTime() + ");");
        document.querySelector('#main').appendChild(newNote);
    }

    UpdateUndoButton();
    toggleItem(document.querySelectorAll('.note'));
}

var previousNotesList = [];

function deleteNote(toBeDeletedTimestamp) {
    // If Web Storage not supported show warning and leave function
    if (typeof (Storage) === 'undefined') {
        alert('Web Storage is not supported!');
        return;
    }

    // If there are stored notes, retrieve the string and parse the string into an array with objects
    let notes = [];
    if (window.localStorage[notesStorageName]) {
        notes = JSON.parse(window.localStorage[notesStorageName]);
    }

    var filteredNotes = notes.filter(obj => {
        return new Date(obj.timestamp).getTime() != toBeDeletedTimestamp
    });

    window.localStorage[undoStorageName] = JSON.stringify(notes);
    window.localStorage[notesStorageName] = JSON.stringify(filteredNotes);

    loadNotes();
}

function UndoDelete() {
    if (window.localStorage[undoStorageName]) {
        window.localStorage[notesStorageName] = window.localStorage[undoStorageName];
        window.localStorage.removeItem(undoStorageName);
        loadNotes();
    }
}

document.querySelector('#undoButton').addEventListener("click", UndoDelete);

function UpdateUndoButton() {
    let undoButton = document.querySelector('#undoButton');
    undoButton.style.display = (window.localStorage[undoStorageName]) ? "block" : "none";
}

function toggleItem(elem) {
    for (var i = 0; i < elem.length; i++) {
        elem[i].addEventListener("click", function (e) {
            var current = this;
            for (var i = 0; i < elem.length; i++) {
                if (current != elem[i]) {
                    elem[i].classList.remove('active');
                } else if (current.classList.contains('active') === true) {
                    current.classList.remove('active');
                } else {
                    current.classList.add('active')
                }
            }
            e.preventDefault();
        });
    };
}
