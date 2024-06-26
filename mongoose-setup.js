/* eslint-disable import/no-extraneous-dependencies */
/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
import mongoose from 'mongoose';
import 'dotenv/config';

const conexaoMongoose = () => {
  const conexaoOn = async () => {
    try {
      // Cria a conexão com MongoDB, ou reutiliza se já existir.
      await mongoose.connect(process.env.URL, { useNewUrlParser: true, useUnifiedTopology: true });
      console.warn('Conexão com MongoDB estabelecida!');
    } catch (error) {
      throw new Error(`Erro ao conectar à base de dados: ${error}`);
    }
  };

  const disconnectionOff = async () => {
    await mongoose.disconnect();
    console.warn('Conexão com MongoDB encerrada!');
  };

  return {
    conexaoOn,
    disconnectionOff,
  };
};

export default conexaoMongoose;
