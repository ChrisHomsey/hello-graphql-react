const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./graphql/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// allow cross-origin requests (frontend to backend via apollo)
app.use(cors());

mongoose.connect('mongodb://localhost/graphQLBooksDB');
mongoose.connection.once('open', ()=> console.log('connected to database!'))

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));



app.listen(4000, ()=> console.log("Server is listening on port 4000"));

