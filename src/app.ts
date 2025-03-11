import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { globalErrorHandler } from './app/middleware/globalErrorHandler';
import { notFound } from './app/middleware/notFound';
import router from './app/routes';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: 'https://tutorlink-frontend.vercel.app', // Allow frontend origin
    credentials: true, // Allow cookies and credentials
  }),
);

// application routes
app.use('/api', router);

const getAController = async (req: Request, res: Response) => {
  res.json({
    message: 'Get the tutor data',
  });
};
app.get('/', getAController);
// set global error
app.use(globalErrorHandler);
app.use(notFound);

export default app;
