const axios = require("axios");

module.exports = {
  config: {
    name: "gilbilv2",
    version: "1.0",
    author: "Bokkor",
    role: 0,
    longDescription: {
      en: "Generate Ghibli-style image from text prompt"
    },
    category: "image",
    guide: {
      en: "{pn} [your prompt text]"
    }
  },

  onStart: async function ({ api, event, args }) {
    const prompt = args.join(" ");
    if (!prompt) {
      return api.sendMessage(
        "⚠️ Please provide a prompt to generate the image.\nExample: gilbilv2 a peaceful mountain village at sunrise",
        event.threadID,
        event.messageID
      );
    }

    api.setMessageReaction("🌄", event.messageID, () => {}, true);

    try {
      const apiUrl = `https://api.zetsu.xyz/api/ghibli?prompt=${encodeURIComponent(prompt)}`;
      const response = await axios.get(apiUrl, { responseType: "stream" });

      api.setMessageReaction("✅", event.messageID, () => {}, true);
      api.sendMessage({
        body: `🎬 Ghibli-style image generated from prompt:\n📝 "${prompt}"`,
        attachment: response.data
      }, event.threadID, event.messageID);

    } catch (err) {
      api.setMessageReaction("❌", event.messageID, () => {}, true);
      api.sendMessage("❌ Failed to generate image from prompt. Please try again later.", event.threadID, event.messageID);
    }
  }
};
