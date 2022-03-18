import React from 'react';
import App from './App';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import {setContext} from 'apollo-link-context';

const httpLink = createHttpLink({
  uri: 'http://localhost:5000/'
});
/* 
const authContext = setContext((req, prevContext) => {
  return ....
  
  we could remove the params if we don't need them
}) */

const authContext = setContext(() => {  /* set headers for each http request */
  const token = localStorage.getItem('jwtToken');
return {
  headers: {
    Authorization: token ? `Bearer ${token}` : ''
  }
}
})
const client = new ApolloClient({
  link:authContext.concat(httpLink),
  cache: new InMemoryCache()
});

  export default (
    <ApolloProvider client={client}> {/* Provider will provide the app with the apollo client in the context, so it could be used anywhere in the app */}
        <App />                      {/* Would be great to install chrome Apollo client dev tool so you can debug and test the apollo queries, so similar to the one that the server launches */}
  </ApolloProvider>                   

  )