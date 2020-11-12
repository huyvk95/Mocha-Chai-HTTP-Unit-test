let Router = require('express').Router;
let pet = require('./pet');
let router = new Router();

router.use('/pets', pet);

module.exports = router;