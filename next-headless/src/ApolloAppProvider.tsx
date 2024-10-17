import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
// import { setContext } from '@apollo/client/link/context'

const httpLink = createHttpLink({
  uri: `${process.env.API_URL}/graphql`,
});

// const authLink = setContext((_, { headers }) => {
//   const token = localStorage.getItem('authToken')
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : '',
//     },
//   }
// })

const client = new ApolloClient({
  // link: authLink.concat(httpLink),
  link: httpLink,
  cache: new InMemoryCache(),
});

export const ApolloAppProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => <ApolloProvider client={client}>{children} </ApolloProvider>;
