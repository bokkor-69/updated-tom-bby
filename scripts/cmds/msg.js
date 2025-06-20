module.exports = {
  config: {
    name: "msg",
    aliases: ["private", "anon"],
    version: "1.0",
    author: "Samir",
    countDown: 5,
    role: 2,
    shortDescription: {
      en: "Send anonymous message to user"
    },
    longDescription: {
      en: "Send anonymous message using thread or user ID"
    },
    category: "box chat",
    guide:{
      en: "{p}anon id text"
    }
  },
  onStart: async function ({ api, event, args }) {
    const permission = global.GoatBot.config.owner;
        if (!permission.includes(event.senderID)) {
            return message.reply("❌ ᴏɴʟʏ ʙᴏᴛ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ. ᴛʏᴘᴇ !ɪɴꜰᴏ ꜰᴏʀ ᴏᴡɴᴇʀ ɪɴꜰᴏ ");
        }
    if (args.length < 2) {
      return api.sendMessage(
        "Syntax error, use: anon ID_BOX [message]",
        event.threadID,
        event.messageID
      );
    }

    const idBox = args[0];
    const message = args.slice(1).join(" ");

    api.sendMessage({
      body: message,
      mentions: [{
        tag: "@anon",
        id: event.senderID
      }]
    }, idBox, () => {
      api.sendMessage(
        `Sent message "${message}" to ${idBox}`,
        event.threadID
      );
    });
  }
};
