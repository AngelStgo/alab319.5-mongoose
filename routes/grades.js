import express from "express";
import db from "../db/conn.js";
import { ObjectId } from "mongodb";
// import mongoose from "mongoose";


const router = express.Router();

// // Wait to connect to the DB
// await mongoose
//   .connect(process.env.ATLAS_URI)
//   .then(() => console.log("Connected to MongoDB"))
//   .catch(e => console.error(e))

// GET /grades/:id
// Get a single grade entry
router.get("/:id", async (req, res) => {
  let collection = await db.collection("grades");
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// Student route for backwards compatibility
// ".redirect" Since we changed the name from student to learner
router.get("/student/:id", async (req, res) => {
  res.redirect(`/grades/learner/${req.params.id}`); // need a prefix
});

// GET /grades/learner/:id
// Get a single student's grade data
router.get("/learner/:id", async (req, res) => {
  let collection = await db.collection("grades");
  let query = { learner_id: Number(req.params.id) };
  let result = await collection.find(query).toArray();

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});



// GET /grades/class/:id
// Get a class's grade data
router.get("/class/:id", async (req, res) => {
  let collection = await db.collection("grades");
  let query = { class_id: Number(req.params.id) };
  let result = await collection.find(query).toArray();

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});


// Create a single grade entry
router.post("/", async (req, res) => {
  let collection = await db.collection("grades");
  let newDocument = req.body;

  // rename fields for backwards compatibility
  if (newDocument.student_id) {
    newDocument.learner_id = newDocument.student_id;
    delete newDocument.student_id;
  }

  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});


//* Add a score to a grade entry
// router.patch("/:id/add", async (req, res) => {
//   let collection = await db.collection("grades");
//   let query = { _id: new ObjectId(req.params.id) };

//   let result = await collection.updateOne(query, {
//     $push: { scores: req.body },
//   });

//   if (!result) res.send("Not found").status(404);
//   else res.send(result).status(200);
// });

//* Remove a score from a grade entry
// router.patch("/:id/remove", async (req, res) => {
//   let collection = await db.collection("grades");
//   let query = { _id: new ObjectId(req.params.id) };

//   let result = await collection.updateOne(query, {
//     $pull: { scores: req.body },
//   });

//   if (!result) res.send("Not found").status(404);
//   else res.send(result).status(200);
// });

//* Delete a single grade entry
// router.delete("/:id", async (req, res) => {
//   let collection = await db.collection("grades");
//   let query = { _id: new ObjectId(req.params.id) };
//   let result = await collection.deleteOne(query);

//   if (!result) res.send("Not found").status(404);
//   else res.send(result).status(200);
// });


export default router;
