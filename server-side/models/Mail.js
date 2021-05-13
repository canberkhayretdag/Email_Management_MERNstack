const mongoose = require('mongoose')

const Schema = mongoose.Schema

const MailSchema = new Schema({
    name: { type: String, required: true },
    email: { type:String, required: true },
    host: { type: String, required: true },
    port: { type: String, required: true },
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    password: { type:String, required: true },
    date: {
        type:Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Mail', MailSchema);