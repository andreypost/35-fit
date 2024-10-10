import {
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLError,
} from "graphql";
import { validateAuthToken } from "../auth/jsonWebToken";
import { msg } from "../constants/messages";

const imagesData = [
  {
    id: 1,
    title: "Stacked Brwonies",
    owner: "Ella Olson",
    category: "Desserts",
    url: "https://images.pexels.com/photos/3026804/pexels-photo-3026804.jpeg",
  },
  {
    id: 2,
    title: "Shallow focus photography of Cafe Latte",
    owner: "Kevin Menajang",
    category: "Coffee",
    url: "https://images.pexels.com/photos/982612/pexels-photo-982612.jpeg",
  },
  {
    id: 3,
    title: "Sliced Cake on White Saucer",
    owner: "Quang Nguyen Vinh",
    category: "Desserts",
    url: "https://images.pexels.com/photos/2144112/pexels-photo-2144112.jpeg",
  },
  {
    id: 4,
    title: "Beverage breakfast brewed coffee caffeine",
    owner: "Burst",
    category: "Coffee",
    url: "https://images.pexels.com/photos/374885/pexels-photo-374885.jpeg",
  },
  {
    id: 5,
    title: "Pancake with Sliced Strawberry",
    owner: "Ash",
    category: "Desserts",
    url: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg",
  },
];

const ImageType = new GraphQLObjectType({
  name: "ImageResponseData",
  fields: {
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    category: { type: GraphQLString },
    owner: { type: GraphQLString },
    url: { type: GraphQLString },
  },
});

export const QuerySchema = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    imageById: {
      type: ImageType,
      args: {
        imageId: { type: GraphQLInt },
      },
      resolve: async (_, { imageId }, { res, authToken }) => {
        await validateAuthToken(authToken, res);

        const image = imagesData.find(({ id }) => id === imageId);
        if (!image) {
          throw new GraphQLError(msg.IMAGES_NOT_FOUND, {
            extensions: {
              status: 404,
              type: "SearchDataError",
            },
          });
        }
        return image;
      },
    },
    imagesByCategory: {
      type: new GraphQLList(ImageType),
      args: {
        categoryImages: { type: GraphQLString },
      },
      resolve: async (_, { categoryImages }, { res, authToken }) => {
        await validateAuthToken(authToken, res);

        const images = imagesData.filter(
          ({ category }) =>
            category.toLowerCase() === categoryImages.toLowerCase()
        );
        if (!images?.length) {
          throw new GraphQLError(msg.IMAGES_NOT_FOUND, {
            extensions: {
              status: 404,
              type: "SearchDataError",
            },
          });
        }

        return images;
      },
    },
  }),
});

// simplier variant
/*
const schema = buildSchema(`
      type Query {
        image(id: Int!): Image
        images(category: String): [Image]
      }
      type Image {
        id: Int
        title: String
        category: String
        owner: String
        url: String
      }
`);

function getImage(args: any) {
  for (const image of imagesData) {
    if (image.id === args.id) {
      return image;
    }
  }
}

function getImages(args: any) {
  if (args.category) {
    return imagesData.filter(
      (image) => image.category.toLowerCase() === args.category.toLowerCase()
    );
  } else {
    return imagesData;
  }
}

const root = {
  image: getImage,
  images: getImages,
};

app.all(
  "/graphql",
  createHandler({
    schema: schema,
    rootValue: root,
  })
);
*/
