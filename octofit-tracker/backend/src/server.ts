import express from 'express';
import apiRouter from './routes/api.js';
import { connectDatabase } from './config/database.js';

const app = express();
const port = Number(process.env.PORT || 8000);
const apiBaseUrl = process.env.CODESPACE_NAME
  ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
  : `http://localhost:${port}`;
const allowedOrigin = process.env.FRONTEND_URL || '*';

app.use((request, response, next) => {
  response.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  response.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  if (request.method === 'OPTIONS') {
    response.sendStatus(204);
    return;
  }
  next();
});
app.use(express.json());
app.use('/api', apiRouter);

async function startServer() {
  try {
    await connectDatabase();
    app.listen(port, () => {
      console.log(`OctoFit API listening at ${apiBaseUrl}/api`);
    });
  } catch (error) {
    console.error('Unable to connect to MongoDB:', error);
    process.exitCode = 1;
  }
}

startServer();

export default app;