const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user');
const validateBody = require('../middleware/validateBody');
const validateEntryReq = validateBody.entry;
const { GeneralError, NotFound, Unauthorized } = require('../utils/errors');

router.post("/", validateEntryReq, async function(req, res, next) {
  const {email, password} = req.body;
  try {
    const user = await User.findOne({email})
    .catch(() => {
      throw new GeneralError('Error connecting to database')
    });
    if (!user) throw new NotFound('No user found');

    const match = await bcrypt.compare(password, user.password)
    .catch(() => { throw new GeneralError('Error decrypting password')});

    if (!match) throw new Unauthorized('Invalid credentials');

    const token = jwt.sign(
    { id: user.id },
    process.env.SECRET_KEY,
    { expiresIn: "180d" },
    );
    res.cookie("token", token, { httpOnly: true });
    res.sendStatus(200);

  } catch (error) {
    next(error);
  }
});

module.exports = router;
