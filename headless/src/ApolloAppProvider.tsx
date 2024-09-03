import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { IChildrenTitleDescrip } from 'types/interface'

const client = new ApolloClient({
  uri: `${process.env.API_URL}/graphql`,
  cache: new InMemoryCache(),
})

const ApolloAppProvider = ({ children }: IChildrenTitleDescrip) => (
  <ApolloProvider client={client}>{children} </ApolloProvider>
)

export default ApolloAppProvider
