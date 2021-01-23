if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const app = express();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceID = process.env.TWILIO_SID;

const client = require('twilio')(accountSid, authToken);

app.get('/login', (req, res) => {
    client
        .verify
        .services(serviceID)
        .verifications
        .create({
            to: `+91${req.query.phoneNumber}`,
            channel: req.query.channel
        })
        .then((data) => {
            res.status(200).send(data)
        })
})

app.get('/verify', (req, res) => {
    client
        .verify
        .services(serviceID)
        .verificationChecks
        .create({
            to: `+91${req.query.phoneNumber}`,
            code: req.query.code
        })
        .then((data) => {
            res.status(200).send(data)
        })
})

app.listen(3000, () => {
    console.log('Listening on 3000');
})