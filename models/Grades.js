import mongoose from "mongoose";
// const mongoose = require("mongoose");


// const scoreScheme = new mongoose.Schema({
//     score: {
//         type: [Number]
//     }
// });


const gradesSchemma = new mongoose.Schema({
    // scores have an array of class name plus numbered score per each class.
    score: [
        {
            type:{
                type: String
            },
            score: {
                type: Number
            } 
        }
    ],
    class_id: {
        type: Number,
        require: true
    },
    learner_id: {
        type: Number,
        require: true
    },
});

// export default mongoose.model();