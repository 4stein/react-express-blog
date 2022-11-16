import { body } from 'express-validator';

const login = [
  body('email', 'Invalid mail format').isEmail(),
  body('password', 'Password must be at least 5 characters').isLength({
    min: 5,
  }),
];

const registration = [
  body('email', 'Invalid mail format').isEmail(),
  body('password', 'Password must be at least 5 characters').isLength({
    min: 5,
  }),
  body('fullName', 'To short name').isLength({ min: 3 }),
  body('avatarUrl', 'Invalid avatar link').optional().isURL(),
];

const post = [
  body('title', 'Enter article title').isLength({ min: 3 }).isString(),
  body('text', 'Enter article text').isLength({ min: 3 }).isString(),
  body('tags', 'Wrong tag format').optional().isString(),
  body('imageUrl', 'Invalid image link').optional().isString(),
];

export default {
  login,
  registration,
  post,
};
