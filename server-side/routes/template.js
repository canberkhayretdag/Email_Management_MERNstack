const { request } = require('express');
var express = require('express');
const checkAuth = require('../helpers/checkauth');
const Template = require('../models/Template');
const Mail = require('../models/Template');
const User = require('../models/User');
const router = express.Router();

router.post('/new', checkAuth, async (req, res) => {

    if (!req.body) {
        return res.status(400);
    }

    const template = new Template({
        name: req.body.name,
        subject: req.body.subject,
        content: req.body.content,
        user_id: req.user._id
    })

    try {
        await template.save()
        return res.send(template)
    } catch (error) {
        return res.status(400)
    }

})

router.get('/getTemplates', checkAuth ,async (req, res) => {
    const user = await User.findOne({ _id: req.user._id })

    if (!user) {
        return res.status(400)
    }

    const templates = await Template.find({ user_id: req.user._id })

    return res.send(templates)
})

router.post('/:templateID/delete', checkAuth, async (req, res) => {

    const deletedTemplate = await Template.deleteOne({ _id: req.params.templateID })

    return res.send({success: deletedTemplate.deletedCount})

})

router.post('/:templateID/edit', async (req, res) => {

    if (!req.body) {
        return res.status(400);
    }

    const template = await Template.findOneAndUpdate({ _id: req.params.templateID }, {
        name: req.body.name,
        subject: req.body.subject,
        content: req.body.content
    }, async (err) => {
        if (err) {
            return res.status(400)
        } 
    })

    try {
        await template.save()
    } catch (error) {
        return res.status(400)
    }

    return res.send({ success: 1 })

})


module.exports = router;