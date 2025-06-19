const axios = require('axios');

const config = {
  name: "kimi",
  version: "2.0.0",
  author: "nYx",
  credits: "nYx",
  description: "AI-powered chat using Kimi AI",
  category: "AI",
  commandCategory: "Kimi Ai",
  usePrefix: true,
  prefix: true,
  dependencies: {
    "axios": "",
  },
};

const onStart = async ({ message, event, args, commandName }) => {
  const input = args.join(' ').trim();
  if (!input) return message.reply("❌ Please provide a message for Kimi AI.");

  await handleResponse({ message, event, input, commandName });
};

const onReply = async ({ message, event, Reply, args, commandName }) => {
  if (event.senderID !== Reply.author) return;

  const input = args.join(' ').trim();
  await handleResponse({ message, event, input, commandName });
};

async function handleResponse({ message, event, input, commandName }) {
  try {
    const { data } = await axios.get(`https://www.noobz-api.rf.gd/api/kimi?message=${encodeURIComponent(input)}`);

    return message.reply(data.data, (err, info) => {
      if (!err) {
        // GoatBot reply
        if (global.GoatBot?.onReply) {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID
          });
        }

        // Mirai Bot reply
        if (global.client?.handleReply) {
          global.client.handleReply.push({
            name: config.name,
            type: "reply",
            messageID: info.messageID,
            author: event.senderID
          });
        }
      }
    });
  } catch (e) {
    message.reply("❌ Error: " + e.message);
  }
}

module.exports = {
  config,
  onStart,
  onReply,
  run: onStart,
  handleReply: onReply,
};
