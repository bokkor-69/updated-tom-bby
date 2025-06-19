 module.exports = {
  config: {
    name: 'cdn',
    category: 'MEDIA',
    author: 'Nyx',
    description: 'Image, Video , Sound to direct link'
  },

  onStart: async ({ event, message }) => {
    const axios = require('axios');

    const att = event.messageReply?.attachments?.[0]?.url;
    if (!att) return message.reply("📌 Reply to an image, video, or sound file.");

    try {
      const res = await axios.get(`https://rest-nyx-apis-production.up.railway.app/api/cdnUploader?url=${encodeURIComponent(att)}`);
      const uploadedUrl = res?.data?.uploadedUrl;

      if (!uploadedUrl) return message.reply("❌ Failed to upload. Try again.");
      message.reply(uploadedUrl);
    } catch (e) {
      message.reply("❌ Error: " + e.message);
    }
  }
};