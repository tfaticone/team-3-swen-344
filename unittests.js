var request = require('supertest');
var should = require('should');
describe('Testing GET messaging API', function () {
    var server;
    before(function () {
        server = require('./app');
    });
    after(function(done) {
        server.close(done);
    });
    it('responds to get /api/messaging/', function testSlash(done) {
        request(server)
            .get('/api/messaging/')
            .expect(200, done);
    });
    it('responds to GET with id /api/messaging/to/15', function testSlash(done) {
        request(server)
            .get('/api/messaging/to/15')
            .expect(200, done);
    });
    it('Sends back 500 with improper id /api/messaging/to/-1', function testSlash(done) {
        request(server)
            .get('/api/messaging/to/-1')
            .expect(500, done);
    });
    it('Sends back 500 with non-numeric id /api/messaging/to/abcd', function testSlash(done) {
        request(server)
            .get('/api/messaging/to/abcd')
            .expect(500, done);
    });
    it('Sends back 500 with no messages found /api/messaging/to/1000', function testSlash(done) {
        request(server)
            .get('/api/messaging/to/abcd')
            .expect(500, done);
    });
});
describe('Testing POST messaging API', function () {
    var server;
    before(function () {
        server = require('./app');
    });
    after(function(done) {
        server.close(done);
    });
    it('responds to POST /api/messaging/', function testSlash(done) {
        request(server)
            .post('/api/messaging/')
            .send({"message": "This is askdjhaskjda", "fromId": 10, "toId": 12, "title": "WHAT IS HAPPENING"})
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) done(err);
                res.body.should.be.instanceOf(Array);
                done();
            })
    });
    it('responds to POST /api/messaging/ with missing field', function testSlash(done) {
        request(server)
            .post('/api/messaging/')
            .send({"fromId": 10, "toId": 12, "title": "WHAT IS HAPPENING"})
            .expect(500)
            .end(function(err, res) {
                if (err) done(err);
                done();
            })
    });
    it('responds to POST /api/messaging/ toId NOT integer', function testSlash(done) {
        request(server)
            .post('/api/messaging/')
            .send({"message": "This is askdjhaskjda", "fromId": 10, "toId": "abc", "title": "WHAT IS HAPPENING"})
            .expect(500)
            .end(function(err, res) {
                if (err) done(err);
                done();
            })
    });
    it('responds to POST /api/messaging/ fromId NOT integer', function testSlash(done) {
        request(server)
            .post('/api/messaging/')
            .send({"message": "This is askdjhaskjda", "fromId": "abc", "toId": 10, "title": "WHAT IS HAPPENING"})
            .expect(500)
            .end(function(err, res) {
                if (err) done(err);
                done();
            })
    });
    it('responds to POST /api/messaging/ with non-positive toId', function testSlash(done) {
        request(server)
            .post('/api/messaging/')
            .send({"message": "This is askdjhaskjda", "fromId": 10, "toId": -5, "title": "WHAT IS HAPPENING"})
            .expect(500)
            .end(function(err, res) {
                if (err) done(err);
                done();
            })
    });
    it('responds to POST /api/messaging/ with non-positive fromId', function testSlash(done) {
        request(server)
            .post('/api/messaging/')
            .send({"message": "This is askdjhaskjda", "fromId": -1, "toId": 10, "title": "WHAT IS HAPPENING"})
            .expect(500)
            .end(function(err, res) {
                if (err) done(err);
                done();
            })
    });
});
describe('Testing PUT messaging API', function () {
    var server;
    before(function () {
        server = require('./app');
    });
    after(function(done) {
        server.close(done);
    });
    it('responds to PUT /api/messaging/', function testSlash(done) {
        request(server)
            .put('/api/messaging/')
            .send({"id":0,"message": "This is askdjhaskjda", "fromId": 1, "toId": 10, "title": "WHAT IS HAPPENING"})
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) done(err);
                res.body[0].should.have.property('message').which.equals("This is askdjhaskjda");
                res.body[0].should.have.property('fromId').which.equals(1);
                res.body[0].should.have.property('toId').which.equals(10);
                res.body[0].should.have.property('title').which.equals("WHAT IS HAPPENING");
                done();
            })
    });
    it('responds to PUT /api/messaging/ with missing field', function testSlash(done) {
        request(server)
            .post('/api/messaging/')
            .send({"id":0,"message": "This is askdjhaskjda", "toId": 10, "title": "WHAT IS HAPPENING"})
            .expect(500)
            .end(function(err, res) {
                if (err) done(err);
                done();
            })
    });
    it('responds to PUT /api/messaging/ with toId not an integer', function testSlash(done) {
        request(server)
            .post('/api/messaging/')
            .send({"id":0,"message": "This is askdjhaskjda",  "fromId": 1, "toId": "abc", "title": "WHAT IS HAPPENING"})
            .expect(500)
            .end(function(err, res) {
                if (err) done(err);
                done();
            })
    });
    it('responds to PUT /api/messaging/ with fromId not an integer', function testSlash(done) {
        request(server)
            .post('/api/messaging/')
            .send({"id":0,"message": "This is askdjhaskjda",  "fromId": "abc", "toId": 10, "title": "WHAT IS HAPPENING"})
            .expect(500)
            .end(function(err, res) {
                if (err) done(err);
                done();
            })
    });
    it('responds to PUT /api/messaging/ with fromId is not positive', function testSlash(done) {
        request(server)
            .post('/api/messaging/')
            .send({"id":0,"message": "This is askdjhaskjda",  "fromId": -1, "toId": 10, "title": "WHAT IS HAPPENING"})
            .expect(500)
            .end(function(err, res) {
                done();
            })
    });
    it('responds to PUT /api/messaging/ with message not found', function testSlash(done) {
        request(server)
            .post('/api/messaging/')
            .send({"id":100,"message": "This is askdjhaskjda",  "fromId": 1, "toId": 10, "title": "WHAT IS HAPPENING"})
            .expect(500)
            .end(function(err, res) {
                done();
            })
    });
});
describe('Testing DELETE messaging API', function () {
    var server;
    before(function () {
        server = require('./app');
    });
    after(function(done) {
        server.close(done);
    });
    it('responds to DELETE /api/messaging/', function testSlash(done) {
        request(server)
            .delete('/api/messaging/')
            .send({"id":0})
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) done(err);
                res.body[0].should.have.property('id').and.is.equal(0);
                res.body[0].should.have.property('deleted').and.is.equal(true);
                done();
            })
    });
    it('responds to DELETE /api/messaging/ with ID not an integer', function testSlash(done) {
        request(server)
            .delete('/api/messaging/')
            .send({"id":"abcd"})
            .expect(500)
            .end(function(err, res) {
                if (err) done(err);
                done();
            })
    });
    it('responds to DELETE /api/messaging/ with ID not found', function testSlash(done) {
        request(server)
            .delete('/api/messaging/')
            .send({"id":100})
            .expect(500)
            .end(function(err, res) {
                if (err) done(err);
                done();
            })
    });
});


