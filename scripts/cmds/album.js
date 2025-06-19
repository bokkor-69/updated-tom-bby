const axios = require("axios");

module.exports = {
  config: {
    name: "album",
    version: "1.0",
    role: 0,
    author: "Bokkor",
    category: "media",
    guide: { en: "" }
  },

  onStart: async function ({ api, event, args }) {
    const base = "https://album-bokkor.onrender.com/api/album";

    if (args[0] === "add") {
      const category = args[1];
      const videoUrl = event.messageReply?.attachments?.[0]?.url || args[2];
      if (!category || !videoUrl)
        return api.sendMessage(
          "❌ Provide category and video URL or reply with a video",
          event.threadID,
          event.messageID
        );
      const res = await axios.get(`${base}/add/${category}?url=${encodeURIComponent(videoUrl)}`);
      if (res.data?.error)
        return api.sendMessage(res.data.error, event.threadID, event.messageID);
      return api.sendMessage(
        `✅ Video successfully added to category: ${category}`,
        event.threadID,
        event.messageID
      );
    }

    if (!args[0] || args[0] === "list") {
      try {
        const res = await axios.get(`${base}/list`);
        const data = res.data?.data || {};
        if (Object.keys(data).length === 0)
          return api.sendMessage("❌ No categories found", event.threadID, event.messageID);

        let msg = "😘😘 Total Video Categories:\n\n";
        for (const [cat, count] of Object.entries(data)) {
          msg += `🐣 Category: ${cat}\n🐣 Videos: ${count}\n\n`;
        }
        return api.sendMessage(msg.trim(), event.threadID, event.messageID);
      } catch {
        return api.sendMessage("❌ Error fetching list", event.threadID, event.messageID);
      }
    }

    try {
      const res = await axios.get(`${base}/${args[0]}`);
      if (!res?.data?.video)
        return api.sendMessage("❌ Not found", event.threadID, event.messageID);

      const msg = `𝘏𝘦𝘳𝘦 𝘠𝘰𝘶𝘳 ${res.data.category} 𝘝𝘪𝘥𝘦𝘰 𝘣𝘣𝘺 😘`;
      const videoStream = await global.utils.getStreamFromURL(res.data.video);
      return api.sendMessage(
        { body: msg, attachment: videoStream },
        event.threadID,
        event.messageID
      );
    } catch {
      return api.sendMessage("❌ Error fetching video", event.threadID, event.messageID);
    }
  }
};