// Importing the File System Package for File Handling Tasks
const fs = require("fs");
const fsPromises = fs.promises;

/**
 * loadNotes is an asynchronous function which reads the JSON
 * File, converts to JSON and returns it.
 * @returns {object array}
 */
const loadNotes = async () => {
    try {
        const data = await fsPromises.readFile("notes.JSON");
        const dataJSON = data.toString();
        return JSON.parse(dataJSON);
    } catch (err) {
        return [];
    }
};

/**
 * saveNotes is an asynchronous function which saves the notes
 * array (consisting of objects) as a notes.JSON File.
 * @param {object array} notes
 */
const saveNotes = async (notes) => {
    const dataJSON = JSON.stringify(notes);
    await fsPromises.writeFile("notes.JSON", dataJSON);
};

/**
 * addNotes function calls loadNotes function which reads and
 * loads the JSON file and then returns it. Then
 * a check is performed to find if a note with the same title
 * already exists. If not, then a note object is created and
 * pushed to the notes array and then the saveNotes function
 * is called, then a boolean true value is retuned If a duplicate
 * note is found then a false boolean value is retuned. In case
 * there is an error, it is logged on to the console.
 * @param {string} title
 * @param {string} body
 */
const addNotes = async (title, body) => {
    try {
        const notes = await loadNotes();
        const duplicateNote = notes.find((note) => note.title === title);
        if (!duplicateNote) {
            const timestamp = new Date().toLocaleString("en-US", {
                timeZone: "Asia/Kolkata",
            });
            notes.push({
                title: title,
                body: body,
                createdAt: timestamp,
                lastModifiedAt: timestamp,
            });
            await saveNotes(notes);
            return true;
        }
        return false;
    } catch (err) {
        console.error(err);
    }
};

/**
 * modifyNote function calls loadNotes function which reads and
 * loads the JSON file and then returns it. Then we
 * try to find the index of the note with the given title in the
 * notes array. If an index is not found then a boolean false value
 * is retuned Otherwise, the body of the note found is replaced by
 * the newBody and then boolean true value is returned. In case
 * there is an error, it is logged on to the console.
 * @param {string} title
 * @param {string} newBody
 */
const modifyNote = async (title, newBody) => {
    try {
        const notes = await loadNotes();
        const index = notes.findIndex((note) => note.title === title);

        if (index === -1) {
            return false;
        } else {
            notes[index].body = newBody;
            notes[index].lastModifiedAt = new Date().toLocaleString("en-US", {
                timeZone: "Asia/Kolkata",
            });
            await saveNotes(notes);
            return true;
        }
    } catch (err) {
        console.error(err);
    }
};

/**
 * removeNote function firstly calls loadNotes function which reads and
 * loads the JSON file and then returns it. Then it filters
 * out the objects which don't match with the title. After that, a check
 * is performed that if the length of the original notes array is same as
 * the length of the filtered array. If yes, then a boolean false value is
 * returned. Otherwise the new notes array is saved in the notes.JSON File
 * and a true value is returned.
 * @param {string} title
 */
const removeNote = async (title) => {
    try {
        const notes = await loadNotes();
        const notesToKeep = notes.filter((note) => note.title !== title);

        if (notesToKeep.length === notes.length) {
            return false;
        } else {
            await saveNotes(notesToKeep);
            return true;
        }
    } catch (err) {
        console.error(err);
    }
};

// Exporting the 4 functions so that they can be used in index.js file
module.exports = {
    loadNotes: loadNotes,
    addNotes: addNotes,
    removeNote: removeNote,
    modifyNote: modifyNote,
};
