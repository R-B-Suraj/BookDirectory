const request = require('supertest');
const app = require('../src/server');
const Admin = require('../src/model/admin');

const {setupDatabase, bookOne, bookTwo, bookThree, adminOne} = require('./fixtures/db');
jest.setTimeout(60000); 

beforeEach(setupDatabase);

test('should get all books', async()=>{
    await request(app).get('/books').send().expect(200);
})

test('should get book by id', async()=>{
    await request(app).get(`/books/${bookOne._id}`).send().expect(200);
})

test('should not get book by id', async()=>{
    await request(app).get(`/books/asdogiaerh`).send().expect(404);
})

test('should not add book with no admin access', async()=>{
    await request(app).post('/add').expect(401)
})

test('should not delete book with no admin access', async()=>{
    await request(app).delete(`/books/${bookOne._id}`).expect(401)
})


test('should add book with admin access', async()=>{
    await request(app)
        .post('/add')
        .set('Authorization', `Bearer ${adminOne.tokens[0].token}`)
        .send({...bookThree })
        .expect(201)
})

test('should modify book with admin access', async()=>{
    await request(app)
        .put(`/modify/${bookOne._id}`)
        .set('Authorization', `Bearer ${adminOne.tokens[0].token}`)
        .send({price:500})
        .expect(200)
})

test('should delete book with admin access', async()=>{
    await request(app)
        .delete(`/books/${bookTwo._id}`)
        .set('Authorization',`Bearer ${adminOne.tokens[0].token}`)
        .send()
        .expect(200)
})

