import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    taskName: { type: String, required: true, trim: true, maxLength: 500 },
    note: {type: String},
    video:{type: String},
    count: {type: Number},
    exam: {type: Number},
    personId: {
        type: Schema.Types.ObjectId,
        ref: 'Person'
    },
});

const Task = mongoose.model('Task', taskSchema);
export default Task;   