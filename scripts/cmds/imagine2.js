const axios = require("axios");

module.exports = {
  config: {
    name: "i",
    version: "1.4",
    author: "♡︎ 𝐻𝑎𝑠𝑎𝑛 ♡︎",
    countDown: 3,
    role: 0,
    longDescription: {
      en: "Get images from text. Now with size & random mode!"
    },
    category: "GEN",
    guide: {
      en:
        "Type: {pn} prompt | [model] | [ratio] | [size]\nExample: {pn} cute cat | anime | 1:1 | 512x512\nType: {pn} random → get a surprise image!"
    },
  },

  onStart: async function ({ api, args, message, event }) {
    try {
      if (!args.length) return message.reply("⚠️ | Please provide a prompt.");

      const modelMap = {
        anime: "anime",
        art: "artistic",
        realistic: "realistic"
      };
      const ratios = ["1:1", "3:2", "4:3", "3:4", "16:9", "9:16"];

      // 🔥 Random Mode
      const randomPrompts = ["cyberpunk city", "fantasy landscape", "cute robot", "dragon rider", "alien cat"];
      const randomModel = ["anime", "artistic", "realistic"];
      const randomSize = ["512x512", "768x768", "1024x768", "640x960"];
      const randomRatio = ratios;

      let model = "realistic";
      let ratio = "1:1";
      let prompt = args.join(" ");
      let size = "";

      if (prompt.toLowerCase().includes("random")) {
        prompt = randomPrompts[Math.floor(Math.random() * randomPrompts.length)];
        model = randomModel[Math.floor(Math.random() * randomModel.length)];
        ratio = randomRatio[Math.floor(Math.random() * randomRatio.length)];
        size = randomSize[Math.floor(Math.random() * randomSize.length)];
      } else {
        const parts = prompt.split("|").map(p => p.trim());
        parts.forEach(part => {
          const lower = part.toLowerCase();
          if (modelMap[lower]) model = modelMap[lower];
          else if (ratios.includes(lower)) ratio = lower;
          else if (/^\d{2,4}x\d{2,4}$/.test(lower)) size = lower;
          else prompt = part;
        });
      }

      const waiting = await message.reply("✨ | Generating your imagine photo...");
      api.setMessageReaction("🧠", event.messageID, () => {}, true);

      const url = `https://www.noobz-api.rf.gd/api/imagine?prompt=${encodeURIComponent(prompt)}&style=${model}&aspect_ratio=${ratio}${size ? `&size=${size}` : ""}`;

      const img = await global.utils.getStreamFromURL(url);

      await message.reply({
        body: `🎨 Prompt: ${prompt}\n🧩 Model: ${model}\n📐 Ratio: ${ratio}${size ? `\n🖼 Size: ${size}` : ""}`,
        attachment: img,
      });

      api.setMessageReaction("💖", event.messageID, () => {}, true);
      api.unsendMessage(waiting.messageID);
    } catch (err) {
      console.error(err);
      message.reply("❌ Failed to generate image. Try again later.");
    }
  },
};
