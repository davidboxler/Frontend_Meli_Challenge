const express = require("express");
const router = express.Router();
const itemsController = require('../controllers/itemsController');

router.get("/api/items/search/:query", itemsController.searchItems);

module.exports = router;