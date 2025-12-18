const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/User');

// SHOW SIGN-UP FORM
router.get('/sign-up', (req, res) => {
  res.render('auth/sign-up');
});

// SHOW SIGN-IN FORM
router.get('/sign-in', (req, res) => {
  res.render('auth/sign-in');
});

// SIGN OUT (POST)
router.post('/sign-out', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

// HANDLE SIGN-UP
router.post('/sign-up', async (req, res) => {
  try {
    const userInDatabase = await User.findOne({
      username: req.body.username,
    });

    if (userInDatabase) {
      return res.redirect('/auth/sign-up');
    }

    if (req.body.password !== req.body.confirmPassword) {
      return res.redirect('/auth/sign-up');
    }

    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

    await User.create({
      username: req.body.username,
      password: hashedPassword,
    });

    res.redirect('/auth/sign-in');
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// HANDLE SIGN-IN
router.post('/sign-in', async (req, res) => {
  try {
    const userInDatabase = await User.findOne({
      username: req.body.username,
    });

    if (!userInDatabase) {
      return res.redirect('/auth/sign-in');
    }

    const validPassword = bcrypt.compareSync(
      req.body.password,
      userInDatabase.password
    );

    if (!validPassword) {
      return res.redirect('/auth/sign-in');
    }

    req.session.user = {
      username: userInDatabase.username,
      _id: userInDatabase._id,
    };

    res.redirect('/books');
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

module.exports = router;
