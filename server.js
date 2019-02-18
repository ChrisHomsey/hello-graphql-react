const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./graphql/schema');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// allow cross-origin requests (frontend to backend via apollo)
app.use(cors());

const MONGODB_URI = process.env.MONGODB_URI || process.env.DEV_MONGODB_URI;
const PORT = process.env.PORT || process.env.DEV_PORT;

// Serve up static assets (usually on heroku)
// if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
// }

// connect to local Mongo database
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
mongoose.connection.once('open', ()=> console.log('connected to database!'))

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});


app.listen(PORT, ()=> console.log(`Server is listening on port ${PORT}`));