const API_KEY = "dipto008"; // 🔑 একবারে key সেট করা হলো

module.exports = {
  config: {
    name: "f",
    aliases: ["fchat", "fakec"],
    version: "1.0",
    role: 1,
    premium: true,
    author: "Dipto",
    Description: "Get a fake chat of user",
    category: "system",
    countDown: 10,
  },
  onStart: async ({ event, message, usersData, api, args }) => {
    const permission = global.GoatBot.config.owner;
    if (!permission.includes(event.senderID)) {
      return message.reply("❌ ᴏɴʟʏ ʙᴏᴛ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ. ᴛʏᴘᴇ !ɪɴꜰᴏ ꜰᴏʀ ᴏᴡɴᴇʀ ɪɴꜰᴏ ");
    }

    try {
      const userText = args.join(" ");
      const uid1 = event.senderID;
      const uid2 = Object.keys(event.mentions)[0];
      let uid;

      if (args[0]) {
        if (/^\d+$/.test(args[0])) {
          uid = args[0];
        } else {
          const match = args[0].match(/profile\.php\?id=(\d+)/);
          if (match) {
            uid = match[1];
          }
        }
      }

      if (!uid) {
        uid =
          event.type === "message_reply"
            ? event.messageReply.senderID
            : uid2 || uid1;
      }

      if (uid == "100044327656712") return message.reply("koto boro sahos tor😦");

      const avatarUrl = `https://graph.facebook.com/${uid}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
      const userName = await usersData.getName(uid);

      let url = `https://www.noobs-api.rf.gd/dipto/fbfakechat?name=${encodeURIComponent(userName)}&dp=${encodeURIComponent(avatarUrl)}&text=${encodeURIComponent(userText)}&key=${API_KEY}`;

      const chatImg = event?.messageReply?.attachments[0]?.url;
      if (chatImg) {
        url += `&chatimg=${encodeURIComponent(chatImg)}`;
      }

      message.reply({
        attachment: await global.utils.getStreamFromURL(url),
      });
    } catch (e) {
      message.reply("error 😦😦");
      console.log("fakechat error", e);
    }
  }
};
