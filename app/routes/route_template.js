const express = require('express');
//change Schema and name to the name of your schema
const SchemaName = require('../models/ModelName');
const router = express.Router();
//change /name to schema name
router.get('/NAME', async (req, res) => {
    try {
      const { var1, var2 } = req.body;
      
      const schema = new SchemaName({ var1, var2 }).save()
      res
        .status(201)
        .json({
          title: 'Sucess Message Title',
          detail: 'Successfull message detail',
        });
    } catch (err) {
      res.status(400).json({
        errors: [
          {
            title: 'Error',
            detail: 'Something went wrong .',
            errorMessage: err.message,
          },
        ],
      });
    }
  });

module.exports = router;
//dont' forget to import and use the route in the server.js file. 