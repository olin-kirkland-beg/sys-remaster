import { deleteUser, getAllUsers, getUser, setUser } from '@/redis/redis-helpers';
import { StatusCodes } from 'http-status-codes';
import { v4 as uuid } from 'uuid';

export class UsersController {
    public async createUser(req: any, res: any) {
        const { username, password } = req.body;
        if (!username || !password)
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Username and password are required' });

        if (username.length < 3 || password.length < 6) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: 'Username must be at least 3 characters and password at least 6 characters',
            });
        }

        // Check for existing user with the same username
        // Assume all users are stored with their IDs as keys in Redis
        // and that getUser can be used to fetch by ID only, so we need to scan all users
        const allUsers = await getAllUsers();
        const usernameTaken = allUsers.some((u: any) => u.username === username);
        if (usernameTaken) {
            return res.status(StatusCodes.CONFLICT).json({ message: 'Username already exists' });
        }

        const user = { id: uuid(), username, password, createdAt: new Date(), updatedAt: new Date() };
        await setUser(user.id, user);
        res.status(StatusCodes.OK).json(user);
    }

    public async getUser(req: any, res: any) {
        const userId = req.params.id;
        if (!userId) return res.status(StatusCodes.BAD_REQUEST).json({ message: 'User ID is required' });
        const user = await getUser(userId);
        if (!user) return res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
        res.status(StatusCodes.OK).json({
            id: user.id,
            username: user.username,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        });
    }

    public updateUser(req: any, res: any) {
        const userId = req.params.id;
        if (!userId) return res.status(StatusCodes.BAD_REQUEST).json({ message: 'User ID is required' });
        if (!req.body) return res.status(StatusCodes.BAD_REQUEST).json({ message: 'User data is required' });
        const user = getUser(userId);
        if (!user) return res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });

        const updatedUser = { ...user, ...req.body };
        setUser(userId, updatedUser);
        res.status(StatusCodes.OK).json(updatedUser);
    }

    public async deleteUser(req: any, res: any) {
        const userId = req.params.id;
        if (!userId) return res.status(StatusCodes.BAD_REQUEST).json({ message: 'User ID is required' });
        const user = await getUser(userId);
        if (!user) return res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
        deleteUser(userId);
        res.status(StatusCodes.NO_CONTENT).send();
    }

    public async getAllUsers(req: any, res: any) {
        const users = await getAllUsers();
        res.status(StatusCodes.OK).json(
            users.map((user: any) => ({
                id: user.id,
                username: user.username,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            }))
        );
    }
}
