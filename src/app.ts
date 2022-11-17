import express from 'express';
import { tiktokDL } from './controllers/tiktok';
const app = express();
const port = 3000;

app.get("/", async (req, res) => {
  res.send("Hello World!");
});

app.get("/get", tiktokDL);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});