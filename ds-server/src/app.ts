import bodyParser from 'body-parser';
import express from 'express';
import { authenticateToken } from './middleware/auth';
import loginRoutes from './routes/login';
import userRoutes from './routes/users';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/login', loginRoutes);
app.use('/api/users', authenticateToken, userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
