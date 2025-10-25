import express from 'express';
import cors from 'cors';
import aiRoutes from './routes/ai.routes.js';

const app = express();

app.use(express.json());
// Express.js example
app.use(
  cors({
    origin: 'http://localhost:5173',
  }),
);
app.get('/', (req, res) => {
  res.send('hi');
});

app.use('/ai', aiRoutes);

export default app;
