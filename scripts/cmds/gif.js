module.exports = {
  config: {
    name: "gif",
    version: "3.0.0",
    author: "Boss Bokkor",
    countDown: 5,
    role: 0,
    shortDescription: "Get gifs or mp4",
    longDescription: "Get gifs or mp4 from Rubish API",
    category: "media",
    guide: "{pn} [keyword] [limit] [format]\n\nExample:\n{pn} love 2 mp4\n{pn} sad 1 gif"
  },

  onStart: async function ({ api, event, args }) {
    const axios = require("axios");

    if (args.length < 1) {
      return api.sendMessage("❗Usage: gif [keyword] [limit] [format]\nExample: gif love 2 mp4", event.threadID, event.messageID);
    }

    const keyword = args[0];
    const limit = parseInt(args[1]) || 1;
    const format = (args[2] || "mp4").toLowerCase();

    const allowedFormats = [
      "mp4", "gif", "webm", "webp", "tinygif", "nanogif", "tinymp4", "nanomp4"
    ];

    if (!allowedFormats.includes(format)) {
      return api.sendMessage(`❌ Invalid format. Allowed: ${allowedFormats.join(", ")}`, event.threadID, event.messageID);
    }

    try {
      const res = await axios.get(`https://rubish-apihub.onrender.com/rubish/gif?q=${encodeURIComponent(keyword)}&limit=${limit}&apikey=rubish69`);
      const results = res.data.results;

      if (!results || results.length === 0) {
        return api.sendMessage(` No results found for "${keyword}"`, event.threadID, event.messageID);
      }

      for (let i = 0; i < Math.min(limit, results.length); i++) {
        const item = results[i];
        const media = item.media_formats[format];

        if (!media || !media.url) continue;

        const message = `Here your ${format} ${format === "gif" ? "bby 😘😘" : "video 😘😘"}`;
        await api.sendMessage({
          body: message,
          attachment: await global.utils.getStreamFromURL(media.url)
        }, event.threadID);
      }

    } catch (err) {
      console.error("GIF Command Error:", err);
      return api.sendMessage("❌ Something went wrong while fetching GIFs.", event.threadID, event.messageID);
    }
  }
};
