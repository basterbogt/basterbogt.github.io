
document.querySelector('#newNoteButton').addEventListener("click", toggleNoteSection);

function toggleNoteSection(e) {
    e.preventDefault();

    let newNoteSection = document.querySelector('#newNote');
    setNoteSection(newNoteSection.style.display == "none" || newNoteSection.style.display == "");

    return false;
};

function setNoteSection(boolean) {
    let newNoteSection = document.querySelector('#newNote');
    newNoteSection.style.display = boolean ? "block" : "none";
}

function hideNoteSection(){
    setNoteSection(false);
}

function showNoteSection(){
    setNoteSection(true);
}


