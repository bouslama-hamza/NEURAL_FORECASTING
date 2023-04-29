// --- SET UP
const express = require('express');
const router = express.Router();
const handler = require('../handler/index');


// --- ROUTES
// something
router.route('/').get(
        handler.dashboard
    )

// exports
module.exports = router;