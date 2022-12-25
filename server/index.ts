import express from 'express';
import fs from 'fs';
import multer from 'multer';
import cors from 'cors';
import dotenv from 'dotenv';

import validations from './validations';
import { handleValidationErrors, checkAuth, makeRssConnection } from './utils';
import { UserController, PostController } from './controllers';
import connectDB from './connectDB';
dotenv.config();

// db connect
connectDB();
// Make Rss Connection every hour
makeRssConnection();

const app = express();

const storage = multer.diskStorage({
  destination: (_, file, callback) => {
    if (!fs.existsSync('uploads')) {
      fs.mkdirSync('uploads');
    }
    callback(null, 'uploads');
  },
  filename: (_, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.post(
  '/auth/login',
  validations.login,
  handleValidationErrors,
  UserController.login
);
app.post(
  '/auth/register',
  validations.registration,
  handleValidationErrors,
  UserController.register
);
app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/upload', checkAuth, upload.single('image'), (req: any, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.post(
  '/posts',
  checkAuth,
  validations.post,
  handleValidationErrors,
  PostController.create
);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch(
  '/posts/:id',
  checkAuth,
  validations.post,
  handleValidationErrors,
  PostController.updateOne
);

// @ts-ignore
app.listen(process.env.PORT || 5000, error => {
  if (error) {
    return console.log(error);
  }

  console.log(`Server Started ${process.env.PORT || 5000}`);
});
