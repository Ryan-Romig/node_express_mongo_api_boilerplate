const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const cors = require('cors')

const { secretNames, getSecret } = require('./secrets');

//import routes
const dataRoute = require('./routes/data');

//mongoDB
mongoose.Promise = global.Promise;
console.log(getSecret(secretNames.dbUri))
mongoose.connect(getSecret(secretNames.dbUri)).then(
  () => {
    console.log('Connected to mongoDB');
  },
  (err) => console.log('Error connect ing to mongoDB', err)
);
//express 
const app = express();
const port = getSecret(secretNames.port);

//middleware
app.use(bodyParser.json());
app.use(cors())

//routes

app.use('/api/data', dataRoute);
  


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = { app };



