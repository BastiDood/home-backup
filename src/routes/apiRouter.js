// @ts-check
'use strict';

// ROUTER INSTANCE
const router = require('express').Router();

router.route('/')
  .get((req, res) => {
    res.json({ message: 'Test' });
  });

module.exports = router;
