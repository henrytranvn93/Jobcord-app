const express = require('express');
const router = express.Router();
const uuid = require('uuid');

const admin = require('firebase-admin');
const serviceAccount = require('../keyService/jobcord-development-firebase-adminsdk-b03js-ac214e5963.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

const db = admin.firestore();
const usersDb = db.collection('users');

router.get('/:userid', (req, res) => {
    const userId = req.params.userid;
    usersDb.doc(`${userId}`).collection('jobs').get().then((snapshot) => {
        const allJobs = [];
        snapshot.docs.forEach(doc => allJobs.push(doc.data()));
        if (allJobs.length > 0) {
            res.status(200).json(allJobs);
        } else {
            res.status(400).send('Cannot find the data');
            console.log(allJobs);
        }
    })
})


module.exports = router;