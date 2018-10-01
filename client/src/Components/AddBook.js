import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { Form, Input } from 'semantic-ui-react';

import { getAuthorsQuery, addBookMutation, addAuthorMutation, getBooksQuery } from '../queries/queries';

class AddBook extends Component {

    state = {
        name: '',
        genre: '',
        authorName: '',
        authorId: ''
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
        console.log(this.state);
    }

    // displayAuthors(){
    //     let data = this.props.getAuthorsQuery;
    //     if(data.loading){
    //         return <option disabled>Authors Loading...</option>
    //     } else {
    //         return data.authors.map(author => {
    //             return <option value={author.id} key={author.id}>{author.name}</option>;
    //         })
    //     }
    // }

    displayAuthors(){
        let authorData = this.props.getAuthorsQuery;
        if(authorData.loading){
            return '';
        } else {
            return authorData.authors.map(author => {
                return <option key={author.id} value={author.name}></option>;
            });
        }
    }

    checkExistingAuthor(){
        let data = this.props.getAuthorsQuery;
        console.log(data.authors);
        return data.authors.filter(author => author.name === this.state.authorName);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        
        console.log(this.checkExistingAuthor()[0]);

        let authorMatch = this.checkExistingAuthor()[0];

        if (authorMatch){
            console.log(authorMatch.id)
            this.props.addBookMutation({
                variables: {
                    name: this.state.name,
                    genre: this.state.genre,
                    authorId: authorMatch.id
                },
                refetchQueries: [{ query: getBooksQuery }]
            });
        } else {
            
            this.props.addAuthorMutation({
                variables: {
                    name: this.state.authorName,
                    age: 44
                },
                update: (store, { data: author }) => {
                    
                    // After making the new author entry, the new author's ID is returned at author.addAuthor.id
                    // We then add the new book entry, using the author ID returned to us via "update"
                    console.log(store);
                    this.props.addBookMutation({
                        variables: {
                            name: this.state.name,
                            genre: this.state.genre,
                            authorId: author.addAuthor.id
                        },
                        refetchQueries: [{ query: getBooksQuery}]
                    });
                },
                refetchQueries: [{query: getAuthorsQuery }]
            });           
        }

        
    }

    render(){

        return(

            <div id="add-book">

                <h3>Add New Book:</h3>

                <Form.Field inline>
                    <label>Book name: </label>
                    <Input name="name" onChange={this.handleInputChange} type="text"/>
                </Form.Field>

                <Form.Field inline>
                    <label>Genre: </label>
                    <Input name="genre" onChange={this.handleInputChange} type="text"/>
                </Form.Field>

                {/* <Form.Field inline>
                    <label>Author:</label>
                    <select name="authorId" onChange={this.handleInputChange}>
                        <option>select author</option>
                        {this.displayAuthors()}
                    </select>
                </Form.Field> */}

                <Form.Field>
                <label>Author: </label>
                <Input name="authorName" onChange={this.handleInputChange} list="authors"/>
                    <datalist id="authors">
                        {this.displayAuthors()}
                    </datalist>
                </Form.Field>

                <button type="submit" onClick={this.handleSubmit}>+</button>
                

            </div>
        )
    }
}

export default compose(
    graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
    graphql(addBookMutation, { name: "addBookMutation" }),
    graphql(addAuthorMutation, { name: "addAuthorMutation" })
)(AddBook);