import express from 'express';
import cors from "cors";

// Rotas

const app = express();

app.use(cors());
app.use(express.json())

// catch 404 and forward to error handler
app.use(function (_, res, __) {
  res.status(404).send({
    status: 404,
    message: 'Not Found',
  });
});

export = app
