var express = require('express');
const { exist } = require('joi');
const List = require('../models/List');
const User = require('../models/User');
const checkAuth = require('../helpers/checkauth')
const router = express.Router();

router.get('/getLists', checkAuth, async (req, res) => {
    
    const user = await User.findOne({ _id: req.user._id })

    if (!user || req.user._id != user._id) {
        return res.status(400)
    }

    const lists = await List.find({ user_id: user._id })

    return res.send(lists)


})

router.get('/:listID', checkAuth, async (req, res) => { 

    const list = await List.findOne({ _id: req.params.listID })

    if (!list || req.user._id != list.user_id) {
        return res.send({ list: false })
    }

    return res.send(list)

});

router.post('/new', checkAuth, async (req, res) => {
    if (!req.body) {
        return res.status(400)
    }

    const list = new List({
        name: req.body.name,
        user_id: req.user._id
    })

    try {
        await list.save()
    } catch (error) {
        return res.status(400)
    }

    return res.send(list)

});


router.post('/:listID/delete', async (req, res) => {

    if (!req.body) {
        return res.status(400)
    }

    const deletedList = await List.deleteOne({ _id: req.params.listID })

    return res.send({success: deletedList.deletedCount})

})


router.post('/:listID/mails/new', async (req, res) => {

    if (!req.body) {
        return res.status(400)
    }

    const list = await List.findOne({ _id: req.params.listID })

    if(list){
        try {
            await list.mails.push(req.body.email)
            await list.save()
            return res.send(list)
        } catch (err) {
            return res.status(400)
        }
    }

    return res.status(400)
})

router.post('/:listID/mails/delete', async (req, res) => {
    if (!req.body) {
        return res.status(400)
    }

    const list = await List.findOne({ _id: req.params.listID })

    if (list) {
        const idx = await list.mails.indexOf(req.body.email)
        if (idx == -1) {
            return res.send({ error: "Email does not exist" })
        }
        await list.mails.splice(idx, 1)
        try {
            await list.save()
            return res.send(list)            
        } catch (error) {
            return res.status(400)
        }
    }

    return res.status(400)

})

module.exports = router;