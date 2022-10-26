import express, { Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';
import { init } from './mssql/index'
//import { config } from '../config'

const config = {
  "database_config": {
      "user": "user",
      "password": "user",
      "server": "localhost",
      "database": "flashscore",
      "requestTimeout": 150000,
      "options": {
          "trustServerCertificate": true
      },
      "pool": {
          "max": 10,
          "min": 0,
          "idleTimeoutMillis": 30000
      }
  },
  "port": 3000
}

import routes from './routes/todos';

const app = express();

const APP_PORT = 3000;

app.use(json());

app.use('/', routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

async function start() {
  await init(config.database_config);
  app.listen(APP_PORT, () => {
  console.log(`Server started on port ${APP_PORT}`);
})
};
start()