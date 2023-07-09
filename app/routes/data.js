const router = require('express').Router();
const Data = require('../models/data');

router.post('/', async (req, res) => {
  try {
    const {
      name
    } = req.body;

    const data = await new Data({
      name
    }).save()
    res
      .status(201)
      .json({
        title: 'Created New Data',
        detail: 'Successfully create new data entry',
        json: { name,}
      });
  } catch (err) {
    res.status(400).json({
      errors: [
        {
          title: 'Registration Error',
          detail: 'Something went wrong during new data entry process.',
          errorMessage: err.message,
        },
      ],
    });
  }
});
router.get('/', async (req, res) => {
  try {
    const data = await Data.find({})
    res.json(data);
  } catch (err) {
    res.status(401).json({
      errors: [
        {
          title: 'Error',
          detail: 'error',
          errorMessage: err.message,
        },
      ],
    });
  }
});
module.exports = router;
