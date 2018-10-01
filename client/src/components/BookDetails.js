import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBookQuery } from '../queries/queries';



class BookDetails extends Component {

    displayBookDetails(){
        const { book } = this.props.data;
        if(book){
            return(
                <div>
                    <h2>{book.name}</h2>
                    <h3>by {book.author.name}</h3>
                    <p>{book.genre}</p>
                    <p>Other books by this author:</p>
                    <ul id="other-books-list">
                        {book.author.books.map(other => {
                            return this.filterOtherBooks(other, book);
                        })}
                    </ul>
                </div>
            )
        } else {
            return <div>No book selected...</div>
        }
    }

    filterOtherBooks = (other, book) => {
        if(other.id !== book.id){
            return <li key={other.id} onClick={() => this.props.callBookChange(other.id)}>{other.name}</li>
        }
    }

    render() {
        return(
            <div id="book-details">
                 {this.displayBookDetails()}
            </div>
        )
    }
}

export default graphql(getBookQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.bookId
            }
        }
    }
})(BookDetails);