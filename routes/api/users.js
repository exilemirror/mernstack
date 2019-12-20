const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

// Bring in User model
const User = require('../../models/User');

// @route   POST api/users
// @desc    Test route
// @access  Public
router.post('/', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email address').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password } = req.body

    try {
      // See if user exists
      let user = await User.findOne({ email });
      if (user) {
        res.status(400).json({ errors: [{ msg: 'User already exists' }] });
      }
      // Get users gravatar
      const avatar = gravatar.url(email, {
        s: '200', // Size
        r: 'pg',  // Rating
        d: 'mm'   // Default image 
      });
      // Create new user
      user = new User({
        name,
        email,
        avatar,
        password
      });
      //**** Encrypt password *****
      // Use salt to do hashing
      const salt = await bcrypt.genSalt(10);
      // Hash the password
      user.password = await bcrypt.hash(password, salt);
      // Save user to database
      await user.save()

      // Create payload using id
      const payload = {
        user: {
          id: user.id
        }
      }

      // Sign the token by passing the payload, secret & expiry
      jwt.sign(payload, config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        });

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');

    }

  });

module.exports = router;