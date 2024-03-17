import express from 'express';
import { createServer as createViteServer } from 'vite'
const app = express();

const PORT = 3000;

const vite = await createViteServer({
  server: { middlewareMode: true },
  appType: 'custom'
})

app.use(vite.middlewares)
app.use(express.static('./'));

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
}); 