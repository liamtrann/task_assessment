import { extendType, intArg, nonNull, objectType, stringArg } from "nexus";
import { Context } from "../types/Context";
import { Movie } from "../entities/Movie";
import { Like } from "typeorm";

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
    t.nonNull.field("movie", {
      type: "Movie",
      args: {
        id: nonNull(intArg()),
      },
      async resolve(_parent, args, context: Context, _info): Promise<Movie> {
        const { id } = args;
        const { userId } = context;

        if (!userId) {
          throw new Error("Can't get movie without logging in.");
        }

        const movie = await Movie.findOne({ where: { id } });
        if (!movie) throw new Error("no movie exists");
        return movie;
      },
    });
    t.nonNull.list.nonNull.field("movies", {
      type: "Movie",
      args: {
        filter: stringArg(),
        orderBy: stringArg(),
        skip: intArg(),
        take: intArg(),
      },
      resolve(_parent, args, context: Context, _info): Promise<Movie[]> {
        const { filter, orderBy, skip, take } = args;
        const { userId } = context;

        if (!userId) {
          throw new Error("Can't get movie without logging in.");
        }

        const where = filter ? { movieName: Like(`%${filter}%`) } : {};

        return Movie.find({
          where: where,
          order: { movieName: orderBy },
          skip: skip as number | undefined,
          take: take as number | undefined,
        });
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
        const { id, ...rest } = args;
        const { userId } = context;

        if (!userId) {
          throw new Error("Can't update movie without logging in.");
        }

        const movie = await Movie.findOne({ where: { id } });

        if (!movie) throw new Error("the movie doesn't exists");

        Object.assign(movie, rest);

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
