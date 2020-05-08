const mongoose = require('mongoose');
const Joi = require('joi');

const postsSchema = new mongoose.Schema({
    channel_name: {
        type: String
    },
    posted_posts: [ Object ] 
});

const Posts = new mongoose.model("Posts",postsSchema);

const validatePost = (post) => {
    const schema = {
        post: Joi.string().min(1),
        posted_by: Joi.string(),
        channel_name: Joi.string(),
        created_on: Joi.date()
    }
    return Joi.validate(post, schema);
};

exports.Posts = Posts;
exports.validate = validatePost;