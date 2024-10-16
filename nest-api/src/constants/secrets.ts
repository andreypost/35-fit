import { config } from 'dotenv';

config();

export const secrets = {
  JWT_KEY: process.env.JWT_KEY,
  EXPIRES_IN: 3600000,
};
