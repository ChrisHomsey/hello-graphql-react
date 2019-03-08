import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { Grid, Form, Input, Button } from 'semantic-ui-react';

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
        return data.authors.filter(author => author.name === this.state.authorName);
    }

    handleSubmit = (event) => {
        event.preventDefault();

        // runs a check to see if the Author's name is already in the database and stores the result in authorMatch.
        let authorMatch = this.checkExistingAuthor()[0];
        
        // if there is a match, create a new book. If not, then a new author will have to be created before the book can be created.
        if (authorMatch){
            this.props.addBookMutation({
                variables: {
                    name: this.state.name,
                    genre: this.state.genre,
                    authorId: authorMatch.id
                },
                refetchQueries: [{ query: getBooksQuery }]
            });
        } else {
            
            // First, I create the new author in the database, then after the new entry is created, the update method
            // is run afterwards- providing the data we just stored.

            this.props.addAuthorMutation({
                variables: {
                    name: this.state.authorName,
                    age: 0
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

                <Grid columns={2}>
                    <Grid.Row>
                        <Grid.Column width={10}>

                            <h3>Add New Book:</h3>
                            <Form>    
                                <Form.Field inline>
                                    <label>Title: </label>
                                    <Input name="name" onChange={this.handleInputChange} type="text"/>
                                </Form.Field>

                                <Form.Field inline>
                                    <label>Genre: </label>
                                    <Input name="genre" onChange={this.handleInputChange} type="text"/>
                                </Form.Field>

                                <Form.Field>
                                <label>Author: </label>
                                <Input name="authorName" onChange={this.handleInputChange} list="authors"/>
                                    <datalist id="authors">
                                        {this.displayAuthors()}
                                    </datalist>
                                </Form.Field>
                            </Form>
                        </Grid.Column>

                        <Grid.Column width={1}>

                            <Button circular size="massive" icon="add" className="submit-button" type="submit" onClick={this.handleSubmit}></Button>

                        </Grid.Column>
                    </Grid.Row>
                </Grid>

                
                

            </div>
        )
    }
}

export default compose(
    graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
    graphql(addBookMutation, { name: "addBookMutation" }),
    graphql(addAuthorMutation, { name: "addAuthorMutation" })
)(AddBook);