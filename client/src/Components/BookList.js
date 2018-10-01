import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries/queries';

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
                <ul id="book-list">
                    {this.displayBooks()}
                </ul>
                <BookDetails bookId={this.state.selected} changeBook={(newBook) => {this.setState({ selected: newBook })}} />
            </div>
        )
    }
}

export default graphql(getBooksQuery)(BookList);