import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { Divider } from 'semantic-ui-react';

// Components
import BookList from './components/BookList';
import AddBook from './components/AddBook';

// apollo client setup
const client = new ApolloClient({
  uri: '/graphql'
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <BookList/>
          <AddBook/>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