///////////////////////////////
//Device Controller Unit Test//
///////////////////////////////
///GET
describe('Testing GET devices API', function () {
    var server;
    before(function () {
        server = require('./app');
    });
    after(function(done) {
        server.close(done);
    });
    it('responds to get /api/devices/', function testSlash(done) {
        request(server)
            .get('/api/devices/')
            .expect(200, done);
    });
    it('responds to GET with id /api/devices/0', function testSlash(done) {
        request(server)
            .get('/api/devices/0')
            .expect(200, done);
    });
    it('Sends back 500 with improper id /api/devices/-1', function testSlash(done) {
        request(server)
            .get('/api/devices/-1')
            .expect(500, done);
    });
    it('Sends back 500 with non-numeric id /api/devices/abcd', function testSlash(done) {
        request(server)
            .get('/api/devices/abcd')
            .expect(500, done);
    });
    it('Sends back 500 with no messages found /api/devices/1000', function testSlash(done) {
        request(server)
            .get('/api/devices/abcd')
            .expect(500, done);
    });
});

//POST
describe('Testing POST devices API', function () {
    var server;
    before(function () {
        server = require('./app');
    });
    after(function(done) {
        server.close(done);
    });
    it('responds to POST /api/devices/', function testSlash(done) {
        request(server)
            .post('/api/devices/')
            .send({"name": "Foo"})
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) done(err);
                res.body.should.be.instanceOf(Object);
                done();
            })
    });
    it('responds to POST /api/devices/ with missing field', function testSlash(done) {
        request(server)
            .post('/api/devices/')
            .send({})
            .expect(500)
            .end(function(err, res) {
                if (err) done(err);
                done();
            })
    });
});

//PUT
describe('Testing PUT devices API', function () {
    var server;
    before(function () {
        server = require('./app');
    });
    after(function(done) {
        server.close(done);
    });
    it('responds to PUT /api/devices/', function testSlash(done) {
        request(server)
            .put('/api/devices/')
            .send({"id":1,"name": "Foo"})
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) done(err);
                res.body[1].should.have.property('name').which.equals("Foo");
                done();
            })
    });
    it('responds to PUT /api/devices/ with missing field', function testSlash(done) {
        request(server)
            .put('/api/devices/')
            .send({"id":1})
            .expect(500)
            .end(function(err, res) {
                if (err) done(err);
                done();
            })
    });
    it('responds to PUT /api/devices/ with non-integer id', function testSlash(done) {
        request(server)
            .put('/api/devices/')
            .send({"id":'abc',"name": "Foo"})
            .expect(500)
            .end(function(err, res) {
                if (err) done(err);
                done();
            })
    });
    it('responds to PUT /api/devices/ with negative id', function testSlash(done) {
        request(server)
            .put('/api/devices/')
            .send({"id":-1,"name": "Foo"})
            .expect(500)
            .end(function(err, res) {
                done();
            })
    });
    it('responds to PUT /api/devices/ with device that does not exist', function testSlash(done) {
        request(server)
            .put('/api/devices/')
            .send({"id":100,"name": "Foo"})
            .expect(500)
            .end(function(err, res) {
                done();
            })
    });
});

//DELETE
describe('Testing DELETE devices API', function () {
    var server;
    before(function () {
        server = require('./app');
    });
    after(function(done) {
        server.close(done);
    });
    it('responds to DELETE /api/devices/', function testSlash(done) {
        request(server)
            .delete('/api/devices/0')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) done(err);
                res.body[0].should.have.property('id').and.is.equal(1);
                done();
            })
    });
    it('responds to DELETE /api/devices/ with non-integer id', function testSlash(done) {
        request(server)
            .delete('/api/devices/abcd')
            .expect(500)
            .end(function(err, res) {
                if (err) done(err);
                done();
            })
    });
    it('responds to DELETE /api/devices/ with device that does not exist', function testSlash(done) {
        request(server)
            .delete('/api/devices/100')
            .expect(500)
            .end(function(err, res) {
                if (err) done(err);
                done();
            })
    });
});
