import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation loginUser(
    $email: String!
    $password: String!
    $keepLoggedIn: Boolean!
  ) {
    loginUser(email: $email, password: $password, keepLoggedIn: $keepLoggedIn) {
      message
      success
    }
  }
`;
