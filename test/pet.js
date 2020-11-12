process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Pet', () => {
    beforeEach((done) => {
        done();
    });
});

describe('/GET pets', () => {
    it('it should GET all the pets', (done) => {
        chai.request(server)
            .get('/pets')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(10);
                done();
            })
    })
})

describe('/POST pets', () => {
    it('it should POST a pet', (done) => {
        let pet = {
            name: 'Bug',
            status: 'Fixed'
        }
        chai.request(server)
            .post('/pets')
            .send(pet)
            .end((req, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Pet successfully added!');
                res.body.should.have.property('pet').should.be.a('object');
                res.body.pet.should.have.property('id');
                res.body.pet.should.have.property('name').eql(pet.name);
                res.body.pet.should.have.property('status').eql(pet.status);
                done();
            })
    })
    it('it should POST a book without status field', (done) => {
        let pet = {
            name: 'Bug'
        }
        chai.request(server)
            .post('/pets')
            .send(pet)
            .end((req, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Pet is invalid');
                done();
            })
    })
})

describe('/GET/:id pets', () => {
    it('it should GET a pet with id', (done) => {
        let id = 1;
        chai.request(server)
            .get(`/pets/${id}`)
            .end((req, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('pet').should.be.a('object');
                res.body.pet.should.have.property('id').eql(id);
                res.body.pet.should.have.property('name');
                res.body.pet.should.have.property('status');
                done();
            })
    })
})

describe('/PUT/:id pets', () => {
    it('it should PUT a pet', (done) => {
        let id = 1;
        let pet = {
            name: 'Bug',
            status: 'Modified'
        }
        chai.request(server)
            .put(`/pets/${id}`)
            .send(pet)
            .end((req, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Pet updated!');
                res.body.should.have.property('pet').should.be.a('object');
                res.body.pet.should.have.property('id').eql(id);
                res.body.pet.should.have.property('name').eql(pet.name);
                res.body.pet.should.have.property('status').eql(pet.status);
                done();
            })
    })
    it('it should PUT a book with wrong pet id', (done) => {
        let id = 'abc1234567';
        let pet = {
            name: 'Bug',
            status: 'Modified'
        }
        chai.request(server)
            .put(`/pets/${id}`)
            .send(pet)
            .end((req, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Pet is invalid');
                done();
            })
    })
})

describe('/DELETE/:id pets', () => {
    it('it should DELETE a pet with given id', (done) => {
        let id = 1;
        chai.request(server)
            .delete(`/pets/${id}`)
            .end((req, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Pet successfully deleted!');
                res.body.should.have.property('result');
                res.body.result.should.have.property('roweffected').eql(1);
                done();
            })
    })
})