import * as dotenv from 'dotenv';
import { Dialect } from 'sequelize';

dotenv.config();

type configInterface = {
  [key: string]: configDBInterface;
};

type configDBInterface = {
  username?: string;
  password?: string;
  database?: string;
  host?: string;
  port?: number;
  dialect?: Dialect;
  url?: string;
  dialectOptions?: {
    ssl: {
      require: boolean;
      rejectUnauthorized: boolean;
    };
  };
};

const config: configInterface = {
  development: {
    username: process.env.DB_ROOT_USER,
    password: process.env.DB_ROOT_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: process.env.DB_DRIVER as Dialect,
    dialectOptions: {
      ssl: {
        require: false,
        rejectUnauthorized: false,
      },
    },
  },
};

export default config;
module.exports = config;
