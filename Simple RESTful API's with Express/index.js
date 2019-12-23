
const express = require('express');
const courses = require('./routes/courses');
const app = express();
app.use(express.json());

app.use('/api/courses', courses);

app.listen(3000, () => console.log("listening on 3000"));