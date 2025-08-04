import { deleteUser, getUser, setUser } from '@/redis/redis-helpers';
import { StatusCodes } from 'http-status-codes';
import { v4 as uuid } from 'uuid';

export class UsersController {
    public async createUser(req: any, res: any) {
        const { username, password } = req.body;
        if (!username || !password)
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Username and password are required' });

        const user = { id: uuid(), username, password, createdAt: new Date(), updatedAt: new Date() };

        await setUser(user.id, user);
        res.status(StatusCodes.OK).json(user);
    }

    public async getUser(req: any, res: any) {
        const userId = req.params.id;
        if (!userId) return res.status(StatusCodes.BAD_REQUEST).json({ message: 'User ID is required' });
        const user = await getUser(userId);
        if (!user) return res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
        res.status(StatusCodes.OK).json();
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

    public deleteUser(req: any, res: any) {
        const userId = req.params.id;
        if (!userId) return res.status(StatusCodes.BAD_REQUEST).json({ message: 'User ID is required' });
        deleteUser(userId);
        res.status(StatusCodes.NO_CONTENT).send();
    }
}
