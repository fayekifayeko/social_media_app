import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import App from './App';

const client = new ApolloClient({
    uri: 'https://localhost:5000',
  });

  export default (
    <ApolloProvider client={client}> {/* Provider will provide the app with the apollo client in the context, so it could be used anywhere in the app */}
        <App />                      {/* Would be great to install chrome Apollo client dev tool so you can debug and test the apollo queries, so similar to the one that the server launches */}
  </ApolloProvider>                   

  )