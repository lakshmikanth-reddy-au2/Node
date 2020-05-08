const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { Channels, validate } = require('../modals/channelModal');
const { Posts } = require('../modals/postsModal');

router.post('/', auth, async (req, res) => {
    const {error} = await validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const isChannelName = await Channels.findOne({channel_name: req.body.channel_name})
    if(isChannelName) return res.status(400).send("Channel already exists");

    channel = new Channels({
        channel_name: req.body.channel_name,
        channel_description: req.body.channel_description,
        tags: req.body.tags,
        created_by: req.user._id,
        created_on: req.body.created_on,
        participants: req.body.participants,
        
    });

    post = new Posts({
        channel_name: req.body.channel_name,
        poated_posts: []
    })
   
    await channel.save();
    await post.save();

    res.send(channel)
});

module.exports = router;