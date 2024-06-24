/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

import 'dotenv/config';
import app from './src/app.js';

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.warn(`escutando na porta: ${port}`);
});
