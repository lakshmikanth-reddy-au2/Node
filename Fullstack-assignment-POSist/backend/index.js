const express = require('express');
const mongoose = require('mongoose');
const Users = require('./routes/usersRoute');
const auth = require('./routes/auth');
const config = require('config');
const Channels = require('./routes/channels');
const Posts = require('./routes/post');

if(!config.get('jwtPrivateKey')){
    console.log("FATAL ERROR: jwtPrivate not set");
    process.exit(1);
}
const app = express();

mongoose.connect('mongodb://localhost/post-it')
    .then(() => console.log("MongoDB running"))
    .catch((err) => console.log('Failed to connect to db', err))

app.use(express.json());

app.use('/api/users', Users);
app.use('/api/authenticate', auth);
app.use('/api/channel', Channels);
app.use('/api/post', Posts);


app.listen(3000, () => console.log("Listening on port 3000"));
