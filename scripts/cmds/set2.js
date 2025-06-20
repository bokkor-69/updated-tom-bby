const axios = require('axios');

module.exports = {
  config: {
    name: "set",
    aliases: ['ap'],
    version: "1.2",
    author: "Loid Butter + Modified by Bokkor",
    role: 2,
    description: {
      en: "Set coins or experience points for a user using reply, mention, UID, or Facebook profile URL"
    },
    category: "economy",
    guide: {
      en: "{pn} [money|exp] [@mention|reply|uid|fb_url] [amount]"
    }
  },

  onStart: async function ({ args, event, api, usersData }) {
    const permission = global.GoatBot.config.owner;
    if (!permission.includes(event.senderID)) {
      return api.sendMessage("❌ Only bot owner can use this command.", event.threadID);
    }

    const query = args[0]?.toLowerCase();
    const amount = parseInt(args[args.length - 1]);
    const targetArg = args.slice(1, -1).join(" "); // Everything between query and amount
    const { senderID, threadID } = event;

    if (!['money', 'exp'].includes(query) || isNaN(amount)) {
      return api.sendMessage("❎ | Invalid command.\nUsage: set [money|exp] [@mention|reply|uid|fb_url] [amount]", threadID);
    }

    let targetUser;

    // 1. If message is a reply
    if (event.type === "message_reply") {
      targetUser = event.messageReply.senderID;
    }
    // 2. If mention
    else if (Object.keys(event.mentions).length > 0) {
      targetUser = Object.keys(event.mentions)[0];
    }
    // 3. If direct UID
    else if (/^\d+$/.test(targetArg)) {
      targetUser = targetArg;
    }
    // 4. If Facebook profile URL
    else if (/facebook\.com\/.+/.test(targetArg)) {
      try {
        const res = await axios.get(`https://api.saphire.dev/fbuid?url=${encodeURIComponent(targetArg)}`);
        targetUser = res.data?.uid;
        if (!targetUser) throw new Error("UID not found");
      } catch (e) {
        return api.sendMessage("❌ Failed to get UID from URL.", threadID);
      }
    } 
    else {
      return api.sendMessage("❎ | Please reply to a message, mention a user, provide UID, or Facebook URL.", threadID);
    }

    const userData = await usersData.get(targetUser);
    if (!userData) return api.sendMessage("❎ | User not found in database.", threadID);

    const name = await usersData.getName(targetUser);

    if (query === 'exp') {
      await usersData.set(targetUser, { ...userData, exp: amount });
      return api.sendMessage(`✅ | Set experience points to ${amount} for ${name}.`, threadID);
    } else if (query === 'money') {
      await usersData.set(targetUser, { ...userData, money: amount });
      return api.sendMessage(`✅ | Set coins to ${amount} for ${name}.`, threadID);
    }
  }
};