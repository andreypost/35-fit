import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLError,
  GraphQLBoolean,
} from "graphql";
import { userRepository } from "../config/database";
import bcrypt from "bcrypt";
import { verifyToken, setAuthToken } from "../auth/jsonWebToken";
import { msg } from "../constants/messages";

const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
  },
});

const LoginType = new GraphQLObjectType({
  name: "LoginResponse",
  fields: {
    message: { type: GraphQLString },
    success: { type: GraphQLBoolean },
  },
});

const validateLoginInput = async (email: string, password: string) => {
  const errors = [];

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push("Valid email is required");
  }

  if (!password || password.length < 4) {
    errors.push("Password must be at least 4 characters long");
  }

  return errors;
};

export const MutationSchema = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    loginUser: {
      type: LoginType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve: async (parent, { email, password }, { req, res, authToken }) => {
        // if (authToken) {
        //   return await verifyToken(authToken);
        // }
        // this logic to check authToken probably do not need, if token is in Cookies, login will not trigger

        const errors = await validateLoginInput(email, password);

        if (errors.length > 0) {
          return { message: errors.join(", ") };
        }

        const user = await userRepository.findOne({
          where: { email },
          select: ["id", "name", "email", "password"],
        });

        if (!user) {
          throw new GraphQLError(msg.USER_NOT_FOUND, {
            extensions: {
              status: 400,
              type: "DatabaseSearchError",
            },
          });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
          throw new GraphQLError(msg.INVALID_CREDENTIALS, {
            extensions: {
              status: 401,
              type: "CredentialsError",
            },
          });
        }

        await setAuthToken(user.id, user.email, res);

        return { message: msg.LOGIN_SUCCESSFUL, success: true };
      },
    },
  },
});