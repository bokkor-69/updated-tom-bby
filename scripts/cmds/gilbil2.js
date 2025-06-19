const axios = require("axios");

module.exports = {
  config: { 
    name: "ghibli", 
    version: "3.0", 
    author: "Nyx",
    role: 0, 
    longDescription: { en: "Change your image to Ghibli Style" },
    category: "GEN",
    guide: { 
      en: "{pn} reply to an image" 
    } 
  },

  onStart: async function({ api, event, args }) { 
    const imageUrl = event?.messageReply?.attachments?.[0]?.url;
    
    if (!imageUrl) {
      return api.sendMessage("⚠️ Please reply to an image", event.threadID, event.messageID);
    }

    api.setMessageReaction("🐢", event.messageID, () => {}, true);

    try {
      const tinyUrlResponse = await axios.get(`https://tinyurl.com/api-create.php?url=${imageUrl}`);
      const i = tinyUrlResponse.data;

      const apiUrl = `https://www.noobz-api.rf.gd/api/ghibli_image-to-image?imageUrl=${i}`;
      const response = await axios.get(apiUrl, { responseType: "stream" });

      api.setMessageReaction("✅", event.messageID, () => {}, true);
      api.sendMessage({ 
        body: "Here is your Ghibli style image", 
        attachment: response.data 
      }, event.threadID, event.messageID);

    } catch (e) {
      api.setMessageReaction("❌", event.messageID, () => {}, true);
      api.sendMessage("❌ Failed to process the image.", event.threadID, event.messageID);
    }
  } 
};
