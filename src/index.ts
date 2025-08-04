import express from 'express';
import cors from 'cors';
import { AuthController } from './controllers/AuthController.js';
import dotenv from 'dotenv';
import { ErrorHandler } from './utils/middlewares/errorMiddleware.js';
import { FileUploadController } from './controllers/FIleUploadCOntroller.js';
import { ForecastController } from './controllers/ForecastController.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/auth', new AuthController().router);
app.use('/files', new FileUploadController().router);
app.use('/forecast', new ForecastController().router);

app.use(ErrorHandler);

app.listen(4000, () => console.log(`Server running on port ${4000}`));