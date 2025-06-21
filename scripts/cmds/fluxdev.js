const axios = require("axios");
const fs = require("fs");
const path = require("path");
module.exports.config = {
  name: "fluxdev",
  version: "2.0",
  role: 0,
  author: "Nyx",
  description: "Generate image from prompt using FluxDev API",
  category: "GEN",
  premium: false,
  guide: "{pn} prompt - ratio\nExample: {pn} A castle on a hill - 16:9\nTo see supported ratios: {pn} ratio",
  countDown: 15,
};

const validRatios = ["1:1", "9:16", "16:9", "4:3", "3:4", "21:9", "9:21"];

module.exports.onStart = async function ({ event, args, api }) {
  try {
    const input = args.join(" ").trim();
    if (!input || input.toLowerCase() === "ratio") {
      return api.sendMessage(`📐 Available Ratios:\n${validRatios.join("\n")}`, event.threadID, event.messageID);
    }
    const [rawPrompt, rawRatio] = input.split(" - ").map(item => item?.trim());
    const prompt = rawPrompt;
    const ratio = rawRatio || "1:1";
    if (!prompt) {
      return api.sendMessage("❌ Please provide a prompt before the ratio.", event.threadID, event.messageID);
    }

    if (!validRatios.includes(ratio)) {
      return api.sendMessage(`❌ Invalid ratio "${ratio}"\nUse '${this.config.name} ratio' to view valid options.`, event.threadID, event.messageID);
    }
    const startTime = Date.now();
    const waitMessage = await api.sendMessage("⏳ Generating your image, please wait...", event.threadID, event.messageID);
    api.setMessageReaction("⌛", event.messageID, () => {}, true);
    const apiUrl = `${global.GoatBot.config.nyx}api/fluxdev?prompt=${encodeURIComponent(prompt)}&ratio=${encodeURIComponent(ratio)}`;
    const response = await axios.get(apiUrl, { responseType: "arraybuffer" });
    const filePath = path.join(__dirname, "cache", `fluxdev_${Date.now()}.jpg`);
    fs.writeFileSync(filePath, Buffer.from(response.data));
    const timeTaken = ((Date.now() - startTime) / 1000).toFixed(2);
    api.setMessageReaction("✅", event.messageID, () => {}, true);
    api.unsendMessage(waitMessage.messageID);
    api.sendMessage(
      {
        body: `🖼️ Here's your image (Generated in ${timeTaken}s)`,
        attachment: fs.createReadStream(filePath),
      },
      event.threadID,
      event.messageID
    );
    setTimeout(() => fs.unlinkSync(filePath), 30 * 1000);
  } catch (error) {
    api.sendMessage(`❌ Error: ${error.response?.data?.error || error.message}`, event.threadID, event.messageID);
  }
};