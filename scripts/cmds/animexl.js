const axios = require("axios");

module.exports = {
  config: {
    name: "animexl",
    author: "Nyx",
    category: "gen",
    usePrefix: true,
    role: 0
  },
  
  onStart: async ({ args, message }) => {
    const prompt = args.join(" ");
    if (!prompt) {
      message.reply("❌ Please provide a prompt for image generation.");
      return;
    }
    
    try {
      const loadingMsg = await message.reply("⏳ Generating AnimeXl image, please wait...");
      
      const apiUrl = `${global.GoatBot.config.nyx}api/AnimeXl?prompt=${encodeURIComponent(prompt)}`;
      const response = await axios.get(apiUrl);
      const imageUrls = response.data.urls;
      
      if (!Array.isArray(imageUrls) || imageUrls.length === 0) {
        message.reply("❌ No images returned from the API.");
        return;
      }
      
      const attachments = await Promise.all(
        imageUrls.map(async (url) => {
          const imgRes = await axios.get(url, { responseType: "stream" });
          return imgRes.data;
        })
      );
      
      await message.reply({
        body: `AnimeXl generated: ${prompt}`,
        attachment: attachments
      });
      
      if (loadingMsg) {
        await message.unsend(loadingMsg.messageID);
      }
      
    } catch (error) {
      message.reply("❌ Error generating image. Please try again later.\n" + error.message);
    }
  }
};