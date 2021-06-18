import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const personSchema = new Schema({
    fullName:{type: String},
    birthday: {type: Date},
    gender: {type: String, enum: ['Male', 'Female','Gay']},
    address: { type: String},
    phone: {type: String, maxLength: 11},
    email: {type: String, unique: true, require: true, trim: true},
    image: { type: String},
    status: {type: Boolean, default: true},
    roleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'role.js'
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization'
    },
    schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization'
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserName'
    },
});

const Person = mongoose.model('Person', personSchema);
export default Person;


