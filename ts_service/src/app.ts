import express, { Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';

import routes from './routes/todos';

const app = express();

const APP_PORT = 3000;

app.use(json());

app.use('/', routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

app.listen(APP_PORT, () => {
  console.log(`Server started on port ${APP_PORT}`);
});
