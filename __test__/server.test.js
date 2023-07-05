'use strict';

const { app } = require('../src/server');
const { db } = require('../src/models/index');
const supertest = require('supertest');
const jwt = require('jsonwebtoken')
const request = supertest(app);

const token = jwt.sign({ username: 'user' }, process.env.SECRET || 'hamza');

beforeAll(async () => {
    await db.sync();
});

afterAll(async () => {
    await db.drop();
});

let userData = {
    testUser: { username: 'user', password: 'password', role: 'manager' },
};

describe('(Unauthenticated API)', () => {
    describe('Auth Routes', () => {
        test('POST /signup creates a new user and sends an object with the user and the token to the client', async () => {
            const response = await request.post('/signup').send(userData.testUser);

            expect(response.status).toEqual(201);
            expect(response.body).toHaveProperty('username');
            expect(response.body).toHaveProperty('token');
        });

        it('Can signin with basic auth string', async () => {
            let { username, password } = userData.testUser;

            const response = await request.post('/signin')
                .auth(username, password);
            const userObject = response.body;
            expect(userObject.role).toBeDefined();
            expect(response.status).toBe(200);
            expect(userObject.username).toEqual(username);
            expect(token).toBeDefined();

        });
    })
    describe(' (Authenticated API) ', () => {
        test('POST /model with a bearer token that has create permissions adds an item to the DB and returns an object with the added item', async () => {
            const response = await request
                .post('/teacher')
                .send({
                    teacherName: 'food',
                    classLevel: '9'
                })
                .set('Authorization', `Bearer ${token}`);

            expect(response.status).toEqual(201);
            expect(response.body.teacherName).toEqual('food');
            expect(response.body.classLevel).toEqual('9');
        });

        describe('(Authenticated API)', () => {
            test('POST /model with a bearer token that has create permissions adds an item to the DB and returns an object with the added item', async () => {
                const response = await request
                    .post('/student')
                    .send({
                        studentName: 'hamza',
                        grades: {
                            math: 99
                        },
                        teacherId: 1
                    })
                    .set('Authorization', `Bearer ${token}`);
                expect(response.status).toEqual(201);
                expect(response.body.studentName).toEqual('hamza');
                expect(response.body.grades).toBeDefined();
            });

            describe('(Authenticated API)', () => {
                test('POST /model with a bearer token that has create permissions adds an item to the DB and returns an object with the added item', async () => {
                    const response = await request
                        .get('/teacher/grades/1')
                        .set('Authorization', `Bearer ${token}`);
                    expect(response.status).toEqual(200);

                });
            })
        })
    })
})