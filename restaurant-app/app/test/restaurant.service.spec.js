process.N
let conn = require('../configs/mongoose')
let app = require('../routers/restaurantRoute')
let request = require('supertest')
let mockgoose
let assert = require('chai').assert
let expect = require('chai').expect
let dummyHelloPrint = require('../services/dummyTestMock').helloPrint

describe("Restaurant App", function () {
    before(async (done) => {
        try {
            await conn.connect();
            done();
        } catch (e) {
            console.log(e)
        }
    })

    before(async (done) => {
        try {
            await conn.connect();
            done();
        } catch (e) {
            console.log(e)
        }
    })

    describe("Testing Dummy", function () {
        it("String returned is valid (not null, blank or undefined)", function () {
            expect(dummyHelloPrint()).to.be.ok
        })
        it("Check returned string type", function () {
            expect(dummyHelloPrint()).to.be.a("string")
        })
        it("Check returned string data", function () {
            assert.equal(dummyHelloPrint(), "hello");
        })
    })
})