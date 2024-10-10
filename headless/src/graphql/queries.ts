import { gql } from '@apollo/client'

export const GET_IMAGES = gql`
  query imagesByCategory($categoryImages: String!) {
    imagesByCategory(categoryImages: $categoryImages) {
      id
      title
      category
      owner
      url
    }
  }
`

export const GET_IMAGE_BY_ID = gql`
  query imageById($imageId: Int) {
    # query getImage($id: ID!) {
    imageById(imageId: $imageId) {
      id
      title
      category
      owner
      url
    }
  }
`

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
`
