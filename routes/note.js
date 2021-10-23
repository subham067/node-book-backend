const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');
var fetchuser = require('../middleWere/fetchuser');
const {
    body,
    validationResult
} = require('express-validator');

// fatch all notes
router.post('/fatch', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({
            user: req.user.id
        });
        res.json(notes)

    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message)
    }
})
// add new note
router.post('/addNotes', [
    body('tittle').isLength({
        min: 3
    }),
    body('description').isLength({
        min: 5
    })
], fetchuser, async (req, res) => {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        const {
            tittle,
            description,
            tag
        } = req.body;
        const note = new Notes({
            tittle,
            description,
            tag,
            user: req.user.id
        })
        const saveNote = await note.save();
        res.json(saveNote);
        console.log(saveNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message)
    }
})
// updata note
router.put('/updateNote/:id', [
    body('tittle').isLength({
        min: 3
    }),
    body('description').isLength({
        min: 5
    })
], fetchuser, async (req, res) => {
    const {
        tittle,
        description,
        tag
    } = req.body;
    const newNote = {}
    if (tittle) {
        newNote.tittle = tittle;
    }
    if (description) {
        newNote.description = description;
    }
    if (tag) {
        newNote.tag = tag;
    }
    // fint the note to mupdate
    let note =await Notes.findById(req.params.id);
    if (!note) {
        return res.status(404).send("not found")
    }
    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("not allowed")
    }
    note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
    res.json({note})
})
router.put('/deleteNote/:id', fetchuser, async (req, res) => {
   
    // fint the note to delete
   try {
    let note =await Notes.findById(req.params.id);
    if (!note) {
        return res.status(404).send("not found")
    }
    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("not allowed")
    }
    note = await Notes.findByIdAndDelete(req.params.id)
    res.json({note})
} catch (error) {
    console.error(error.message);
    res.status(500).send(error.message)
}
})

module.exports = router;