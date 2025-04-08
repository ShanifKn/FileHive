import SetConfigPath from "./enviroment.js";

await SetConfigPath();

const PORT = process.env.PORT;

const DB_URL = process.env.MONGODB_URI;

const JWT_SECRET = process.env.JWT_SECRET;

const JWT_OPTIONS = {
      issuer: process.env.JWT_ISSUER,
      expiresIn: parseInt(process.env.JWT_EXPIRES),
      audience: process.env.JWT_AUDIENCE,
      subject: process.env.JWT_SUBJECT,
};

const PRIVATE_KEY = process.env.PRIVATE_KEY;


export {
      PORT,
      DB_URL,
      JWT_OPTIONS,
      JWT_SECRET, PRIVATE_KEY
};
