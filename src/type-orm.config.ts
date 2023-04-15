import { DataSource } from "typeorm";
import { Movie } from "./entities/Movie";
import { User } from "./entities/User";
import dotenv from "dotenv";
import { Review } from "./entities/Review";

dotenv.config();

export default new DataSource({
  entities: [User, Movie, Review],
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: true,
});
