import express from 'express';
import { createServer as createViteServer } from 'vite';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

const PORT = 3000;

const vite = await createViteServer({
  server: { middlewareMode: true },
  appType: 'custom',
});

app.use(vite.middlewares);
app.use(express.static('./'));

app.use((_, res) => {
  res.sendFile(`${__dirname}/index.html`);
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
