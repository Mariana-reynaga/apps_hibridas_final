const mongoose = require('mongoose');
const schema = mongoose.Schema;

const catsSchema = new schema({
    name:{
        type: String,
        required: true
    },
    origin:{
        type: String,
        required: true
    },
    color: { type: mongoose.Schema.Types.ObjectId, ref: 'Colors' },
    coat_length: { type: mongoose.Schema.Types.ObjectId, ref: 'Length'},
    status:{ type: mongoose.Schema.Types.ObjectId, ref: 'Status'},
    
    img_url:{
        type: String,
        default: "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
    },
    created_at:{
        type: Date,
        default: Date.now
    },
});

const Cats = mongoose.model('Cats', catsSchema);

module.exports = Cats;