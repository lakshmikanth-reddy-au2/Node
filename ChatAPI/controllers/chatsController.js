const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Chats = require("../models/chatModal");
const User = require("../models/userModal");

const accessChats = expressAsyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    res.status(400);
    throw new Error("User ID not passed");
  }

  let isChat = await Chats.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate({
      path: "users",
      select: "-password",
    })
    .populate({
      path: "latestMessage",
      populate: {
        path: "sender",
        select: "name email pic",
      },
    });
  //     .populate("users", "-password")
  //     .populate("latestMessage");

  //   isChat = await User.populate(isChat, {
  //     path: 'latestMessage.sender',
  //     select: 'name email pic'
  //   })

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    let chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [userId, req.user._id],
    };
    try {
      const createChat = await Chats.create(chatData);

      let fullChat = await Chats.findOne({ _id: createChat._id })
        .populate({
          path: "users",
          select: "-password",
        })
        .populate({
          path: "latestMessage",
          populate: {
            path: "sender",
            select: "name email pic",
          },
        });

      res.send(fullChat);
    } catch {
      res.status(400);
      throw new Error("Could not create chat", err);
    }
  }
});

const fetchChats = expressAsyncHandler(async (req, res) => {
  try {
    const chats = await Chats.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate({
        path: "users",
        select: "-password",
      })
      .populate({
        path: "latestMessage",
        populate: {
          path: "sender",
          select: "name email pic",
        },
      })
      .sort({
        updatedAt: -1,
      });

    res.status(200).send(chats);
  } catch (err) {
    res.status(400);
    throw new Error("No chats found", err);
  }
});

const createGroupChat = expressAsyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.name) {
    res.status(400).send("Please fill all the details");
  }

  let users = JSON.parse(req.body.users);

  if (users.length < 1) {
    res.status(400).send("Atleast 1 user must be selected to create a group");
  }

  users.push(req.user);

  try {
    const groupChat = await Chats.create({
      name: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullChat = await Chats.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).send(fullChat);
  } catch (err) {
    res.status(400);
    throw new Error("Could not create chat", err);
  }
});

const renameGroup = expressAsyncHandler(async (req, res) => {
  if (!req.body.name || !req.body.chatId) {
    console.log(req.body);
    res.status(400).send("Name nust not be empty and id must be sent");
  }
  try {
    const updatedChat = await Chats.findOneAndUpdate(
      { _id: req.body.chatId },
      { chatName: req.body.name }
    );

    const fullChat = await Chats.findOne({ _id: req.body.chatId })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).send(fullChat);
  } catch (err) {
    res.status(400);
    throw new Error("Could not create chat", err);
  }
});

const addUserToGroup = expressAsyncHandler(async (req, res) => {
  if (!req.body.userId || !req.body.chatId) {
    console.log(req.body);
    res.status(400).send("User Id nust not be empty and id must be sent");
  }

  try {
    const updatedChat = await Chats.findByIdAndUpdate(
      req.body.chatId,
      {
        $push: { users: req.body.userId },
      },
      {
        new: true,
      }
    );

    const fullChat = await Chats.findOne({ _id: req.body.chatId })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).send(fullChat);
  } catch (err) {
    res.status(400);
    throw new Error("Could not create chat", err);
  }
});

const removeUserFromGroup = expressAsyncHandler(async (req, res) => {
  if (!req.body.userId || !req.body.chatId) {
    console.log(req.body);
    res.status(400).send("User Id nust not be empty and id must be sent");
  }

  try {
    const updatedChat = await Chats.findByIdAndUpdate(
      req.body.chatId,
      {
        $pull: { users: req.body.userId },
      },
      {
        new: true,
      }
    );

    const fullChat = await Chats.findOne({ _id: req.body.chatId })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).send(fullChat);
  } catch (err) {
    res.status(400);
    throw new Error("Could not create chat", err);
  }
});

module.exports = {
  accessChats,
  fetchChats,
  createGroupChat,
  renameGroup,
  addUserToGroup,
  removeUserFromGroup,
};
