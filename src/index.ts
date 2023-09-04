import "dotenv/config";
import chalk from "chalk";
import debugCreator from "debug";
import connectToDatabase from "./database/connectToDatabase.js";
import startServer from "./server/startServer.js";

const debug = debugCreator("records:initialize");

const port = process.env.PORT ?? 4000;
const mongoDbUrl = process.env.MONGODB_URL!;

try {
  await connectToDatabase(mongoDbUrl);

  startServer(+port);
} catch (error: unknown) {
  debug(chalk.red("Error connecting to database"));
  debug(chalk.red((error as Error).message));
  process.exit(1);
}
