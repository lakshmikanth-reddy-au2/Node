const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const {Posts, validate } = require('../modals/postsModal');
const {Channels} = require('../modals/channelModal');

router.post('/', auth , async (req, res) => {

    const { error } = validate(req.body);
    if(error) res.status(400).send(error.details[0].message);
    // const channelID = await Channels.findOne({channel_name: "mlTch"});
    const postChannel = await Posts.findOne({channel_name: req.body.channel_name});
    if(!postChannel) return res.status(400).send("No channel found");

    postChannel.posted_posts.push(req.body);
    await postChannel.save();
    res.send(req.body);
})

router.get('/:channel', auth, async (req, res) => {
    const getPosts = await Posts.aggregate([
        {
            "$match": {
                "channel_name": req.params.channel
            }
        },
        {
            "$unwind": "$posted_posts"
        },
        {
            "$sort": {
                "posted_posts.created_on": 1
            }
        },
        {
            "$group": {
                "posted_posts": {
                    "$push": "$posted_posts",
                },
                "_id": "$_id",
                // "channel_name": "$channel_name"
            }
        },
        
        
    ])
    

    res.send(getPosts);

})

module.exports = router;