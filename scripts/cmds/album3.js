const axios = require("axios");
const { createWriteStream } = require("fs");
const { pipeline } = require("stream");
const { promisify } = require("util");
const streamPipeline = promisify(pipeline);
const path = require("path");
const os = require("os");
const fs = require("fs");

module.exports = {
  config: {
    name: "album3",
    version: "1.1",
    role: 0,
    author: "Bokkor",
    category: "media",
    guide: { en: "" }
  },

  onStart: async function ({ api, event, args }) {
    const base = "https://album-bokkor.onrender.com/api/album";

    // Add category
    if (args[0] === "add") {
      const category = args[1];
      const videoUrl = event.messageReply?.attachments?.[0]?.url || args[2];
      if (!category || !videoUrl)
        return api.sendMessage(
          "❌ Provide category and video URL or reply with a video",
          event.threadID,
          event.messageID
        );

      try {
        const res = await axios.get(`${base}/add/${category}?url=${encodeURIComponent(videoUrl)}`);
        if (res.data?.error)
          return api.sendMessage(res.data.error, event.threadID, event.messageID);

        return api.sendMessage(
          `✅ Video successfully added to category: ${category}`,
          event.threadID,
          event.messageID
        );
      } catch (err) {
        return api.sendMessage("❌ Failed to add video", event.threadID, event.messageID);
      }
    }

    // Show list
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

    // Stream video (main part)
    try {
      const res = await axios.get(`${base}/${encodeURIComponent(args[0])}`);
      if (!res?.data?.video)
        return api.sendMessage("❌ Not found", event.threadID, event.messageID);

      const videoUrl = res.data.video;
      const tempPath = path.join(os.tmpdir(), `${Date.now()}.mp4`);
      const writer = createWriteStream(tempPath);

      await streamPipeline(
        axios({
          method: "GET",
          url: videoUrl,
          responseType: "stream",
          headers: {
            "User-Agent": "Mozilla/5.0",
            "Accept": "*/*",
            "Accept-Encoding": "identity"
          }
        }).then(res => res.data),
        writer
      );

      const msg = `𝘏𝘦𝘳𝘦 𝘠𝘰𝘶𝘳 ${res.data.category} 𝘝𝘪𝘥𝘦𝘰 𝘣𝘣𝘺 😘`;
      api.sendMessage(
        {
          body: msg,
          attachment: fs.createReadStream(tempPath)
        },
        event.threadID,
        event.messageID,
        () => fs.unlinkSync(tempPath) // remove file after sending
      );
    } catch (error) {
      console.error("❌ Streaming failed:", error.message);
      return api.sendMessage("❌ Couldn't stream the video. Server rejected or invalid link.", event.threadID, event.messageID);
    }
  }
};