const express = require("express");
const app = express();
const cors = require("cors");
const jobsRoutes = require ('./routes/jobs');
require('dotenv').config();

const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.use('/jobs', jobsRoutes);

app.listen(port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Server is running on ${port}`);
    }
})