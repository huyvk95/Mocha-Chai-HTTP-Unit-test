let ListData = [
    { id: 1, name: 'Kitty1', status: 'available' },
    { id: 2, name: 'Kitty2', status: 'available' },
    { id: 3, name: 'Kitty3', status: 'available' },
    { id: 4, name: 'Kitty4', status: 'available' },
    { id: 5, name: 'Kitty5', status: 'available' },
    { id: 6, name: 'Kitty6', status: 'available' },
    { id: 7, name: 'Kitty7', status: 'available' },
    { id: 8, name: 'Kitty8', status: 'available' },
    { id: 9, name: 'Kitty9', status: 'available' },
    { id: 10, name: 'Kitty10', status: 'available' },
];

module.exports.find = (callback) => {
    callback(null, ListData);
}

module.exports.findById = (id, callback) => {
    callback(null, ListData.find(item => item.id == id));
}

module.exports.save = (pet, callback) => {
    let { name, status } = pet;
    if (!name || !status) {
        callback("Pet is invalid");
        return;
    };
    
    pet = {
        id: Date.now(),
        name,
        status
    }

    ListData.push(pet);
    callback(null, pet);
}

module.exports.delete = (id, callback) => {
    let roweffected = ListData.length;
    ListData = ListData.filter(item => item.id != id);
    roweffected = roweffected - ListData.length;
    callback(null, { roweffected })
}

module.exports.update = (id, pet, callback) => {
    let oldPet = ListData.find(item => item.id == id);
    if (!oldPet) {
        callback("Pet is invalid");
        return;
    }

    let index = ListData.indexOf(pet);
    Object.assign(oldPet, pet);
    ListData.fill(pet, index, ++index);
    callback(null, oldPet);
};