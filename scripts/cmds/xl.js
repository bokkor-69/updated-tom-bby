const axios = require("axios");

module.exports.config = {
  name: "xl",
  version: "2.0",
  role: 0,
  author: "Dipto",
  description: "Flux Image Generator",
  category: "GEN",
  premium: true,
  guide: "{pn} [prompt]",
  countDown: 15,
};

module.exports.onStart = async ({ event, args, api }) => {
  const fluxAPI = "https://rest-nyx-apis-production.up.railway.app/api/xl3";

  try {
    const prompt = args.join(" ");
    const startTime = Date.now();

    const waitMessage = await api.sendMessage("Generating image, please wait... 😘", event.threadID);
    api.setMessageReaction("⌛", event.messageID, () => {}, true);

    const apiurl = `${fluxAPI}?prompt=${encodeURIComponent(prompt)}`;
    const response = await axios.get(apiurl, { responseType: "stream" });

    const timeTaken = ((Date.now() - startTime) / 1000).toFixed(2);

    api.setMessageReaction("✅", event.messageID, () => {}, true);
    api.unsendMessage(waitMessage.messageID);

    api.sendMessage({
      body: `Here's your image (Generated in ${timeTaken} seconds)`,
      attachment: response.data,
    }, event.threadID, event.messageID);

  } catch (e) {
    console.error(e);
    api.sendMessage("Error: " + e.message, event.threadID, event.messageID);
  }
};
