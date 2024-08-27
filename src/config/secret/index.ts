import fs from 'fs';
import path from 'path';
const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, '..', './key/private.key'));
const PUBLICK_KEY = fs.readFileSync(path.resolve(__dirname, '..',  './key/public.key'));

export {
  PRIVATE_KEY,
  PUBLICK_KEY,
};
