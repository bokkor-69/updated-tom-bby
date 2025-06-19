module.exports = {
  config:{
    name:'nigga',
    author:'Nyx',
    category:'GEN',
    version:'0.0.0.'
  },
  onStart: async function ({api,event,args}) {
    const query = args.join(" ");
    const axios = require("axios");
    try {
      if (!query) {
        return api.sendMessage("Prompt is required", event.threadID, event.messageID);
      }
      api.setMessageReaction("😘", event.messageID, () => {}, true);
      const ok = await axios.get(`${global.GoatBot.config.nyx}api/nigga?prompt=` + query, { responseType: "stream" });
      api.setMessageReaction("✅", event.messageID, () => {}, true);
      api.sendMessage({
        body: "Here is your Nigga image",
        attachment: ok.data
      }, event.threadID, event.messageID);
    } catch (e) {
      api.setMessageReaction("❎", event.messageID, () => {}, true);
      api.sendMessage("error: " + e.message, event.threadID, event.messageID);
    }
  }
}
