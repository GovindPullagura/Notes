const express = require("express");
const { NoteModel } = require("../models/note.model");
const noteRouter = express.Router();
const jwt = require("jsonwebtoken");

noteRouter.get("/", async (req, res) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, "bruce");
  try {
    if (decoded) {
      const notes = await NoteModel.find({ userID: decoded.userID });
      res.send(notes);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

noteRouter.post("/add", async (req, res) => {
  const payload = req.body;
  try {
    const note = new NoteModel(payload);
    await note.save();
    res.send({ msg: "A new note has been added." });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

noteRouter.patch("/update/:noteID", async (req, res) => {
  const id = req.params.noteID;
  const payload = req.body;
  try {
    await NoteModel.findByIdAndUpdate({ _id: id }, payload);
    res.send({ msg: "Note has been updated." });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

noteRouter.delete("/delete/:noteID", async (req, res) => {
  const id = req.params.noteID;
  try {
    await NoteModel.findByIdAndDelete({ _id: id });
    res.send({ msg: "Note has been deleted." });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = { noteRouter };
