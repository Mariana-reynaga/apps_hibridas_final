const mongoose = require('mongoose');
const schema = mongoose.Schema;

const lengthSchema = new schema({
    name:{
        type: String,
        required: true
    },
    created_at:{
        type: Date,
        default: Date.now
    },
});

const Length = mongoose.model('Length', lengthSchema);

module.exports = Length;