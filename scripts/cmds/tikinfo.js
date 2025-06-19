const axios = require("axios");

const baseApiUrl = async () => {
  const base = await axios.get(
    `https://raw.githubusercontent.com/Mostakim0978/D1PT0/refs/heads/main/baseApiUrl.json`,
  );
  return base.data.xnil;
};

module.exports = {
  config: {
    name: "tikinfo",
    aliases: ["stalktik"],
    version: "1.0",
    author: "xnil6x",
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
      const response = await axios.get(
        `${await baseApiUrl()}/xnil/tikstalk?uniqueid=${userName}`);

      if (!response.data || !response.data.id) {
        return api.sendMessage("❌ 𝑼𝒔𝒆𝒓 𝒏𝒐𝒕 𝒇𝒐𝒖𝒏𝒅 𝒐𝒓 𝒊𝒏𝒗𝒂𝒍𝒊𝒅 𝒓𝒆𝒔𝒑𝒐𝒏𝒔𝒆!", event.threadID);
      }

      const userInfoMessage = {
        body:
`📱 𝑻𝒊𝒌𝑻𝒐𝒌 𝑼𝒔𝒆𝒓 𝑰𝒏𝒇𝒐 ✨

━━━━━━━━━━━━━━━━━━━

🆔 𝑼𝒔𝒆𝒓 𝑰𝑫:
${response.data.id}

👤 𝑼𝒔𝒆𝒓𝒏𝒂𝒎𝒆:
${response.data.username}

📝 𝑵𝒊𝒄𝒌𝒏𝒂𝒎𝒆:
${response.data.nickname}

💬 𝑺𝒊𝒈𝒏𝒂𝒕𝒖𝒓𝒆:
${response.data.signature || "None"}

👥 𝑭𝒐𝒍𝒍𝒐𝒘𝒆𝒓𝒔:
${response.data.followerCount}

➡️ 𝑭𝒐𝒍𝒍𝒐𝒘𝒊𝒏𝒈:
${response.data.followingCount}

❤️ 𝑯𝒆𝒂𝒓𝒕𝒔:
${response.data.heartCount}

🎞️ 𝑽𝒊𝒅𝒆𝒐𝒔:
${response.data.videoCount}

🔐 𝑺𝒆𝒄𝑼𝑰𝑫:
${response.data.secUid}

🖼️ 𝑷𝒓𝒐𝒇𝒊𝒍𝒆 𝑷𝒊𝒄: 👇

━━━━━━━━━━━━━━━━━━━`,
        attachment: await global.utils.getStreamFromURL(response.data.avatarLarger)
      };

      return api.sendMessage(userInfoMessage, event.threadID);

    } catch (error) {
      console.error(error);
      return api.sendMessage("🚫 𝑨𝒏 𝒆𝒓𝒓𝒐𝒓 𝒐𝒄𝒄𝒖𝒓𝒓𝒆𝒅 𝒘𝒉𝒊𝒍𝒆 𝒇𝒆𝒕𝒄𝒉𝒊𝒏𝒈 𝒊𝒏𝒇𝒐!", event.threadID);
    }
  }
};
