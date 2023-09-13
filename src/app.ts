import express from 'express';
import { tiktok } from './controllers/tiktok';
import { instaReels } from './controllers/insta_reels';
import 'dotenv/config';

const app = express();
const port = 3000;

/// V0
app.get('/', async (req, res) => {
  res.send("Hello World!");
});
app.get('/get', tiktok);

/// V1
const v1Router = express.Router();

v1Router.get('/tiktok', tiktok);
v1Router.get('/instagram', instaReels);
v1Router.get('/cookie', async (req, res, next) => { res.send(process.env.INSTAGRAM_COOKIE)});

app.use('/v1', v1Router);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});