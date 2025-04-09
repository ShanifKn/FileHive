import { connect } from "mongoose";
import { DB_URL } from "../config/index.js";
import { logger } from "../utils/index.js";

const DatabaseConnection = async () => {
      try {
            await connect(DB_URL);

            logger.info("User - Database connected");
      } catch (error) {
            logger.error("MongoDbErrorProcurorUser " + error);

      }
};

export default DatabaseConnection;
