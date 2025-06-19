!eval
const axios = require("axios");
const fs = require("fs");
const { createWriteStream } = require("fs");
const { getStreamFromURL } = global.utils;

module.exports = {
  config: {
    name: "anigen",
    author: "Bokkor",
    category: "gen",
    description: "Generate HD anime style image"
  },

  onStart: async ({ message, args }) => {
    const prompt = args.join(" ");
    if (!prompt) return message.reply("Please provide a prompt!");

    try {
      await message.reply("wait bby>😘");

      const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt + " anime style")}`;
      const imgStream = await getStreamFromURL(url);
      const filename = __dirname + "/anime.png";

      const writeStream = createWriteStream(filename);
      imgStream.pipe(writeStream);
      writeStream.on("finish", () => {
        message.reply({
          body: `Here Your Image Bby 😘😘`,
          attachment: fs.createReadStream(filename)
        });
      });

    } catch (err) {
      console.log(err);
      message.reply("❌ Couldn't create anime image, sorry bby~");
    }
  }
};
