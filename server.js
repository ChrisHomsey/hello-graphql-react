const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./graphql/schema');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// allow cross-origin requests (frontend to backend via apollo)
app.use(cors());

const MONGODB_URI = process.env.PROD_MONGODB_URI || process.env.DEV_MONGODB_URI;
const PORT = process.env.PROD_PORT || process.env.DEV_PORT;

// connect to local Mongo database
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
mongoose.connection.once('open', ()=> console.log('connected to database!'))

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));



app.listen(PORT, ()=> console.log(`Server is listening on port ${PORT}`));