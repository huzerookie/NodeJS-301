process.env.NODE_ENV = "test"
let conn = require('../configs/mongoose')
let app = require('../../../index')
let restaurantController = require('../controllers/restaurantController')
let request = require('supertest')
let assert = require('chai').assert
let expect = require('chai').expect
let dummyHelloPrint = require('../services/dummyTestMock').helloPrint

describe("Restaurant Controller", function () {
    before((done) => {
        try {
            conn.connect();
            done();
        } catch (e) {
            console.log(e)
        }
    })

    after((done) => {
        try {
            conn.close();
            done();
        } catch (e) {
            console.log(e)
        }
    })

    it("OK, POST create restaurant", (done) => {
        const body = require('../utils/dummyRestaurantSingle.json')
        request(app).post('/restaurants')
            .send(body)
            .then((res) => {
                const body = res.body;
                //console.log(res.body)
                expect(body).to.contain.property("_id");
                done();
            })
            .catch((err) => done(err));
    })

    it("OK, GET single restaurant", (done) => {
        const body = require('../utils/dummyRestaurantSingle.json')
        request(app).post('/restaurants')
            .send(body)
            .then((res) => {
                expect(res.body).to.be.a("object")
                expect(res.body).to.contain.property("_id")
                request(app).get(encodeURI('/restaurants/' + res.body._id)).then((getResponse) => {
                    const body = getResponse.body
                    expect(body).to.be.a("object")
                    expect(body).to.contain.property("_id")
                    expect(body).to.contain.property("name")
                    expect(body).to.contain.property("location")
                    done();
                }).catch(err => done(err))
            })
            .catch((err) => done(err));
    })

    it("OK, GET All restaurant", (done) => {
        const body = require('../utils/dummyRestaurantSingle.json')
        request(app).post('/restaurants')
            .send(body)
            .then((res) => {
                expect(res.body).to.be.a("object")
                expect(res.body).to.contain.property("_id")
                expect(res.body).to.contain.property("name")
                request(app).get(encodeURI('/restaurants?name=' + res.body.name + '&dishName=Buffalo Chicken Strips Sandwich')).then((getResponse) => {
                    const body = getResponse.body.restaurants
                    expect(body).to.be.a("array")
                    expect(body).to.have.lengthOf.above(0)
                    expect(body[0].name).to.equal(res.body.name)
                    expect(body[0]).to.contain.property("name")
                    expect(body[0]).to.contain.property("location")
                    done();
                }).catch(err => done(err))
            })
            .catch((err) => done(err));
    })
})