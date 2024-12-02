const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const jwtSceret= "IWillCrackThalesGroupAnyhowAnywa"

router.post('/createuser', [
    body('email').isEmail(),
    body('name').matches(/^[A-Za-z\s]+$/),
    body('password').isLength({ min: 5 })],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400), res.json({ errors: "Enter Valid Credentials" });
        }

        const salt = await bcrypt.genSalt(10)
        let secPassword = await bcrypt.hash(req.body.password,salt)

        try {
            await User.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                location: req.body.location
            })
            res.json(({ success: true }));
        } catch (error) {
            console.log(error)
            res.json(({ success: false }));
        }
    })

router.post('/loginuser', [
    body('email').isEmail(),
    body('password').isLength({ min: 5 })],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400), res.json({ errors: "Enter Valid Credentials" });
        }

        try {
            let email = req.body.email;
            let userData = await User.findOne({ email });
            if (!userData) {
                return res.status(400), res.json({ errors: "Email not Found!" });
            }

            const comPassword = await bcrypt.compare(req.body.password,userData.password)
            if (!comPassword) {
                return res.status(400), res.json({ errors: "Incorrect Password!" });
            }

            const data ={
                user:{
                    id:userData.id
                }
            }
            const authToken = jwt.sign(data,jwtSceret)
            return res.json(({ success: true, authToken:authToken}));

        } catch (error) {
            console.log(error)
            res.json(({ success: false }));
        }
    })

module.exports = router;