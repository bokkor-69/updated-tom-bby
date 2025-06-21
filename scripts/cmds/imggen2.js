const axios = require("axios");

module.exports.config = {
  name: "imggen2",
  version: "1.0",
  role: 0,
  author: "xyz",
  description: "Generate image from prompt with ratio",
  category: "GEN",
  premium: false,
  guide: "{pn} [prompt] --ratio 16:9\n{pn} [prompt]",
  countDown: 15,
};

module.exports.onStart = async ({ event, args, api }) => {
  try {
    if (!args.length)
      return api.sendMessage(
        "❌ Please provide a prompt, for example: genimage cat --ratio 16:9",
        event.threadID,
        event.messageID
      );

    const input = args.join(" ");
    const [prompt, ratio = "16:9"] = input.includes("--ratio")
      ? input.split("--ratio").map((s) => s.trim())
      : [input, "16:9"];

    const startTime = Date.now();

    const waitMessage = await api.sendMessage(
      "Generating image, please wait... 😘",
      event.threadID,
      event.messageID
    );
    api.setMessageReaction("⌛", event.messageID, () => {}, true);

    
    const apiUrl = `https://rest-nyx-apis-production.up.railway.app/api/google-imagen3?prompt=${encodeURIComponent(
      prompt
    )}&ratio=${encodeURIComponent(ratio)}`;

    const { data: imageUrl } = await axios.get(apiUrl);

   
    const imageStream = await global.utils.getStreamFromURL(imageUrl);

    const timeTaken = ((Date.now() - startTime) / 1000).toFixed(2);

    api.setMessageReaction("✅", event.messageID, () => {}, true);
    api.unsendMessage(waitMessage.messageID);

    // Step 3: send image stream as attachment
    api.sendMessage(
      {
        body: `Here's your image (Generated in ${timeTaken} seconds)`,
        attachment: imageStream,
      },
      event.threadID,
      event.messageID
    );
  } catch (error) {
    console.error(error);
    api.sendMessage(`Error: ${error.message}`, event.threadID, event.messageID);
  }
};
