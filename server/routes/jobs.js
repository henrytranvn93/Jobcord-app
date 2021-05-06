const express = require('express');
const router = express.Router();
const uniqid = require('uniqid');

const admin = require('firebase-admin');
const serviceAccount = require('../keyService/jobcord-development-firebase-adminsdk-b03js-ac214e5963.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

const db = admin.firestore();
const usersDb = db.collection('users');

router.get('/:userid', (req, res) => {
    const userId = req.params.userid;
    usersDb.doc(`${userId}`).collection('jobs').orderBy("date", "desc").get().then((snapshot) => {
        const allJobs = [];
        snapshot.docs.forEach(doc => allJobs.push(doc.data()));
        res.status(200).json(allJobs);
    }).catch(err => {
        res.status(400).send(err);
    })
})

router.post('/:userid', (req, res) => {
    const userId = req.params.userid;
    usersDb.doc(`${userId}`).collection('jobs').add({
        id: uniqid(),
        company: req.body.company,
        position: req.body.position,
        date: req.body.date,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        jobDescription: req.body.jobDescription,
        contactPhone: req.body.contactPhone,
        contactName: req.body.contactName,
        contactPosition: req.body.contactPosition,
        contactEmail: req.body.contactEmail,
        note: req.body.note
    }).then(() => {
        res.status(201).send('Successfully add new job application');
    }).catch(err => {
        res.status(400).send(err);
    })
})


module.exports = router;