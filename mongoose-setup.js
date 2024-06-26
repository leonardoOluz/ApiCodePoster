/* eslint-disable import/no-extraneous-dependencies */
/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
import mongoose from 'mongoose';
import 'dotenv/config';

const conexaoMongoose = () => {
  const conexaoOn = async () => {
    try {
      // Cria a conexão com MongoDB, ou reutiliza se já existir.
      await mongoose.connect(process.env.URL, { useNewUrlParser: true, useUnifiedTopology: true });
    } catch (error) {
      throw new Error(`Erro ao conectar à base de dados: ${error}`);
    }
  };

  const disconnectionOff = async () => {
    await mongoose.disconnect();
  };

  return {
    conexaoOn,
    disconnectionOff,
  };
};

export default conexaoMongoose;
