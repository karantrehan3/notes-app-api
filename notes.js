// Importing the File System Package for File Handling Tasks
const fs = require('fs');

/**
 * LoadNotes function reads the JSON File, converts to JSON 
 * and returns it.
 * @returns {object array}
 */
const loadNotes = () =>{
    try{
        const dataBuffer = fs.readFileSync('notes.JSON');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    }catch(e){
        return [];
    }
};


/**
 * saveNotes function saves the notes array (consisting of 
 * objects) as a notes.JSON File.
 * @param {object array} notes 
 */
const saveNotes = (notes) =>{
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.JSON',dataJSON);
};


/**
 * addNotes function reads and loads the JSON file and then
 * stores the array of objects in notes variable. Then a check 
 * is performed to find if a note with the same title already 
 * exists. If not, then a note object is created and pushed to 
 * the notes array and then the saveNotes function is called.
 * If a duplicate note is found then a custom error is thrown.
 * @param {string} title 
 * @param {string} body 
 */
const addNotes = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note)=> note.title === title);

    if(!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes);
    }
    else{
        throw new Error('Notes with the same title Exists, Cannot Add Notes with same titles!');
    }
};

/**
 * modifyNote function firstly reads and loads the JSON file and then
 * stores the array of objects in notes variable. Then we try to find 
 * the index of the note with the given title in the notes array.
 * If an index is not found then an error is thrown. Otherwise, the 
 * body of the note found is replaced by the newBody.
 * @param {string} title 
 * @param {string} newBody 
 */
const modifyNote = (title, newBody) => {
    const notes = loadNotes();
    const index = notes.findIndex((note)=> note.title === title);

    if(index===-1){
        throw new Error('Note with title: `'+title+'` not present!');
    }else{
        notes[index].body = newBody;
        saveNotes(notes);
    }
}

/**
 * removeNote function firstly reads and loads the JSON file and then
 * stores the array of objects in notes variable. Then it filters out
 * the objects which don't match with the title and then saves them
 * in the notes.JSON File. After that, a check is performed that if the
 * length of the original notes array is same as the length of the 
 * filtered array. If yes, then an error is raised that no note is found
 * with the given title.
 * @param {string} title 
 */
const removeNote = (title) =>{
    const notes = loadNotes();
    const notesToKeep = notes.filter((note)=>note.title !== title);
    saveNotes(notesToKeep);
    if(notesToKeep.length === notes.length){
        throw new Error('Note with title: `'+title+'` not present!');
    }
};

// Exporting the 4 functions so that they can be used in index.js file
module.exports = {
    loadNotes:loadNotes,
    addNotes: addNotes,
    removeNote: removeNote,
    modifyNote: modifyNote
};