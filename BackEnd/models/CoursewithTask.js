import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const courseWithTaskSchema = new Schema({
    sort: {type: Number},
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    },
    taskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    },
});

const CourseWithTask = mongoose.model('CourseWithTask', courseWithTaskSchema);
export default CourseWithTask;  