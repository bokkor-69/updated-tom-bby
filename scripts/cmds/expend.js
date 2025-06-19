const axios = require("axios");

module.exports = {
  config: { 
    name: "expend", 
    version: "3.0", 
    author: "Nyx",
    role: 0, 
    longDescription: { en: "Expand your images" },
    category: "GEN",
    guide: { 
      en: "{pn} reply to an image or provide image URL (optional: - [ratio])" 
    } 
  },

  onStart: async function({ api, event, args }) { 
    let imageUrl = event?.messageReply?.attachments?.[0]?.url;
    let ratioType = "";

    // If image is not replied, check if URL is passed via args
    if (!imageUrl && args.length > 0) {
      const urlMatch = args[0].match(/https?:\/\/.+/);
      if (urlMatch) {
        imageUrl = urlMatch[0];
        args.shift(); 
      }
    }

    // Check for ratio type
    if (args.length > 1 && args[0] === "-") {
      const possibleRatio = args[1].trim();
      if (possibleRatio && !isNaN(possibleRatio)) {
        ratioType = possibleRatio;
      }
    }

    if (!imageUrl) {
      return api.sendMessage(
        "⚠️ Please reply to an image or provide a valid image URL.",
        event.threadID,
        event.messageID
      );
    }

    api.setMessageReaction("🐢", event.messageID, () => {}, true);

    try {
      const apiUrl = `https://rest-nyx-apis-production.up.railway.app/api/expend?link=${encodeURIComponent(imageUrl)}&ratioType=${encodeURIComponent(ratioType)}`;
      const response = await axios.get(apiUrl, { responseType: "stream" });

      api.setMessageReaction("✅", event.messageID, () => {}, true);
      api.sendMessage({
        body: "✅ Here is your expanded image:",
        attachment: response.data
      }, event.threadID, event.messageID);
      
    } catch (err) {
      api.setMessageReaction("❌", event.messageID, () => {}, true);
      api.sendMessage("❌ Failed to expand the image. Please try again later.", event.threadID, event.messageID);
    }
  }
};
