import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

const client = new ApolloClient({
  uri: `${process.env.API_URL}/graphql`,
  cache: new InMemoryCache(),
})

const ApolloAppProvider = ({ children }) => (
  <ApolloProvider client={client}>{children} </ApolloProvider>
)

export default ApolloAppProvider
