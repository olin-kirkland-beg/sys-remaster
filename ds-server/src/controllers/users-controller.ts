import { StatusCodes } from 'http-status-codes';

export class UsersController {
    private users: any[] = []; // This will hold user data temporarily

    public createUser(req: any, res: any) {
        const newUser = req.body;
        this.users.push(newUser);
        res.status(201).json(newUser);
    }

    public getUser(req: any, res: any) {
        const userId = req.params.id;
        const user = this.users.find((u) => u.id === userId);
        if (user) {
            res.status(StatusCodes.OK).json(user);
        } else {
            res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
        }
    }

    public updateUser(req: any, res: any) {
        const userId = req.params.id;
        const index = this.users.findIndex((u) => u.id === userId);
        if (index !== -1) {
            this.users[index] = { ...this.users[index], ...req.body };
            res.status(StatusCodes.OK).json(this.users[index]);
        } else {
            res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
        }
    }

    public deleteUser(req: any, res: any) {
        const userId = req.params.id;
        const index = this.users.findIndex((u) => u.id === userId);
        if (index !== -1) {
            this.users.splice(index, 1);
            res.status(StatusCodes.NO_CONTENT).send();
        } else {
            res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
        }
    }
}
