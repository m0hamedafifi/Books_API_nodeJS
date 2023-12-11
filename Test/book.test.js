const chai = require('chai');
var assert = chai.assert;
const request = require('supertest');
const app = require('../server');

describe('GET /books', function() {
    it('get all books', function(done) {
      request(app)
        .get('/api-store-book/books')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect((res)=>{
            console.log("All Books is >>> ",res.status ,">>>> ",JSON.stringify(res.body))
        })
        .expect(200, done);

    });
  });