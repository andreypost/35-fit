import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLError,
  GraphQLBoolean,
  GraphQLInt,
} from "graphql";
import { userRepository } from "../config/database";
import bcrypt from "bcrypt";
import { setAuthToken } from "../auth/jsonWebToken";
import { msg } from "../constants/messages";
import { User } from "../entities/User";

const LoginType = new GraphQLObjectType({
  name: "LoginResponse",
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    surname: { type: GraphQLString },
    gender: { type: GraphQLString },
    age: { type: GraphQLInt },
    country: { type: GraphQLString },
    city: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    phone: { type: GraphQLString },
    emergencyName: { type: GraphQLString },
    emergencyPhone: { type: GraphQLString },
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
        keepLoggedIn: { type: GraphQLBoolean },
      },
      resolve: async (
        parent,
        { email, password, keepLoggedIn },
        { res }
      ): Promise<User> => {
        const errors = await validateLoginInput(email, password);

        if (errors.length > 0) {
          throw new GraphQLError(errors.join(", "), {
            extensions: {
              status: 400,
              type: "ValidationDataError",
            },
          });
        }

        const user = await userRepository.findOne({
          where: { email },
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

        await setAuthToken(user.id, user.email, res, keepLoggedIn);

        return user;
      },
    },
  },
});
