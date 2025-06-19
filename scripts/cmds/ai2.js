const axios = require("axios");

module.exports.config = {
  name: "ai2",
  aliases: [],
  version: "1.0.0",
  role: 0,
  author: "Mostakim",
  description: " ai with multiple conversation",
  usePrefix: true,
  guide: "[message]",
  category: "Ai",
  countDown: 5,
};

module.exports.onReply = async function ({ api, event, Reply }) {
  const { author } = Reply;
  if (author != event.senderID) return;
  if (event.type === "message_reply") {
    const reply = event.body.toLowerCase();
    if (isNaN(reply)) {
      try {
        const response = await axios.get(`https://www.x-noobs-apis.42web.io/ai?prompt=${encodeURIComponent(reply)}&type=v3`);
        const ok = response.data;

        await api.sendMessage(ok, event.threadID, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName: this.config.name,
            type: 'reply',
            messageID: info.messageID,
            author: event.senderID,
            link: ok
          });
        }, event.messageID);
      } catch (err) {
        console.log(err.message);
        api.sendMessage(`Error: ${err.message}`, event.threadID, event.messageID);
      }
    }
  }
};

module.exports.onStart = async function ({ api, args, event }) {
  try {
    const author = event.senderID;
    const dipto = args.join(" ").toLowerCase();
    if (!args[0]) {
      return api.sendMessage(
        "Please provide a question to answer\n\nExample:\n!gpt4 hey",
        event.threadID,
        event.messageID
      );
    }

    const response = await axios.get(`https://www.x-noobs-apis.42web.io/ai?prompt=${encodeURIComponent(dipto)}&type=v3`);
    const mg = response.data;

    await api.sendMessage({ body: mg }, event.threadID, (error, info) => {
      global.GoatBot.onReply.set(info.messageID, {
        commandName: this.config.name,
        type: 'reply',
        messageID: info.messageID,
        author,
        link: mg
      });
    }, event.messageID);
  } catch (error) {
    console.log(`Failed to get an answer: ${error.message}`);
    api.sendMessage(`Error: ${error.message}`, event.threadID, event.messageID);
  }
};
