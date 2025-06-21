const axios = require("axios");

const baseApiUrl = async () => {
  return `https://rest-nyx-apis-production.up.railway.app/`;
};

module.exports = {
  config: {
    name: "pixart",
    version: "1.0",
    author: "xyz",
    countDown: 5,
    role: 0,
    shortDescription: "Generate image from prompt",
    longDescription: {
      en: "Generate image based on prompt ratio"
    },
    category: "GEN",
    guide: {
      en: "{pn} <prompt>"
    }
  },

  onStart: async function({ api, event, args }) {
    const prompt = args.join(" ");

    if (!prompt) {
      return api.sendMessage("⚠️ 𝑷𝒍𝒆𝒂𝒔𝒆 𝒑𝒓𝒐𝒗𝒊𝒅𝒆 𝒂 𝒑𝒓𝒐𝒎𝒑𝒕 𝒕𝒐 𝒈𝒆𝒏𝒆𝒓𝒂𝒕𝒆 𝒂𝒏 𝒊𝒎𝒂𝒈𝒆!", event.threadID);
    }

    try {
      const baseUrl = await baseApiUrl();
      const url = `${baseUrl}api/pixart?prompt=${encodeURIComponent(prompt)}&ratio=1:1`;

      const response = await axios.get(url);

      if (!response.data) {
        return api.sendMessage("❌ 𝑰𝒎𝒂𝒈𝒆 𝒄𝒐𝒖𝒍𝒅 𝒏𝒐𝒕 𝒃𝒆 𝒈𝒆𝒏𝒆𝒓𝒂𝒕𝒆𝒅!", event.threadID);
      }

      const imageUrl = response.data;

      return api.sendMessage(
        {
          body: `🖼️ 𝑰𝒎𝒂𝒈𝒆 𝒈𝒆𝒏𝒆𝒓𝒂𝒕𝒆𝒅 𝒇𝒐𝒓: "${prompt}"`,
          attachment: await global.utils.getStreamFromURL(imageUrl)
        },
        event.threadID
      );

    } catch (error) {
      console.error(error);
      return api.sendMessage("🚫 𝑬𝒓𝒓𝒐𝒓 𝒐𝒄𝒄𝒖𝒓𝒓𝒆𝒅 𝒘𝒉𝒊𝒍𝒆 𝒈𝒆𝒏𝒆𝒓𝒂𝒕𝒊𝒏𝒈 𝒊𝒎𝒂𝒈𝒆!", event.threadID);
    }
  }
};
