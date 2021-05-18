const notes = require('../notes.js');
const express = require('express');
const router = express.Router();

// Welcome Page
router.get('/', (req, res) => {
    res.send('<h1>Welcome to Notes App!</h1>');
});

// Listing the Notes
router.get('/list', (req, res) => {
    notes.loadNotes().then((data) =>{
        res.status(200).send(data);
    }).catch((err) =>{
        res.status(400).send(err);
        console.log(err);
    })
});

// Adding the Notes
router.post('/add', (req, res) => {
    notes.addNotes(req.body.title, req.body.body, (flag, message)=>{
        if(flag){
            res.status(201).json({
                message: message,
                status: flag
            });
        }
        else{
            res.status(409).json({
                message: message,
                status: flag
            });
        }
    });
});

// Modifying a Note
router.put('/modify', (req, res) => {
    notes.modifyNote(req.body.title, req.body.body, (flag, message)=>{
        if(flag){
            res.status(200).json({
                message: message,
                status: flag
            });
        }
        else{
            res.status(400).json({
                message: message,
                status: flag
            });
        }
    });
});

// Deleting a Note
router.delete('/remove', (req, res) => {
    notes.removeNote(req.body.title, (flag, message)=>{
        if(flag){
            res.status(200).json({
                message: message,
                status: flag
            });
        }
        else{
            res.status(400).json({
                message: message,
                status: flag
            });
        }
    });
});

// For accessing any other url, this will work
router.get('*',(req, res)=>{
    res.status(404).json({
        message: "404 Page Not Found!"
    });
});

module.exports = router;