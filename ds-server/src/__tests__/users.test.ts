import app from '@/server';
import { StatusCodes } from 'http-status-codes';
import request from 'supertest';

// Wait to ensure the server is ready before running tests
beforeAll(async () => {
    // Wait for the server to be started (and Redis broker to be initialized)
    await new Promise((resolve) => setTimeout(resolve, 1000));
});

test('Jest is working', () => {
    expect(1 + 1).toBe(2);
});

describe('POST /users', () => {
    describe('given a username and password', () => {
        // should create a new user
        // should respond with a 200 status code
        // should respond with a json object containing the user data
        // should specify json in the content-type header

        test('should respond with a 200 status code', async () => {
            const response = await request(app).post('/api/users/').send({
                username: 'testuser',
                password: 'testpassword',
            });
            expect(response.statusCode).toBe(StatusCodes.OK);
        });
    });

    // expect(response.headers['content-type']).toMatch(/json/);
    // expect(response.body).toHaveProperty('id');
    // expect(response.body).toHaveProperty('username', 'testuser');
    // expect(response.body).toHaveProperty('createdAt');
    // expect(response.body).toHaveProperty('updatedAt');
});
