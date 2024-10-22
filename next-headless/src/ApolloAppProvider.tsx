import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { errorModalMessage } from "utils/errorModalMessage";
// import { setContext } from '@apollo/client/link/context'

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      errorModalMessage(message)
    );
  if (networkError) console.error(`[Network error]: ${networkError}`);
});

const httpLink = createHttpLink({
  uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
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
  cache: new InMemoryCache(),
  link: from([errorLink, httpLink]),
  // link: httpLink,
});

export const ApolloAppProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => <ApolloProvider client={client}>{children} </ApolloProvider>;
