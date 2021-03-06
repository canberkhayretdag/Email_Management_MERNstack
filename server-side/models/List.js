const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ListSchema = new Schema({
    name: { type: String, required: true },
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    mails: [
        { type: String }
    ],
    date: {
        type:Date,
        default: Date.now
    }
})

module.exports = mongoose.model('List', ListSchema);