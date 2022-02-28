const request = require('supertest');
const app = require('../src/server');
const Admin = require('../src/model/admin');


const {adminOne,setupDatabase} = require('./fixtures/db');

jest.setTimeout(30000); 

beforeEach(setupDatabase);



test('should login admin', async()=>{
    const response = await request(app).post('/adminlogin').send({
        name: adminOne.name,
        password: adminOne.password
    }).expect(200);
    
    const admin = await Admin.findById(response.body.admin._id);
    expect(response.body.token).toBe(admin.tokens[1].token);
})

test('should logout, logged-in-admin', async()=>{ 
    await request(app)
        .post('/logout')
        .set('Authorization', `Bearer ${adminOne.tokens[0].token}`)
        .send()
        .expect(200);
})

test('should not log in with invalid admin credentials',async()=>{
    await request(app).post('/adminlogin').send({
        name: adminOne.name,
        password: "suraj"
    }).expect(400);
})

