import SetConfigPath from "./enviroment.js";

await SetConfigPath();

const PORT = process.env.PORT;

const DB_URL = process.env.MONGODB_URI;

const JWT_SECRET = process.env.JWT_SECRET;

const BASE_URL = process.env.BASE_URL

const IMAGE_BASE_URL = process.env.IMAGE_BASE_URL


export {
      PORT,
      DB_URL,
      BASE_URL,
      JWT_SECRET,
      IMAGE_BASE_URL
};
