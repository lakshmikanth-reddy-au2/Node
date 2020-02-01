const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(() => console.log('Connected..'))
    .catch(err => console.log('not connected', err));

    const excersiseSchema = new mongoose.Schema({
        name: String,
        date: Date,
        price: Number,
        author: String,
        tags: [ String ],
        isPublished: Boolean
    });

    const Course = new mongoose.model('Course', excersiseSchema);
async function solution1(){
    return  result = await Course
        .find({isPublished: true, tags: 'backend'})
        .sort({name: 1})
        .select({name: 1, author: 1})
    // console.log(result);
}


async function solution2() {
    return result2 = await Course
                            .find()
                            .or([{tags: 'frontend'}, {tags: 'backend'}])
                            .and([{isPublished: true}])
                            .sort({price: -1})
                            .select('name author')
}
async function solution2Ot2() {
    return result2 = await Course
                            .find({isPublished: true, tags: {$in: ['frontend', 'backend']}})
                            .sort('-price')
                            .select('name author price')
}
async function solution3(){
    return await Course
                    .find({isPublished: true})
                    .or([
                        { price: { $gte: 15 } },
                        { name: /.*by.*/i }
                    ])
                    .sort('-price')
                    .select('name author price')
}
async function run(){
    const s1 = await solution3();
    // const s2 = await solution2();
    // const s3 = await solution2Ot2();
    console.log(s1);
}

console.log(run());