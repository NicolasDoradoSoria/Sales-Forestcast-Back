import express from 'express';
import { AuthController } from './controllers/AuthController.js';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(express.json());
const authController = new AuthController();
app.use('/auth', authController.router);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
//# sourceMappingURL=index.js.map