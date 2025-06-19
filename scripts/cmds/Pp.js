module.exports = {
  config: {
    name: "profile",
    aliases: ["pfp", "pp"],
    version: "1.2",
    author: "dipto",
    countDown: 5,
    role: 0,
    description: "Get profile picture of a user",
    category: "image",
    guide: { en: "{pn} @tag or userID or reply to a message or provide a Facebook URL" }
  },

  onStart: async function ({ event, message, usersData, args }) {
    const getAvatarUrl = async (uid) => await usersData.getAvatarUrl(uid);
    let uid = event.senderID;
    let avt;

    try {
      if (event.type === "message_reply") {
        uid = event.messageReply.senderID;
      } else if (Object.keys(event.mentions).length > 0) {
        uid = Object.keys(event.mentions)[0];
      } else if (args.length > 0 && args.join(" ").includes("facebook.com")) {
        const match = args.join(" ").match(/(\d{5,})/);
        if (match) uid = match[1];
        else throw new Error("⚠️ Please provide a valid Facebook URL.");
      } else if (args.length > 0 && /^\d{5,}$/.test(args[0])) {
        uid = args[0];
      }

      avt = await getAvatarUrl(uid);
      message.reply({
        body: "",
        attachment: await global.utils.getStreamFromURL(avt)
      });

    } catch (error) {
      message.reply(`⚠️ Error: ${error.message}`);
    }
  }
};