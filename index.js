const btn = document.getElementById('btn');
const app = document.getElementById('app');



getNotes().forEach((note) => {
    const noteEle = createNoteEle(note.id, note.content);
    app.insertBefore(noteEle, btn);

})







function createNoteEle(id, content) {
    const element = document.createElement('textarea');
    element.classList.add('note');
    element.placeholder = "Empty note";
    element.value = content;


    element.addEventListener('dblclick', () => {
        const flag = confirm("Do you want to delete this note ?");
        if (flag) {
            deleteNote(id, element);
        }
    });



    element.addEventListener('input', () => {
        updateNote(id, element.value);
    });
    return element;

}


function deleteNote(id, element) {
    const notes = getNotes().filter((note) => note.id != id);
    saveNote(notes);
    app.removeChild(element);

}

function updateNote(id, content) {

    const notes = getNotes();
    const target = notes.filter((note) => note.id == id)[0];
    target.content = content;
    saveNote(notes);

}











function addnote() {
    const note = getNotes();
    const noteobj = {
        id: Math.floor(Math.random() * 10000),
        content: "",
    };


    const noteEle = createNoteEle(noteobj.id, noteobj.content);
    app.insertBefore(noteEle, btn);
    note.push(noteobj);
    saveNote(note);

}


function getNotes() {

    return JSON.parse(localStorage.getItem('note-item') || "[]");


}




function saveNote(notes) {
    localStorage.setItem('note-item', JSON.stringify(notes));

}


btn.addEventListener('click', addnote);


