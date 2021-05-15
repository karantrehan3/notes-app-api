const notes = require('../notes.js');
const express = require('express');
const router = express.Router();

// Welcome Page
router.get('/', (req, res) => {
    res.send('<h1>Welcome to Notes App!</h1>');
});

// Listing the Notes
router.get('/listNotes', (req, res) => {
    res.status(200).send(notes.loadNotes());
});

// Adding the Notes
router.post('/addNotes', (req, res) => {
    try{
        notes.addNotes(req.body.title, req.body.body);
        res.status(201).json({
            message: 'Note Added Successfully!'
        });
    }catch(err){
        res.status(500).json({
            message: err.message
        });
    }
});

// Modifying a Note
router.put('/modifyNote', (req, res) => {
    try{
        notes.modifyNote(req.body.title, req.body.body);
        res.status(200).json({
            message: 'Note Modified Successfully!'
        });
    }catch(err){
        res.status(500).json({
            message: err.message
        });
    }
});

// Deleting a Note
router.delete('/removeNote', (req, res) => {
    try{
        notes.removeNote(req.body.title);
        res.status(200).json({
            message: 'Note Removed Successfully!'
        });
    }catch(err){
        res.status(500).json({
            message: err.message
        });
    }
});

// For accessing any other url, this will work
router.get('*',(req, res)=>{
    res.status(404).json({
        message: "404 Page Not Found!"
    });
});

module.exports = router;