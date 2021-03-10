const express = require('express'),
    router = express.Router();

router.get('/', (req, res) => {
    res.json('Welcome to my Apple CEOs API').status(200);
});

module.exports = router;
