const expressAsyncHandler = require("express-async-handler");
const Message = require("../models/messageModal");
const Chat = require("../models/chatModal");

const sendMessage = expressAsyncHandler(async (req, res) => {
  const { message, chatId } = req.body;

  if (!message || !chatId) {
    res.status(400).send("Enter All fields");
  }

  let messageBody = {
    sender: req.user,
    content: message,
    chat: chatId,
  };

  try {
    let savedMessage = await Message.create(messageBody);

    savedMessage = await savedMessage.populate("sender", "name pic");
    savedMessage = await savedMessage.populate({
      path: "chat",
      populate: {
        path: "users",
        select: "name pic email",
      },
    });
    console.log(
      savedMessage,
      "---------------------------saved message====================="
    );
    await Chat.findByIdAndUpdate(chatId, {
      latestMessage: savedMessage,
    });

    res.status(200).send(savedMessage);
  } catch (err) {
    res.status(400);
    throw new Error("Could not create chat", err.message);
  }
});

const allMessages = expressAsyncHandler(async (req, res) => {
  const chatId = req.params.chatId;

  try {
    let messages = await Message.find({ chat: chatId })
      .populate("sender", "name pic")
      .populate({
        path: "chat",
        populate: {
          path: "users",
          select: "name pic email",
        },
      });

    // messages = await messages.populate("sender", "name pic");
    // messages = await messages.populate({
    //   path: "chat",
    //   populate: {
    //     path: "users",
    //     select: "name pic email",
    //   },
    // });
    console.log(messages);
    res.json(messages);
  } catch (err) {
    res.status(400);
    throw new Error("Could not create chat", err.message);
  }
});

module.exports = { sendMessage, allMessages };
