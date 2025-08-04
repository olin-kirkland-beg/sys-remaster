import RedisBroker from './redis-broker';

export async function getUser(id: string) {
    const database = RedisBroker.getInstance().database;

    console.log(`Getting user ${id} from Redis`);
    const user = await database.get(`user:${id}`);
    return user ? JSON.parse(user) : null;
}

export async function setUser(id: string, data: any) {
    const database = RedisBroker.getInstance().database;

    console.log(`Setting user ${id} in Redis`, data);
    await database.set(`user:${id}`, JSON.stringify(data));
}

export async function deleteUser(id: string) {
    const database = RedisBroker.getInstance().database;

    console.log(`Deleting user ${id} from Redis`);
    await database.del(`user:${id}`);
}
