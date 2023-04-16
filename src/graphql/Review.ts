import { extendType, intArg, nonNull, objectType, stringArg } from "nexus";
import { Context } from "../types/Context";
import { Review } from "../entities/Review";
import { User } from "../entities/User";
import { Movie } from "../entities/Movie";

export const ReviewType = objectType({
  name: "Review",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.int("movieId");
    t.nonNull.int("userId");
    t.nonNull.int("rating");
    t.string("comment");
    t.field("userReview", {
      type: "User",
      resolve(parent, _args, _context): Promise<User | null> {
        return User.findOne({ where: { id: parent.userId } });
      },
    });
    t.field("movieReview", {
      type: "Movie",
      resolve(parent, _args, _context): Promise<Movie | null> {
        return Movie.findOne({ where: { id: parent.movieId } });
      },
    });
  },
});

export const ReviewsQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("reviews", {
      type: "Review",
      resolve(_parent, _args, context: Context, _info): Promise<Review[]> {
        const { userId } = context;

        if (!userId) {
          throw new Error("Can't get Review without logging in.");
        }

        return Review.find();
      },
    });
  },
});

export const ReviewMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createReview", {
      type: "Review",
      args: {
        movieId: nonNull(intArg()),
        comment: stringArg(),
        rating: nonNull(intArg()),
      },
      async resolve(_parent, args, context: Context, _info): Promise<Review> {
        const { movieId, comment, rating } = args;
        const { userId } = context;

        if (!userId) {
          throw new Error("Can't create review without logging in.");
        }

        const movie = await Movie.findOne({ where: { id: movieId } });
        if (!movie) throw new Error("movie doesn't exist");

        const review = await Review.findOne({ where: { movieId: movieId } });
        if (review && review.userId === userId && review.movieId === movieId)
          throw new Error("this review is already exists");

        const mov = Review.create({
          movieId,
          comment,
          rating,
          userId,
        });
        await mov.save();
        return mov;
      },
    });
    t.field("updateReview", {
      type: "Review",
      args: {
        id: nonNull(intArg()),
        rating: nonNull(intArg()),
        comment: stringArg(),
      },
      async resolve(_parent, args, context: Context, _info): Promise<Review> {
        const { id, ...rest } = args;
        const { userId } = context;

        if (!userId) {
          throw new Error("Can't update review without logging in.");
        }

        const review = await Review.findOne({ where: { id } });

        if (!review) {
          throw new Error("the review doesn't exists");
        } else if (userId !== review.userId) {
          throw new Error("you can't change review of others");
        }

        Object.assign(review, rest);
        return review.save();
      },
    });
    t.field("deleteReview", {
      type: "Review",
      args: {
        id: nonNull(intArg()),
      },
      async resolve(_parent, args, context: Context, _info): Promise<Review> {
        const { id } = args;
        const { userId } = context;

        if (!userId) {
          throw new Error("Can't delete movie without logging in.");
        }

        const review = await Review.findOne({ where: { id } });
        if (!review) {
          throw new Error("the review doesn't exists");
        } else if (userId !== review.userId) {
          throw new Error("you can't delete review of others");
        }

        review.remove();
        return review;
      },
    });
  },
});
