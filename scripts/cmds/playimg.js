const axios = require("axios");

const baseApiUrl = () => {
  return `https://rest-nyx-apis-production.up.railway.app/`;
};

module.exports = {
  config: {
    name: "playimg",
    version: "1.0",
    author: "xyz",
    countDown: 5,
    role: 0,
    shortDescription: "Generate image with prompt and ratio",
    longDescription: {
      en: "Generate image with user prompt and optional ratio (e.g. 1:1, 16:9)"
    },
    category: "GEN",
    guide: {
      en: "{pn} <prompt> | <ratio>"
    }
  },

  onStart: async function({ api, event, args }) {
    const text = args.join(" ");
    const parts = text.split("|").map(p => p.trim());

    const prompt = parts[0] || "";
    const ratio = parts[1] || "1:1";

    if (!prompt) {
      return api.sendMessage("⚠️ 𝑷𝒍𝒆𝒂𝒔𝒆 𝒑𝒓𝒐𝒗𝒊𝒅𝒆 𝒂 𝒑𝒓𝒐𝒎𝒑𝒕!", event.threadID);
    }

    try {
      const baseUrl = baseApiUrl();
      const url = `${baseUrl}api/playgroundv3?prompt=${encodeURIComponent(prompt)}&ratio=${encodeURIComponent(ratio)}`;

      const response = await axios.get(url);

      if (!response.data) {
        return api.sendMessage("❌ 𝑰𝒎𝒂𝒈𝒆 𝒄𝒐𝒖𝒍𝒅 𝒏𝒐𝒕 𝒃𝒆 𝒈𝒆𝒏𝒆𝒓𝒂𝒕𝒆𝒅!", event.threadID);
      }

     
      const imageUrl = response.data;

      return api.sendMessage(
        {
          body: ` 𝑰𝒎𝒂𝒈𝒆 𝒈𝒆𝒏𝒆𝒓𝒂𝒕𝒆𝒅:\n\n  💀Prompt: "${prompt}"\n\n Ratio: "${ratio}"`,
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
