const axios = require("axios");

module.exports = {
  config: {
    name: "slink",
    aliases: ["shorturl", "shorten"],
    version: "1.0",
    author: "boss bokkor",
    countDown: 0,
    role: 0,
    description: "𝚂𝚑𝚘𝚛𝚝 𝚞𝚛𝚕 𝚞𝚜𝚒𝚗𝚐 𝙼𝚎𝚜𝚋𝚊𝚑 𝙰𝙿𝙸",
    category: "𝚄𝚃𝙸𝙻𝙸𝚃𝚈",
    guide: {
      en: "{pn} <url>"
    }
  },

  onStart: async function ({ message, args, event }) {
    const url = args[0];

    if (!url || !url.startsWith("http")) {
      return message.reply("❎ | 𝙿𝚕𝚎𝚊𝚜𝚎 𝚙𝚛𝚘𝚟𝚒𝚍𝚎 𝚊 𝚟𝚊𝚕𝚒𝚍 𝚄𝚁𝙻.");
    }

    try {
      message.reaction("⏳", event.messageID);
      const res = await axios.post("https://mesbah.freeuser.site/api/shorten/create", { url });

      if (res.data.success) {
        const { short_url, qr_code } = res.data.message;
        message.reply({
          body: `🔗 | 𝚂𝚑𝚘𝚛𝚝 𝚄𝚁𝙻: ${short_url}`,
          attachment: qr_code.startsWith("data:image")
            ? Buffer.from(qr_code.split(",")[1], 'base64')
            : undefined
        });
      } else {
        message.reply("❌ | 𝙵𝚊𝚒𝚕𝚎𝚍 𝚝𝚘 𝚜𝚑𝚘𝚛𝚝 𝚝𝚑𝚎 𝚞𝚛𝚕.");
      }
    } catch (err) {
      console.error(err);
      message.reply("⚠️ | 𝙴𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚛𝚎𝚍 𝚠𝚑𝚒𝚕𝚎 𝚜𝚑𝚘𝚛𝚝𝚎𝚗𝚒𝚗𝚐.");
    }
  }
};
