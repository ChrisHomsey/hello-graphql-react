# booklist-react-graphql

**Production app running on:** https://booklist-react-graphql.herokuapp.com/

This was an excercise in learning GraphQL and Apollo on React. The app allows the user to create a reading list and view the details that have been saved for each book.

The app was built using a Node/Express/Mongo API and a React Client. Appolo is used to make queries using the GraphQL query language standard.

The benefits to using GraphQL rather than restful API requests are noticed immediately. I can write **super flexible queries in a simple format that only returns the data that I explicitly requested.**

For example, this is what a query looks like in this app:

```
{
  books{
    id
    name
    author {
      name
    }
  }
}

```
This query would return a JSON object that lists each book with only the properties I asked for:
```
  "data": {
    "books": [
      {
        "id": "5c6a2a504df3e90017083723",
        "name": "Dante's Inferno",
        "author": {
          "name": "Dante Alighieri"
        }
      },
      {
        "id": "5c6a2ab94df3e90017083725",
        "name": "The Fellowship of the Ring",
        "author": {
          "name": "J. R. R. Tolkien"
        }
      },
      {
        "id": "5c6a2acb4df3e90017083726",
        "name": "The Two Towers",
        "author": {
          "name": "J. R. R. Tolkien"
        }
      },
      ...
    ]
  }
```

You'll also notice that I've easily added a query for the author of each book **with only one request**. Relationships between collections/tables in your preferred database technology are very easy to manage using GraphQL. Once schemas are written for graph queries for each type of data, the flexibility allows rapid changes to the application without requiring new endpoints on the backend.

## Testing the query language yourself

After you've played around with the live production app linked above, you can go to https://booklist-react-graphql.herokuapp.com/graphql to open the Graph*i*QL interface. You can copy and paste queries like the one above, and then click the play button to run the query.

To query a single book by ID, try this:

```
{
  book(id: "5c6a2a504df3e90017083723"){
    id
    name
    author {
      id
      name
    }
  }
}
```

You will get the book id, book name, author id, and author name for "Dante's Inferno. 

## How to run on your local machine

You will need Node and MongoDB installed.

After cloning this repository, run `npm i` in the root directory of the project. 

Run the command `mongod` in the terminal. Open a new tab and then you can run `node server`. This starts the API server on port 4000. 

You can then run the command `cd client && npm run start` to run the React client on port 3000.

Open your browser of choice and enter `http://localhost:3000` into the address bar.

