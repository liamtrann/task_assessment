import { extendType, intArg, nonNull, objectType, stringArg } from "nexus";
import { Context } from "../types/Context";
import { Movie } from "../entities/Movie";

export const MovieType = objectType({
  name: "Movie",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("movieName");
    t.string("description");
    t.nonNull.string("directorName");
  },
});

export const MoviesQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("movies", {
      type: "Movie",
      resolve(_parent, _args, context: Context, _info): Promise<Movie[]> {
        const { userId } = context;

        if (!userId) {
          throw new Error("Can't get movie without logging in.");
        }

        return Movie.find();
      },
    });
  },
});

export const MovieMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createMovie", {
      type: "Movie",
      args: {
        movieName: nonNull(stringArg()),
        description: stringArg(),
        directorName: nonNull(stringArg()),
      },
      async resolve(_parent, args, context: Context, _info): Promise<Movie> {
        const { movieName, description, directorName } = args;
        const { userId } = context;

        if (!userId) {
          throw new Error("Can't create movie without logging in.");
        }

        const movie = Movie.create({ movieName, description, directorName });
        await movie.save();
        return movie;
      },
    });
    t.field("updateMovie", {
      type: "Movie",
      args: {
        id: nonNull(intArg()),
        movieName: stringArg(),
        description: stringArg(),
        directorName: stringArg(),
      },
      async resolve(_parent, args, context: Context, _info): Promise<Movie> {
        const { id, movieName, description, directorName } = args;
        const { userId } = context;

        if (!userId) {
          throw new Error("Can't update movie without logging in.");
        }

        const movie = await Movie.findOne({ where: { id } });

        if (!movie) throw new Error("the movie doesn't exists");

        Object.assign(movie, { movieName, description, directorName });

        return movie.save();
      },
    });
    t.field("deleteMovie", {
      type: "Movie",
      args: {
        id: nonNull(intArg()),
      },
      async resolve(_parent, args, context: Context, _info): Promise<Movie> {
        const { id } = args;
        const { userId } = context;

        if (!userId) {
          throw new Error("Can't delete movie without logging in.");
        }

        const movie = await Movie.findOne({ where: { id } });
        if (!movie) throw new Error("the movie doesn't exists");

        movie.remove();
        return movie;
      },
    });
  },
});
