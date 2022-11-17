import express from 'express';
import { tiktokDL } from './controllers/tiktok';
const app = express();
const port = 3000;

app.get('/', tiktokDL);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});