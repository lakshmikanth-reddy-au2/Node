const Joi = require('joi');
const express = require('express');

const app = express();
app.use(express.json());

let courses = [
    {"id": 1, "name": "cource1"},
    {"id": 2, "name": "cource2"} ,
    {"id": 3, "name": "cource3"}    

];
app.get('/api/courses', (req, res) => {
    res.send(courses);
});
app.get('/api/courses/:id', (req, res) => {
    let course = courses.find( c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send("No course found with given ID");
    res.send(course);
});

app.post('/api/courses', (req, res) => {

    let { error } = validateCourse(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let course = {
        "id": courses.length+1,
        "name": req.body.name
    };
    courses.push(course);
    res.send(courses);
});

app.put('/api/courses/:id', (req, res) => {
    let course = courses.find( c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send("No course found with provided id");
    let { error } = validateCourse(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    course.name = req.body.name;
    res.send(course);
    
});

app.delete('/api/courses/:id', (req, res) => {
    let course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send("No course found with provided id");

    let index = courses.indexOf(course)
    courses.splice(index, 1)
    res.send(courses);
})

const validateCourse = (course) => {
    const schema = {
        name : Joi.string().min(3).required()
    };
    return result = Joi.validate(course, schema);
}

app.listen(3000, () => console.log("listening on 3000"));