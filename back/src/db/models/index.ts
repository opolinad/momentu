import { Sequelize } from 'sequelize-typescript';
import configDB from '../config';
import * as dotenv from 'dotenv';

dotenv.config();

const env = process.env.NODE_ENV || 'development';
const config = configDB[env];

export const connection = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    port: config.port,
    models: [__dirname + '/**/*.model.ts'],
    modelMatch: (filename, member) => {
      return (
        filename.substring(0, filename.indexOf('.model')) ===
        member.toLowerCase()
      );
    },
    logging: false,
    dialectOptions: {
      ssl: {
        require: false,
        rejectUnauthorized: false,
      },
    },
  },
);
