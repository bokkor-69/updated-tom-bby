const axios = require("axios");

const baseApiUrl = async () => {
  const base = `https://rest-nyx-apis-production.up.railway.app/`;
  return base;
};

module.exports = {
  config: {
    name: "tikinfo",
    aliases: ["stalktik"],
    version: "1.0",
    author: "xyz",
    countDown: 5,
    role: 0,
    shortDescription: "Get TikTok user info",
    longDescription: {
      en: "Provides you the information of TikTok user"
    },
    category: "info",
    guide: {
      en: "{pn} <username>"
    }
  },

  onStart: async function({ api, event, args }) {
    const userName = args.join(' ');

    if (!userName) {
      return api.sendMessage("⚠️ 𝑷𝒍𝒆𝒂𝒔𝒆 𝒑𝒓𝒐𝒗𝒊𝒅𝒆 𝒂 𝑻𝒊𝒌𝑻𝒐𝒌 𝒖𝒔𝒆𝒓𝒏𝒂𝒎𝒆!", event.threadID);
    }

    try {
      const baseUrl = await baseApiUrl();
      const response = await axios.get(`${baseUrl}api/tikstalk?query=${userName}`);

      if (!response.data || response.data.code !== 0) {
        return api.sendMessage("❌ 𝑼𝒔𝒆𝒓 𝒏𝒐𝒕 𝒇𝒐𝒖𝒏𝒅 𝒐𝒓 𝒊𝒏𝒗𝒂𝒍𝒊𝒅 𝒓𝒆𝒔𝒑𝒐𝒏𝒔𝒆!", event.threadID);
      }

      const user = response.data.data.user;
      const stats = response.data.data.stats;

      const userInfoMessage = {
        body: 
`📱 𝑻𝒊𝒌𝑻𝒐𝒌 𝑼𝒔𝒆𝒓 𝑰𝒏𝒇𝒐 ✨

━━━━━━━━━━━━━━━━━━━

💀 𝑼𝒔𝒆𝒓𝒏𝒂𝒎𝒆: ${user.uniqueId} \n
💫 𝑵𝒊𝒄𝒌𝒏𝒂𝒎𝒆: ${user.nickname} \n
👥 𝑭𝒐𝒍𝒍𝒐𝒘𝒆𝒓𝒔: ${stats.followerCount} \n
👀 𝑭𝒐𝒍𝒍𝒐𝒘𝒊𝒏𝒈: ${stats.followingCount} \n
🖤 𝑯𝒆𝒂𝒓𝒕𝒔: ${stats.heartCount} \n
✨ 𝑽𝒊𝒅𝒆𝒐𝒔: ${stats.videoCount} \n

🖋️ 𝑩𝒊𝒐:
${user.signature || "None"}


🖼️ 𝑷𝒓𝒐𝒇𝒊𝒍𝒆 𝑰𝒎𝒂𝒈𝒆 👇

━━━━━━━━━━━━━━━━━━━`,
        attachment: await global.utils.getStreamFromURL(user.avatarLarger)
      };

      return api.sendMessage(userInfoMessage, event.threadID);

    } catch (error) {
      console.error(error);
      return api.sendMessage("🚫 𝑨𝒏 𝒆𝒓𝒓𝒐𝒓 𝒐𝒄𝒄𝒖𝒓𝒓𝒆𝒅 𝒘𝒉𝒊𝒍𝒆 𝒇𝒆𝒕𝒄𝒉𝒊𝒏𝒈 𝒊𝒏𝒇𝒐!", event.threadID);
    }
  }
};
