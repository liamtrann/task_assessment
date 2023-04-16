import { extendType, nonNull, stringArg, objectType } from "nexus";
import { User } from "../entities/User";
import { Context } from "../types/Context";
import * as jwt from "jsonwebtoken";
import argon2 from "argon2";
import { v4 } from "uuid";
import { forgotPasswordPrefix, redis } from "../constants/redisPrefix";
import { sendEmail } from "../utils/sendEmail";

export const AuthType = objectType({
  name: "AuthType",
  definition(t) {
    t.nonNull.string("token"),
      t.nonNull.field("user", {
        type: "User",
      });
  },
});

export const AuthMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("login", {
      type: "AuthType",
      args: {
        username: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      async resolve(_parent, args, _context: Context, _info) {
        const { username, password } = args;
        const user = await User.findOne({ where: { username } });

        if (!user) {
          throw new Error("User not found");
        }

        const isValid = await argon2.verify(user.password, password);

        if (!isValid) {
          throw new Error("Invalid password");
        }

        const token = jwt.sign(
          { userId: user.id },
          process.env.TOKEN_SECRET as jwt.Secret
        );

        return {
          token,
          user,
        };
      },
    });

    t.nonNull.field("register", {
      type: "AuthType",
      args: {
        username: nonNull(stringArg()),
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      async resolve(_parent, args, context: Context, _info) {
        const { username, password, email } = args;
        const hashedPassword = await argon2.hash(password);

        let user;
        let token;
        try {
          const result = await context.conn
            .createQueryBuilder()
            .insert()
            .into(User)
            .values({
              username,
              password: hashedPassword,
              email,
            })
            .returning("*")
            .execute();
          user = result.raw[0];
          token = await jwt.sign(
            { userId: user.id },
            process.env.TOKEN_SECRET as jwt.Secret
          );
        } catch (err) {
          console.log(err);
        }

        return {
          user,
          token,
        };
      },
    });

    t.nonNull.field("forgotPassword", {
      type: "Boolean",
      args: {
        email: nonNull(stringArg()),
      },
      async resolve(_parent, args, _info) {
        const { email } = args;
        const user = await User.findOne({ where: { email } });

        if (!user) {
          return true;
        }

        const token = v4();

        await redis.set(
          forgotPasswordPrefix + token,
          user.id,
          "ex",
          60 * 60 * 24
        ); // 1 day expire

        await sendEmail(
          email,
          `http://localhost:5000/user/change-password/${token}`
        );

        return true;
      },
    });
    t.nonNull.field("changePassword", {
      type: "AuthType",
      args: {
        token: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      async resolve(_parent, args, _info) {
        const { token, password } = args;

        const userId = await redis.get(forgotPasswordPrefix + token);

        if (!userId) throw new Error("User doesn't exists");
        console.log(userId);
        const user = await User.findOne({ where: { id: Number(userId) } });

        if (!user) throw new Error("User doesn't exists");

        await redis.del(forgotPasswordPrefix + token);

        const hashedPassword = await argon2.hash(password);

        user.password = hashedPassword;

        await user.save();

        return {
          user,
          token,
        };
      },
    });
  },
});
