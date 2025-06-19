const axios = require("axios");

module.exports.config = {
  name: "upscale",
  aliases: ["4k"],
  version: "2.0",
  role: 0,
  author: "Dipto",
  description: "Increase Photo quality ",
  category: "media",
  premium: true,
  guide: "{pn} [reply photo]",
  countDown: 15,
};

module.exports.onStart = async ({ message, event, api }) => {
  const dipto = "https://www.noobs-api.rf.gd/dipto";
  try {
    if (!event.messageReply || !event.messageReply.attachments || event.messageReply.attachments.length === 0)
      return message.reply("Please reply to an image to upscale");

    const imageLink = event.messageReply.attachments[0].url;
    const startTime = Date.now();
    const ok = await message.reply('Please wait... 😘');
    api.setMessageReaction("⌛", event.messageID, () => {}, true);

    const apiurl = `${dipto}/upscalev2?url=${encodeURIComponent(imageLink)}`;

    const endTime = Date.now();
    const timeTaken = (endTime - startTime) / 1000;

    api.setMessageReaction("✅", event.messageID, () => {}, true);
    message.unsend(ok.messageID);

    await message.reply({
      body: `✨ | Here's your image\n[ Generated in ${timeTaken} seconds ]`,
      attachment: await global.utils.getStreamFromURL(apiurl)
    });

  } catch (e) {
    console.error("4k Error: ", e.message);
    message.reply("4k Error: " + e.message);
  }
};