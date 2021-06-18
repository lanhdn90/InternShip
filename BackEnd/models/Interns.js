import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const InternSchema = new Schema({
    StudentCode: { type: String, trim: true, maxLength: 500 },
    result: {type: Number, default: 1},
    personId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person'
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    },
});

const Interns = mongoose.model('Interns', InternSchema);
export default Interns;   