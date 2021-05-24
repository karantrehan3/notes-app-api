const notes = require("../src/notes.js");
const express = require("express");
const { schema, delSchema } = require("../validation/validation-schema.js");
const {
    validateAddModSchema,
    validateDelSchema,
} = require("../validation/validation.js");
const router = express.Router();

// Welcome Page
router.get("/", async (req, res) => {
    res.send("<h1>Welcome to Notes App!</h1>");
});

// Listing the Notes
router.get("/list", async (req, res) => {
    notes
        .loadNotes()
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(500).send(err);
            console.log(err);
        });
});

// Adding the Notes
router.post("/add", schema, validateAddModSchema, async (req, res) => {
    notes
        .addNotes(req.body.title, req.body.body)
        .then((flag) => {
            if (flag) {
                res.status(201).json({
                    message: "Note Added Successfully",
                    status: flag,
                });
            } else {
                res.status(409).json({
                    error: "Note with the same title Exists, Cannot Add Notes with same titles!",
                    status: flag,
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message,
                status: false,
            });
        });
});

// Modifying a Note
router.put("/modify", schema, validateAddModSchema, async (req, res) => {
    notes
        .modifyNote(req.body.title, req.body.body)
        .then((flag) => {
            if (flag) {
                res.status(200).json({
                    message: "Note Modified Successfully!",
                    status: flag,
                });
            } else {
                res.status(400).json({
                    error:
                        "Note with title: `" +
                        req.body.title +
                        "` not present!",
                    status: flag,
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message,
                status: false,
            });
        });
});

// Deleting a Note
router.delete("/remove", delSchema, validateDelSchema, async (req, res) => {
    notes
        .removeNote(req.body.title)
        .then((flag) => {
            if (flag) {
                res.status(200).json({
                    message: "Note Removed Successfully!",
                    status: flag,
                });
            } else {
                res.status(400).json({
                    error:
                        "Note with title: `" +
                        req.body.title +
                        "` not present!",
                    status: flag,
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message,
                status: false,
            });
        });
});

// For accessing any other url, this will work
router.get("*", async (req, res) => {
    res.status(404).json({
        error: "404 Page Not Found!",
        status: false,
    });
});

router.post("*", async (req, res) => {
    res.status(404).json({
        error: "404 Page Not Found!",
        status: false,
    });
});

router.put("*", async (req, res) => {
    res.status(404).json({
        error: "404 Page Not Found!",
        status: false,
    });
});

router.delete("*", async (req, res) => {
    res.status(404).json({
        error: "404 Page Not Found!",
        status: false,
    });
});

module.exports = router;
