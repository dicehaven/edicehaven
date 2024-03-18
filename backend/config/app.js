import createError from 'http-errors';
import express from 'express';
import logger from 'morgan';
import cors from 'cors';

import indexRouter from '../routes/index.js';

const app = express();

// Enables cors
app.use(cors());
app.options('*', cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', indexRouter);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message,
  });
});

export default app;
