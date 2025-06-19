const axios = require("axios");
const fs = require("fs-extra");

module.exports = {
  config: {
    name: "pair5",
    aliases: [],
    version: "1.1",
    author: "OTINXSANDIP + ChatGPT",
    countDown: 5,
    role: 0,
    shortDescription: "Pair two people",
    longDescription: "Randomly pairs two users or based on mention or reply",
    category: "love",
    guide: "{pn} | {pn} @user1 @user2 | {pn} (reply to someone)"
  },

  onStart: async function ({ api, event, args, usersData }) {
    const { threadID, messageID, senderID, mentions, type } = event;
    let id1, id2;

    const getName = async (id) => (await usersData.get(id)).name;

    // Mode 1: Two users mentioned
    if (Object.keys(mentions).length === 2) {
      const ids = Object.keys(mentions);
      id1 = ids[0];
      id2 = ids[1];
    }

    // Mode 2: Message reply mode
    else if (type === "message_reply") {
      id1 = senderID;
      id2 = event.messageReply.senderID;
      if (id1 === id2)
        return api.sendMessage("You can't pair yourself!", threadID, messageID);
    }

    // Mode 3: Random pair
    else {
      const { participantIDs } = await api.getThreadInfo(threadID);
      const botID = api.getCurrentUserID();
      const listUserID = participantIDs.filter(id => id !== botID && id !== senderID);
      if (listUserID.length === 0)
        return api.sendMessage("No other user available in this group to pair with you.", threadID, messageID);
      id1 = senderID;
      id2 = listUserID[Math.floor(Math.random() * listUserID.length)];
    }

    // Get names
    const name1 = await getName(id1);
    const name2 = await getName(id2);

    // Mentions array
    const arraytag = [
      { id: id1, tag: name1 },
      { id: id2, tag: name2 }
    ];

    // Download profile pictures and love GIF
    const avt1 = (await axios.get(`https://graph.facebook.com/${id1}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: "arraybuffer" })).data;
    const avt2 = (await axios.get(`https://graph.facebook.com/${id2}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: "arraybuffer" })).data;
    const gif = (await axios.get(`https://i.ibb.co/y4dWfQq/image.gif`, { responseType: "arraybuffer" })).data;

    // Save images to cache
    fs.writeFileSync(__dirname + "/cache/avt1.png", Buffer.from(avt1, "utf-8"));
    fs.writeFileSync(__dirname + "/cache/avt2.png", Buffer.from(avt2, "utf-8"));
    fs.writeFileSync(__dirname + "/cache/love.gif", Buffer.from(gif, "utf-8"));

    // Prepare attachments
    const attachments = [
      fs.createReadStream(__dirname + "/cache/avt1.png"),
      fs.createReadStream(__dirname + "/cache/love.gif"),
      fs.createReadStream(__dirname + "/cache/avt2.png")
    ];

    // Generate random love percentage
    const lovePercent = Math.floor(Math.random() * 101);

    // Final message
    const msg = {
      body: `🥰 Pairing Successful!\n❤️ Love Match: ${lovePercent}%\n${name1} ❤️ ${name2}`,
      mentions: arraytag,
      attachment: attachments
    };

    // Send message as a reply to the original command message
    return api.sendMessage(msg, threadID, undefined, messageID);
  }
};