var express = require('express');

const router = express.Router();

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { registerValidation, loginValidation } = require('../validation')


router.post('/register', async (req, res) => {
    console.log(req.body.email)
    const { error } = registerValidation(req.body)
    
    
    if (error) {
        return res.status(400).send({error: "Check your information"});
    }

    const emailExist = await User.findOne({email: req.body.email})

    if (emailExist) {
        return res.status(400).send({error: "Email already exist"}); 
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    try {
        const savedUser = await user.save()
        res.send(savedUser)
    } catch (err) {
        res.status(400).send(err)
    }


});

router.post('/login', async (req, res) => {

    const { error } = loginValidation(req.body);

    if(error) {
        return res.status(400).send(error.details[0].message)
    }

    const user = await User.findOne({ email: req.body.email })

    if (!user) {
        return res.status(400).send('Email or password is wrong')
    }

    const validPass = await bcrypt.compare(req.body.password, user.password)

    if(!validPass){
        return res.status(400).send('Invalid Password')
    }

    // Create token
    const token = jwt.sign({_id: user.id}, process.env.TOKEN_SECRET)
    res.cookie('token', token, { httpOnly: true });
    res.json({ token })


})

module.exports = router;