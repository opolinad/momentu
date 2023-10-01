import express, { Application, NextFunction, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import { connection } from './db/models';
import routes from './api/routes';

dotenv.config();
const app: Application = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  );
  next();
});

app.use('', routes);

connection.authenticate().then((): void => {
  const port = process.env.SERVER_PORT;
  app.listen(port, (): void =>
    // eslint-disable-next-line no-console
    console.log(`Express is listening at http://localhost:${port}`),
  );
});
