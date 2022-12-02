import { config } from "dotenv";

// Load environment variables from a specific .env file
config({
	path: `.env.${process.env.NODE_ENV || "development"}`,
});
