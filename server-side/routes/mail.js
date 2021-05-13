var express = require('express');
const List = require('../models/Mail');
const bcrypt = require('bcryptjs');
const checkAuth = require('../helpers/checkauth');
const Mail = require('../models/Mail');
const router = express.Router();

router.get('/getMails', checkAuth, async (req, res) => {

    const mails = await Mail.find({ user_id: req.user._id })

    return res.send(mails)

})


router.post('/new', checkAuth, async (req, res) => {

    if (!req.body) {
        return res.status(400)
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const mail = new List({
        name: req.body.name,
        email: req.body.email,
        host: req.body.host,
        port: req.body.port,
        password: hashedPassword,
        user_id: req.user._id
    })

    try {
        await mail.save()
    } catch (error) {
        return res.status(400)
    }

    return res.send(mail)

});

router.post('/delete/:mailID', checkAuth, async (req, res) => {

    if (!req.body) {
        return res.status(400)
    }

    const foundedMail = await List.findOne({ _id: req.params.mailID })
    
    if (foundedMail.user_id != req.user._id) {
        return res.status(403)
    }

    const deletedMail = await List.deleteOne({ _id: req.params.mailID })
    
    return res.send({success: deletedMail.deletedCount})

})

router.post('/edit/:mailID', async (req, res) => {

    if (!req.body) {
        return res.status(400)
    }

    const mail = await Mail.findOneAndUpdate({ _id: req.params.mailID }, {
        name: req.body.name,
        email: req.body.email,
        port: req.body.port,
        host: req.body.host
    }, async (err) => {
        if (err) {
            return res.status(400)
        } 
    })

    try {
        await mail.save()
    } catch (error) {
        return res.status(400)
    }

    return res.send({ success: 1 })

})






module.exports = router;