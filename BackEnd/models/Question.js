import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    content:{ type: String, required: true, trim: true, maxLength: 500 },
    image: { type: String},
    answer_A: {type: String},
    answer_B: {type: String},
    answer_C: {type: String},
    answer_D: {type: String},
    result:{type: String, require: true, trim:true},
    taskId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Task'
    }
});

const Question = mongoose.model('Question', questionSchema);
export default Question; 