const mongoose = require('mongoose')

const Schema = mongoose.Schema

const TemplateSchema = new Schema({
    name: { type: String, required: true },
    subject: { type: String, required: true },
    content: { type: String, required: true },
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    date: {
        type:Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Template', TemplateSchema);