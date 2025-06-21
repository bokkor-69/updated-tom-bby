const axios = require("axios");

module.exports = {
  config: {
    name: "sex",
    version: "1.0",
    author: "xyz",
    countDown: 5,
    role: 2,
    shortDescription: "Search Pinayflix videos by page",
    longDescription: {
      en: "Search videos from Pinayflix with page number 1-5"
    },
    category: "18+",
    guide: {
      en: "{pn} <page_number> (1 to 5)"
    }
  },

  onStart: async function({ api, event, args }) {
    const page = args[0] || "1";
    const pageNum = parseInt(page);

    if (isNaN(pageNum) || pageNum < 1 || pageNum > 5) {
      return api.sendMessage("⚠️ Please provide a valid page number between 1 and 5!", event.threadID);
    }

    try {
      const url = `https://rest-nyx-apis-production.up.railway.app/api/pinayflix?search=cat&page=${pageNum}`;
      const response = await axios.get(url);

      if (!Array.isArray(response.data) || response.data.length === 0) {
        return api.sendMessage("❌ No videos found for this page!", event.threadID);
      }

    
      for (const video of response.data) {
        const stream = await global.utils.getStreamFromURL(video.video);
        const videoMessage = {
          body: `🎬 Title: ${video.title}`,
          attachment: stream
        };
        await api.sendMessage(videoMessage, event.threadID);
      }

      
      await api.sendMessage(`Here your Video 💀 \n (Page: ${pageNum})`, event.threadID);

    } catch (error) {
      console.error(error);
      return api.sendMessage("🚫 Error occurred while fetching videos!", event.threadID);
    }
  }
};
