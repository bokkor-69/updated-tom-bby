const axios = require("axios");

module.exports.config = {
  name: "g",
  version: "1.7",
  role: 0,
  author: "your dad",
  description: "Ghibli Style Image Generator",
  category: "Image gen",
  guide: "{pn} [prompt]",
  countDown: 10,
};

module.exports.onStart = async ({ event, args, api }) => {
  const ghibliAPI = "https://www.noobz-api.rf.gd/api/ghibli_text";

  try {
    const prompt = args.join(" ");
    if (!prompt) {
      return api.sendMessage(
        "⚠️ Please provide a prompt.\n\nExample: {pn} a cute anime boy",
        event.threadID,
        event.messageID
      );
    }

    const waitMessage = await api.sendMessage(
      "🎨 Generating Ghibli-style image, please wait...😘",
      event.threadID
    );

    api.setMessageReaction("😘", event.messageID, () => {}, true);

    const apiurl = `${ghibliAPI}?prompt=${encodeURIComponent(prompt)}`;

    const response = await axios.get(apiurl, { responseType: "stream" });

    api.setMessageReaction("🐤", event.messageID, () => {}, true);
    api.unsendMessage(waitMessage.messageID);

    api.sendMessage(
      {
        body: "✅ Here's your Ghibli-style image!",
        attachment: response.data,
      },
      event.threadID,
      event.messageID
    );
  } catch (e) {
    console.error(e);
    api.sendMessage("❌ Error: " + e.message, event.threadID, event.messageID);
  }
};
