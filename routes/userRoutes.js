const express = require("express");
const router = express.Router();
const User = require("../models/user")
const crypto = require('crypto');

router.post("/sendcomplaint", async (req, res) => {
    const firstname = req.body.allData[0];
    const lastname = req.body.allData[1];
    const email = req.body.allData[2];
    const number = req.body.allData[3];
    const typeIssue = req.body.allData[4];
    let others, comments, bill, country, address, city, state, pincode, latitude, longitude;
    others = req.body.allData[5];
    comments = req.body.allData[6];
    bill = req.body.allData[7];
    country = req.body.allData[8];
    address = req.body.allData[9];
    city = req.body.allData[10];
    state = req.body.allData[11];
    pincode = req.body.allData[12];
    latitude = req.body.allData[13];
    longitude = req.body.allData[14];
    let initialUser;
    if(!firstname || !lastname || !email || !number || !typeIssue || !comments || !bill || !country || !address || !city || !state || !pincode){
        return res.status(400).json({message:'Send All Information!'});
    }
    try {
        initialUser = await User.find({ email }).numberOfComplain;
    } catch (error) {
        return res.status(500).json({ message: "Something wrong, try again later!" });
    }
    try {
        const newone = new User({
            firstname, lastname, email, number, typeIssue, others, comments, bill, country, address, city, state, numberOfComplain: (initialUser ? initialUser : 0) + 1, pincode, latitude, longitude
        });
        await newone.save();
        return res.status(200).json({ message: "Data Saved!" });
    } catch (error) {
        return res.status(500).json({ message: "Something wrong, try again later!" });
    }
});

router.post("/isalreadyregistered", async (req, res) => {
    const { email } = req.body;
    console.log(email);
    try {
        try {
            const Users = await User.find({ email });
            console.log(Users);
            if (!Users) {
                return res.status(202).json({ message: "No complaint found" });
            }
            return res.status(200).send(Users);
        } catch (error) {
            return res.status(500).json({ message: 'Server error' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server error' });
    }
});

router.post('/adminacess', async (req, res) => {
    const { email, password } = req.body;
    if (email === 'xyz@gmail.com' && password === 'xyz') {
        try {
            const data = await User.find({});
            console.log(data);
            if (data) return res.status(200).send(data);
        } catch (error) {
            return res.status(500).send("Server error");
        }
    }
    return res.status(400).send("Not valid");
});

router.get('/getalldata', async (req, res) => {
    try {
        const data = await User.find({});
        console.log(data);
        if (data) return res.status(200).send(data);
    } catch (error) {
        return res.status(500).send("Server error");
    }
})

module.exports = router