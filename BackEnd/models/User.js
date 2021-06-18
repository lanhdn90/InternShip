import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String},
    password: {type: String, minLength: 7},
    personId: {
        type: Schema.Types.ObjectId,
        ref: 'Person',
        unique: true,
    }
});


const UserName = mongoose.model('UserName', userSchema);

export default UserName;