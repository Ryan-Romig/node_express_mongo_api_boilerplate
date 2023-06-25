# How To Use

### First setup mongo database
#### * for hosting mongodb server locally see `setup-mongodb.md` for how to
####
### * Run the `create-dotenv-file.sh` script to create the .env file
### npm i to install the NPM packages
### npm run startServer to start the server

#### app folder is parent folder
* `/models/` folder
    * the models folder contains the object definitions for saving to the mongo database.  
    ```javascript 
    const mongoose = require('mongoose');
    const DataSchema = new mongoose.Schema({
        name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        }
    })
    module.exports = mongoose.model('Data', DataSchema);
    ```
    * to create a new entry in the database, call the .save() method on the object. This usually goes in a route for the POST method
    ```javascript
    const Data = require('../models/data');
    const data = await new Data({
      name
    }).save()
    ```
*  `/routes/` folder
    * this will store the routes for the REST api. create a route for each type of data stored in the database. 
    ```javascript
    const express = require('express');
    const bodyParser = require('body-parser');
    const mongoose = require('mongoose');
    const dataRoute = require('./routes/data');
    const router = require('express').express.Router();
    const Data = require('../models/data');

    //mongoDB
    mongoose.Promise = global.Promise;
    mongoose.connect(getSecret(secretNames.dbUri)).then(
      () => {
        console.log('Connected to mongoDB');
      },
      (err) => console.log('Error connect ing to mongoDB', err)
    );
    
    router.post('/', async (req, res) => {
        try {
            const {name} = req.body;
            const data = await new Data({name}).save()
            res
            .status(201)
            .json({
                title: 'Created New Data',
                detail: 'Successfully create new dataentry',
                json: { name,}
                });
        }catch (err) {
                res.status(400).json({
                    errors: [
                            {
                            title: 'RegistrationError',
                            detail: 'Something wentwrong',
                            errorMessage: err.message,
                            },
                    ],
                });
        }
    });
    ```
*  `server.js` file
    * this is where the server goes and singleton objects. include each route and 
```javascript
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
```

*  `secrets.js` file
    * use this as a layer for the .env variables
```javascript
require('dotenv-expand').expand(require('dotenv').config({path:'../.env'}))

const secrets = {
  dbUri: process.env.DB_URI || '',
  port: process.env.PORT || 3000
};
const secretNames = {
  dbUri:'dbUri',
  port:'port',
}

const getSecret = (key) => secrets[key];

module.exports = { getSecret, secretNames };
```
