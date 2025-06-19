const axios = require("axios");

module.exports = {
  config: {
    name: "cdp",
    aliases: ["coupledp", "couplepic"],
    version: "1.1",
    author: "𝘉𝘰𝘬𝘬𝘰𝘳",
    countDown: 3,
    role: 0,
    shortDescription: {
      en: "Add or get couple pic"
    },
    category: "fun",
    guide: {
      en: "!cdp add (reply to 2 images)\n!cdp list\n!cdp"
    }
  },

  onStart: async function ({ event, message, args }) {

    const getImageStream = async (url) => {
      try {
        const res = await axios.get(url, {
          responseType: 'stream',
          headers: {
            'User-Agent': 'Mozilla/5.0'
          }
        });
        return res.data;
      } catch (err) {
        console.error("Image fetch error:", err.message);
        throw new Error("Image fetch failed");
      }
    };

    if (args[0] === "add") {
      if (!event.messageReply || event.messageReply.attachments.length !== 2) {
        return message.reply("⚠️ 𝘙𝘦𝘱𝘭𝘺 𝘮𝘦𝘴𝘴𝘢𝘨𝘦 𝘮𝘶𝘴𝘵 𝘤𝘰𝘯𝘵𝘢𝘪𝘯 𝘦𝘹𝘢𝘤𝘵𝘭𝘺 𝟮 𝘪𝘮𝘢𝘨𝘦𝘴.");
      }

      const imgs = event.messageReply.attachments.map(a => a.url);
      const url = `https://cdp-api-0txi.onrender.com/api/cdp/add?url=${encodeURIComponent(imgs[0])},${encodeURIComponent(imgs[1])}`;

      try {
        const res = await axios.get(url);
        return res.data.success
          ? message.reply("✅ 𝘊𝘰𝘶𝘱𝘭𝘦 𝘪𝘮𝘢𝘨𝘦 𝘢𝘥𝘥𝘦𝘥 𝘴𝘶𝘤𝘤𝘦𝘴𝘴𝘧𝘶𝘭𝘭𝘺 𝘣𝘣𝘺!")
          : message.reply("❌ 𝘍𝘢𝘪𝘭𝘦𝘥 𝘵𝘰 𝘢𝘥𝘥 𝘤𝘰𝘶𝘱𝘭𝘦 𝘪𝘮𝘢𝘨𝘦.");
      } catch {
        return message.reply("❌ Error occurred while adding.");
      }
    }

    if (args[0] === "list") {
      try {
        const res = await axios.get("https://cdp-api-0txi.onrender.com/api/cdp/list");
        return message.reply(`😘 𝘛𝘰𝘵𝘢𝘭 𝘤𝘰𝘶𝘱𝘭𝘦 𝘪𝘮𝘢𝘨𝘦𝘴: ${res.data.total}`);
      } catch {
        return message.reply("❌ 𝘊𝘰𝘶𝘭𝘥𝘯'𝘵 𝘧𝘦𝘵𝘤𝘩 𝘭𝘪𝘴𝘵.");
      }
    }

    // ✅ Main CDP fetch with safe image loading
    try {
      const res = await axios.get("https://cdp-api-0txi.onrender.com/api/cdp");
      const { boy, girl } = res.data.data;

      let boyStream, girlStream;

      try {
        boyStream = await global.utils.getStreamFromUrl(boy);
        girlStream = await global.utils.getStreamFromUrl(girl);
      } catch (err) {
        console.error("CDP image load failed:", err.message);
        return message.reply("❌ 𝘊𝘰𝘶𝘭𝘥𝘯'𝘵 𝘭𝘰𝘢𝘥 𝘤𝘰𝘶𝘱𝘭𝘦 𝘪𝘮𝘢𝘨𝘦 (𝘶𝘳𝘭 𝘦𝘹𝘱𝘪𝘳𝘦𝘥/𝘣𝘢𝘥 𝘧𝘰𝘳𝘮𝘢𝘵).");
      }

      return message.reply({
        body: "𝘏𝘦𝘳𝘦 𝘺𝘰𝘶𝘳 𝘤𝘥𝘱 𝘣𝘣𝘺 😘",
        attachment: [boyStream, girlStream]
      });

    } catch (err) {
      console.error("CDP API error:", err.message);
      return message.reply("❌ 𝘊𝘰𝘶𝘭𝘥𝘯'𝘵 𝘧𝘦𝘵𝘤𝘩 𝘤𝘰𝘶𝘱𝘭𝘦 𝘥𝘢𝘵𝘢.");
    }
  }
};