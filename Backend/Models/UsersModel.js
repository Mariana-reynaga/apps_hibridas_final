const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    name:{
        type: String
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ['user', 'admin', 'super Admin'],
        default: 'user',
        required: true
    },
    created_at:{
        type: Date,
        default: Date.now
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;