import loginRoutes from './routes/login';
import userRoutes from './routes/users';
import { authenticateToken } from './middleware/auth';
import bodyParser from 'body-parser';
import express from 'express';
import RedisBroker from './redis/redis-broker';

(async () => {
    const redisBroker = RedisBroker.getInstance();
    await redisBroker.start();
})().catch((error) => {
    console.error('Error starting the server:', error);
    process.exit(1);
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/login', loginRoutes);
app.use('/api/users', userRoutes);

export default app;
