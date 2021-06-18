import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    courseName: { type: String, required: true, trim: true, maxLength: 500 },
    startDay: {type: Date, default: Date.now},
    expiryDate: {type: Number, default: 2},
    status: {type: Boolean, default: false},
    personId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person'
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization'
    },
    description: {type: String}
});

const Course = mongoose.model('Course', courseSchema);
export default Course;   

