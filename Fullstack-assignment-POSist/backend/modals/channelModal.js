const mongoose = require('mongoose');
const Joi = require('joi');

const channelSchema = new mongoose.Schema({
    channel_name: {
        type: String,
        min: 1,
        max: 20,
        required: true
    },
    channel_description: {
        type: String,
        min: 1,
        max: 1000,
        required: true
    },
    tags: {
        type: Array,
    },
    created_by: {
        type: String
    },
    created_on: {
        type: Date
    },
    participants: {
        type: Array,
    },
    
});

const Channels = new mongoose.model('Channel', channelSchema);

const validateChannel = (channel) => {
    const schema = {
        channel_name: Joi.string().min(1).max(20).required(),
        channel_description: Joi.string().min(1).max(1000).required(),
        tags: Joi.array(),
        created_by: Joi.string(),
        created_on: Joi.date(),
        participants: Joi.array()
    }
    return Joi.validate(channel, schema)
}

exports.Channels = Channels;
exports.validate = validateChannel;

