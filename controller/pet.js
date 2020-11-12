let Pet = require('../model').Pet

function getPets(req, res) {
    Pet.find((err, pets) => {
        if (err) {
            res.send({ message: err });
            return;
        }
        res.send(pets);
    })
}

function postPets(req, res) {
    let pet = req.body;
    Pet.save(pet, (err, newPet) => {
        if (err) {
            res.send({ message: err });
            return;
        }
        res.send({
            message: "Pet successfully added!",
            pet: newPet
        })
    })
}

function getPet(req, res) {
    let { id } = req.params;
    Pet.findById(id, (err, pet) => {
        if (err) {
            res.send({ message: err });
            return;
        }
        res.send({ pet })
    })
}

function deletePet(req, res) {
    Pet.delete(req.params.id, (err, result) => {
        res.json({
            message: "Pet successfully deleted!",
            result
        });
    })
}

function updatePet(req, res) {
    Pet.update(req.params.id, req.body, (err, pet) => {
        if (err) {
            res.send({ message: err });
            return;
        }
        res.send({
            message: "Pet updated!",
            pet
        });
    })
}

module.exports = { getPets, postPets, getPet, deletePet, updatePet }