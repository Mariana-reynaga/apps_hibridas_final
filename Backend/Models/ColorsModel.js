const mongoose = require('mongoose');
const schema = mongoose.Schema;

const colorSchema = new schema({
    name:{
        type: String,
        required: true
    },
    created_at:{
        type: Date,
        default: Date.now
    },
});

const Colors = mongoose.model('Colors', colorSchema);

module.exports = Colors;