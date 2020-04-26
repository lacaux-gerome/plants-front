import { GraphQLError } from "graphql/error";

export const isInputError = (graphQlError: GraphQLError) =>
  graphQlError.extensions?.code === "BAD_USER_INPUT";
