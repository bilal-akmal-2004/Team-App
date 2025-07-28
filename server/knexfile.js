import dotenv from "dotenv";
dotenv.config();

const config = {
  development: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      port: 5432,
    },
  },
};

export default config;
