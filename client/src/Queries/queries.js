import { gql } from 'apollo-boost';

const getAuthorsQuery = gql`
    {
        authors{
            name
            id
        }
    }
`;

const getBooksQuery = gql`
    {
        books{
            name
            genre
            id
            author{
                name
                id
            }
        }
    }
`;

const getBookQuery = gql`
    query($id: ID){
        book(id: $id ){
            id
            name
            genre
            author{
                id
                name
                age
                books{
                    id
                    name        
                }
            }
        }
    }
`

const addBookMutation = gql`
    mutation($name: String!, $genre: String!, $authorId: ID!){
        addBook(name: $name, genre: $genre, authorId: $authorId){
            name
            id
        }
    }

`;

const addAuthorMutation = gql`
    mutation($name: String!, $age: Int!){
        addAuthor(name: $name, age: $age){
            name
            id
        }
    }
`;

export { getAuthorsQuery, getBooksQuery, getBookQuery, addBookMutation, addAuthorMutation };