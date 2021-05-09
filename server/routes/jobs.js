const express = require('express');
const router = express.Router();
const uniqid = require('uniqid');

const admin = require('firebase-admin');
const serviceAccount = require('../keyService/jobcord-development-firebase-adminsdk-b03js-ac214e5963.json');


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "jobcord-development.appspot.com"
  });

const db = admin.firestore();
const storage = admin.storage();
const usersDb = db.collection('users');
//get list of job application with needed information
router.get('/:userid', (req, res) => {
    const userId = req.params.userid;
    usersDb.doc(`${userId}`).collection('jobs').orderBy("date", "desc").get().then((snapshot) => {
        const allJobs = [];
        snapshot.docs.forEach(doc => allJobs.push({
            docID: doc.id,
            id: doc.data().id, 
            company: doc.data().company,
            position: doc.data().position,
            date: doc.data().date,
            city: doc.data().city,
            state: doc.data().state,
            country: doc.data().country
        }));
        res.status(200).json(allJobs);
    }).catch(err => {
        res.status(400).send(err);
    })
});

router.get('/details/:userid/:docid', (req, res) => {
    const userId = req.params.userid;
    const docId = req.params.docid;
    usersDb.doc(`${userId}`).collection('jobs').doc(`${docId}`).get().then(doc => {
        res.status(200).json(doc.data());
    }).catch(err => {
        res.status(400).json(err);
    })
});

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
});

router.delete('/:userid/:docID', (req, res) => {
    const userId = req.params.userid;
    const docID = req.params.docID;
    usersDb.doc(`${userId}`).collection('jobs').doc(docID).delete()
    .then(() => {
        res.status(201).send('Successfully delete the job application');
    }).catch(err => {
        res.status(400).send(err);
    })
})

router.put('/info/:userid/:docID', (req, res) => {
    const userId = req.params.userid;
    const docID = req.params.docID;
    usersDb.doc(`${userId}`).collection('jobs').doc(docID).update({
        company: req.body.company,
        position: req.body.position,
        jobDescription: req.body.jobDescription
    })
    .then(() => {
        res.status(201).send('Successfully update job info');
    }).catch(err => {
        res.status(400).send(err);
    })
});

router.put('/contact/:userid/:docID', (req, res) => {
    const userId = req.params.userid;
    const docID = req.params.docID;
    usersDb.doc(`${userId}`).collection('jobs').doc(docID).update({
        contactName: req.body.contactName,
        contactEmail: req.body.contactEmail,
        contactPosition: req.body.contactPosition,
        contactPhone: req.body.contactPhone,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country
    })
    .then(() => {
        res.status(201).send('Successfully update job info');
    }).catch(err => {
        res.status(400).send(err);
    })
});

router.post('/upload/:userid/:docid', (req, res) => {
    const userId = req.params.userid;
    const docID = req.params.docid;

    usersDb.doc(`${userId}`).collection('jobs').doc(`${docID}`).update({
        resumeName: req.body.resumeName,
        resumeURL: req.body.resumeURL
    })
    .then(() => {
        res.status(201).send('Successfully upload resume');
    }).catch(err => {
        console.log(err)
    })
})





module.exports = router;