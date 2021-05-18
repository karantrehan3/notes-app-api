// Importing the File System Package for File Handling Tasks
const fs = require('fs');
const fsPromises = fs.promises;

/**
 * loadNotes is an asynchronous function which reads the JSON 
 * File, converts to JSON and returns it.
 * @returns {object array}
 */
const loadNotes = async () =>{
    try{
        const data = await fsPromises.readFile("notes.JSON");
        const dataJSON = data.toString();
        return JSON.parse(dataJSON);
    }catch(err){
        return [];
    }
}


/**
 * saveNotes is an asynchronous function which saves the notes 
 * array (consisting of objects) as a notes.JSON File.
 * @param {object array} notes 
 */
const saveNotes = async (notes) =>{
    const dataJSON = JSON.stringify(notes);
    await fsPromises.writeFile('notes.JSON',dataJSON);
};


/**
 * addNotes function calls loadNotes function which reads and 
 * loads the JSON file and then returns it as a promise. Then 
 * a check is performed to find if a note with the same title 
 * already exists. If not, then a note object is created and 
 * pushed to the notes array and then the saveNotes function 
 * is called, then a callBack is sent with a true value and
 * the custom message. If a duplicate note is found then a false
 * value and a custom error message is sent in the callBack.
 * @param {string} title 
 * @param {string} body 
 */
const addNotes = (title, body, callBack) => {
    loadNotes().then((notes) =>{
        const duplicateNote = notes.find((note)=> note.title === title);
        if(!duplicateNote){
            notes.push({
                title: title,
                body: body
            })
            saveNotes(notes);
            callBack(true, 'Note Added Successfully!');
        }
        else callBack(false, 'Note with the same title Exists, Cannot Add Notes with same titles!');
    });
};

/**
 * modifyNote function calls loadNotes function which reads and 
 * loads the JSON file and then returns it as a promise. Then we 
 * try to find the index of the note with the given title in the 
 * notes array. If an index is not found then a false value and a 
 * custom error message is sent in the callBack. Otherwise, the 
 * body of the note found is replaced by the newBody and then true
 * value and success message is sent via callBack.
 * @param {string} title 
 * @param {string} newBody 
 */
const modifyNote = (title, newBody, callBack) => {
    loadNotes().then((notes) =>{
        const index = notes.findIndex((note)=> note.title === title);

        if(index===-1){
            callBack(false, 'Note with title: `'+title+'` not present!')
        }else{
            notes[index].body = newBody;
            saveNotes(notes);
            callBack(true, 'Note Modified Successfully!')
        }
    });
}

/**
 * removeNote function firstly calls loadNotes function which reads and 
 * loads the JSON file and then returns it as a promise. Then it filters 
 * out the objects which don't match with the title. After that, a check 
 * is performed that if the length of the original notes array is same as
 * the length of the filtered array. If yes, then a false value and a 
 * custom error message is sent through the callBack. Otherwise the new 
 * notes array is saved in the notes.JSON File.
 * @param {string} title 
 */
const removeNote = (title, callBack) =>{
    loadNotes().then((notes) =>{
        const notesToKeep = notes.filter((note)=>note.title !== title);
        
        if(notesToKeep.length === notes.length){
            callBack(false, 'Note with title: `'+title+'` not present!')
        }
        else{
            saveNotes(notesToKeep);
            callBack(true, 'Note Removed Successfully!')
        }
    });
};

// Exporting the 4 functions so that they can be used in index.js file
module.exports = {
    loadNotes:loadNotes,
    addNotes: addNotes,
    removeNote: removeNote,
    modifyNote: modifyNote
};