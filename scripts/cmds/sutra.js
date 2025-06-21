const axios = require("axios");

const baseApiUrl = async () => {
  const base = `https://rest-nyx-apis-production.up.railway.app/`;
  return base;
};

module.exports = {
  config: {
    name: "sutra",
    version: "1.0",
    author: "xyz",
    countDown: 5,
    role: 0,
    shortDescription: "Get info about a topic",
    longDescription: {
      en: "Fetches detailed info about a given prompt"
    },
    category: "info",
    guide: {
      en: "{pn} <topic>"
    }
  },

  onStart: async function({ api, event, args }) {
    const prompt = args.join(" ");

    if (!prompt) {
      return api.sendMessage("⚠️ 𝑷𝒍𝒆𝒂𝒔𝒆 𝒑𝒓𝒐𝒗𝒊𝒅𝒆 𝒂 𝒕𝒐𝒑𝒊𝒄 𝒐𝒓 𝒌𝒆𝒚𝒘𝒐𝒓𝒅!", event.threadID);
    }

    try {
      const baseUrl = await baseApiUrl();
      const response = await axios.get(`${baseUrl}api/sutra?prompt=${encodeURIComponent(prompt)}`);

      if (!response.data || !response.data.dataa) {
        return api.sendMessage("❌ 𝑵𝒐 𝒊𝒏𝒇𝒐 𝒇𝒐𝒖𝒏𝒅 𝒇𝒐𝒓 𝒕𝒉𝒆 𝒈𝒊𝒗𝒆𝒏 𝒕𝒐𝒑𝒊𝒄!", event.threadID);
      }

      const info = response.data.dataa;

      const msg = `📚 𝑰𝒏𝒇𝒐 𝒂𝒃𝒐𝒖𝒕: ${prompt}\n\n${info}`;

      return api.sendMessage(msg, event.threadID);

    } catch (error) {
      console.error(error);
      return api.sendMessage("🚫 𝑬𝒓𝒓𝒐𝒓 𝒐𝒄𝒄𝒖𝒓𝒓𝒆𝒅 𝒘𝒉𝒊𝒍𝒆 𝒇𝒆𝒕𝒄𝒉𝒊𝒏𝒈 𝒊𝒏𝒇𝒐!", event.threadID);
    }
  }
};
