import { deleteAllUsers } from '@/redis/redis-helpers';
import app from '@/server';
import { StatusCodes } from 'http-status-codes';
import request from 'supertest';

const TEST_USER = {
    username: 'testuser',
    password: 'testpassword',
};

// Wait to ensure the server is ready before running tests
beforeAll(async () => {
    // Wait for the server to be started (and Redis broker to be initialized)
    await new Promise((resolve) => setTimeout(resolve, 1000));
});

afterEach(async () => {});

test('jest is working', () => {
    expect(1 + 1).toBe(2);
});

// Create a user
describe('POST /users', () => {
    beforeAll(async () => {
        // Clear all users before running tests
        await deleteAllUsers();
    });

    describe('when given a valid username and password', () => {
        test('should respond with a 200 status code and user object', async () => {
            const response = await request(app).post('/api/users/').send(TEST_USER);
            expect(response.statusCode).toBe(StatusCodes.OK);
            expect(response.headers['content-type']).toMatch(/json/);
            expect(response.body).toHaveProperty('id');
            expect(response.body).toHaveProperty('username', TEST_USER.username);
            expect(response.body).toHaveProperty('createdAt');
            expect(response.body).toHaveProperty('updatedAt');
        });
    });

    describe('when username is missing', () => {
        test('should respond with 400', async () => {
            const response = await request(app).post('/api/users/').send({ password: 'testpassword' });
            expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
        });
    });

    describe('when password is missing', () => {
        test('should respond with 400', async () => {
            const response = await request(app).post('/api/users/').send({ username: 'testuser' });
            expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
        });
    });

    describe('when username already exists', () => {
        test('should respond with 409', async () => {
            // Create user first
            await request(app).post('/api/users/').send(TEST_USER);
            // Try to create again
            const response = await request(app).post('/api/users/').send(TEST_USER);
            expect(response.statusCode).toBe(StatusCodes.CONFLICT);
        });
    });

    describe('when username or password is invalid', () => {
        test('should respond with 400 for short username', async () => {
            const response = await request(app).post('/api/users/').send({ username: 'a', password: 'testpassword' });
            expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
        });
        test('should respond with 400 for short password', async () => {
            const response = await request(app).post('/api/users/').send({ username: 'testuser2', password: 'a' });
            expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
        });
    });
});

// Get all users
describe('GET /users', () => {
    beforeAll(async () => {
        await deleteAllUsers();
    });

    describe('when there are no users', () => {
        test('should respond with an empty array', async () => {
            const response = await request(app).get('/api/users/');
            expect(response.statusCode).toBe(StatusCodes.OK);
            expect(response.body).toEqual([]);
        });
    });

    describe('when there are users', () => {
        beforeAll(async () => {
            await request(app).post('/api/users/').send(TEST_USER);
        });

        test('should respond with an array of users', async () => {
            const response = await request(app).get('/api/users/');
            expect(response.statusCode).toBe(StatusCodes.OK);
            expect(response.body.length).toBeGreaterThan(0);
            expect(response.body[0]).toHaveProperty('id');
            expect(response.body[0]).toHaveProperty('username', TEST_USER.username);
        });
    });

    describe('when there are multiple users', () => {
        beforeAll(async () => {
            await request(app).post('/api/users/').send({ username: 'user2', password: 'password2' });
        });

        test('should return all users', async () => {
            const response = await request(app).get('/api/users/');
            expect(response.statusCode).toBe(StatusCodes.OK);
            expect(response.body.length).toBe(2);
        });
    });
});

// Get a user by ID
describe('GET /users/:id', () => {
    let createdUserId: string | undefined;
    beforeAll(async () => {
        await deleteAllUsers();
        const response = await request(app).post('/api/users/').send(TEST_USER);
        createdUserId = response.body.id; // Store the created user's ID in closure
    });

    describe('when user exists', () => {
        test('should respond with the user object', async () => {
            const response = await request(app).get(`/api/users/${createdUserId}`);
            expect(response.statusCode).toBe(StatusCodes.OK);
            expect(response.body).toHaveProperty('id', createdUserId);
            expect(response.body).toHaveProperty('username', TEST_USER.username);
        });
    });

    describe('when user does not exist', () => {
        test('should respond with 404', async () => {
            const response = await request(app).get('/api/users/nonexistent-id');
            expect(response.statusCode).toBe(StatusCodes.NOT_FOUND);
        });
    });
});
