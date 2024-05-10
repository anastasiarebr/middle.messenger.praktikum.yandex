import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';

const app = express();

const PORT = 3000;

const vite = await createViteServer({
  server: { middlewareMode: true },
  appType: 'custom',
});

app.use(vite.middlewares);
app.use(express.static('dist'));

app.get('*', (_0, res) => {
  res.sendFile(path.join('dist', 'index.html'),{ root: '.' });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
