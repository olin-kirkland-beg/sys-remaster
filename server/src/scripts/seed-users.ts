// Script to seed the database with 10 users for development context
// Usage: Run this script to populate Redis with test users

import RedisBroker from '@/redis/redis-broker';
import { deleteAllUsers, setUser } from '@/redis/redis-helpers';
import { v4 as uuid } from 'uuid'; // Importing uuid for unique user IDs

const USERS = [
    { username: 'alice', password: 'password1' },
    { username: 'bob', password: 'password2' },
    { username: 'carol', password: 'password3' },
    { username: 'dave', password: 'password4' },
    { username: 'eve', password: 'password5' },
    { username: 'frank', password: 'password6' },
    { username: 'grace', password: 'password7' },
    { username: 'heidi', password: 'password8' },
    { username: 'ivan', password: 'password9' },
    { username: 'judy', password: 'password10' },
];

(async () => {
    const redisBroker = RedisBroker.getInstance();
    await redisBroker.start();
    await deleteAllUsers(); // Clear existing users before seeding
    await seedUsers();
})().catch((error) => {
    console.error(error);
    process.exit(1);
});

async function seedUsers() {
    for (const { username, password } of USERS) {
        const user = { id: uuid(), username, password, createdAt: new Date(), updatedAt: new Date() };
        await setUser(user.id, user);
        console.log(`Seeded user: ${user.username}`);
    }
    console.log('All users seeded.');
}
