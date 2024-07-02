/* eslint-disable import/no-extraneous-dependencies */
/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
import mongoose from 'mongoose';
import { describe, expect, it } from '@jest/globals';
import 'dotenv/config';

describe('Testando a conexão com o MongoDB', () => {
  it('Tenta se conectar ao MongoDB e verifica se a conexão é bem-sucedida', async () => {
    try {
      await mongoose.connect(process.env.URL, { useNewUrlParser: true, useUnifiedTopology: true });
      expect(true).toBeTruthy(); // Verifica se a conexão foi bem-sucedida
    } catch (error) {
      console.error(error);
      expect(false).toBeTruthy(); // caso haja um erro na conexão
    }
  });
});
