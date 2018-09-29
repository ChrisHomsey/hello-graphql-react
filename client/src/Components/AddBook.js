import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { getAuthorsQuery } from '../Queries/queries';

class AddBook extends Component {

    onInputChange(){

    }

    displayAuthors(){
        let data = this.props.data;
        if(data.loading){
            return <option disabled>Authors Loading...</option>
        } else {
            return data.authors.map(author => {
                return <option key={author.id}>{author.name}</option>;
            })
        }
    }

    render(){
        return(

            <form id="add-book">

                <h3>Add New Book:</h3>

                <div className="field">
                    <label>Book name: </label>
                    <input type="text"/>
                </div>

                <div className="field">
                    <label>Genre: </label>
                    <input type="text"/>
                </div>

                <div className="field">
                    <label>Author:</label>
                    <select>
                        <option>select author</option>
                        {this.displayAuthors()}
                    </select>
                </div>

                <button>+</button>

            </form>
        )
    }
}

export default graphql(getAuthorsQuery)(AddBook)