let Router = require('express').Router;
let controller = require('../controller');
let router = new Router();

router.route('/')
    .get(controller.pet.getPets)
    .post(controller.pet.postPets)

router.route('/:id')
    .get(controller.pet.getPet)
    .put(controller.pet.updatePet)
    .delete(controller.pet.deletePet)

module.exports = router;