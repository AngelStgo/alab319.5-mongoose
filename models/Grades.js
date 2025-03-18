
const gradesSchemma = new mongoose.Schema({
    scores: [Number],
    class_id: Number,
    learner_id: Number,
    require: true
});