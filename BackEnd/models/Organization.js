import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const organizationSchema = new Schema({
    name: { type: String, required: true, trim: true, maxLength: 500 },
    address: { type: String },
    phone: {type: String, maxLength: 11},
    fax: {type: String, maxLength: 12},
    logo: { type: String},
    email: {type: String, unique: true, required: true, trim: true},
    website: {type: String},
    note: {type: String},
    startDay: {type: Date, default: Date.now},
    expiryDate: {type: Number, default: 1},
    status: {type: Boolean, default: false},
    sendEmail: {type: Boolean, default:false}
});

const Organization = mongoose.model('Organization', organizationSchema);
export default Organization;    