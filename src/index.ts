import express from 'express';
import morgan from 'morgan';
import postRoutes from './routes/postRoutes';
import authRoutes from './routes/authRoutes';

const app = express();
app.use(morgan('dev'));
app.use(express.json());

app.use(authRoutes);
app.use(postRoutes);

const PORT = Number(process.env.PORT || 5000);
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
