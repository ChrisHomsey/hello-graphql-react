import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries/queries';
import { Divider } from 'semantic-ui-react';

// components
import BookDetails from './BookDetails';


class BookList extends Component {

    state = {
        selected: null
    }

    displayBooks(){
        const data = this.props.data;
        if(data.loading){
            return(<div>Loading books...</div>)
        } else {
            return data.books.map(book => {
                return <li key={book.id} onClick={ (e) => this.setState({ selected: book.id })}>{book.name} by {book.author.name}</li>
            });
        }
    }

    render() {
        return(
            <div>
                <div id="list-container">
                    <Divider horizontal><h1>Your Reading List</h1></Divider>
                    <ul id="book-list">
                        {this.displayBooks()}
                    </ul>
                </div>
                <BookDetails bookId={this.state.selected} callBookChange={(newBook) => {this.setState({ selected: newBook })}} />
            </div>
        )
    }
}

export default graphql(getBooksQuery)(BookList);