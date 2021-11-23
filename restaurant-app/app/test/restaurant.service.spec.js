process.env.NODE_ENV = "test"
let conn = require('../configs/mongoose')
let app = require('../../../index')
let restaurantService = require('../services/restaurantService')
let request = require('supertest')
let assert = require('chai').assert
let expect = require('chai').expect
let dummyHelloPrint = require('../services/dummyTestMock').helloPrint

describe("Restaurant Service", function () {
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

    it("saveRestaurant", (done) => {
        const body = require('../utils/dummyRestaurant.json')
        console.log(body)
        restaurantService.saveRestaurant(body).then((res) => {
            console.log(res)
            expect(res).to.be.a("object")
            done()
        }).catch(e => {
            console.log(e)
            done()
        })

    })

    /*  describe("Testing Dummy", function () {
         it("String returned is valid (not null, blank or undefined)", function () {
             expect(dummyHelloPrint()).to.be.ok
         })
         it("Check returned string type", function () {
             expect(dummyHelloPrint()).to.be.a("string")
         })
         it("Check returned string data", function () {
             assert.equal(dummyHelloPrint(), "hello");
         })
     }) */
})