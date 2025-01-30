const mongoose = require('mongoose');
const schema = mongoose.Schema;

const statusSchema = new schema({
    name:{
        type: String,
        required: true
    },
    created_at:{
        type: Date,
        default: Date.now
    },
});

const Status = mongoose.model('Status', statusSchema);

module.exports = Status;