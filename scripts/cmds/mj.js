const axios = require('axios');

let mjImageCache = {};  // ইমেজ ক্যাশ করার জন্য
let mjPromptHistory = {}; // প্রম্পট ইতিহাস রাখার জন্য

module.exports = {
  config: {
    name: "mj",
    aliases: ["midjourney", "mj-gen", "mjimage"],
    version: "3.0",
    author: "Boss Bokkor",
    countDown: 10,
    role: 0,
    description: "Generate MJ images with additional options (Download, U/V Mode, History)",
    category: "𝗜𝗠𝗔𝗚𝗘 𝗚𝗘𝗡𝗘𝗥𝗔𝗧𝗢𝗥",
    premium: false,
    guide: { 
      en: "{pn} prompt | ratio (optional)\nReply with 1/2/3/4 to get a specific image or use 'U1', 'V1' for upscale/variation." 
    }
  },

  onStart: async ({ api, event, args }) => {
    const fullInput = args.join(" ");
    const parts = fullInput.split("|");
    const prompt = parts[0]?.trim();
    const ratio = parts[1]?.trim() || "9:16";

    const validRatios = ["1:1", "16:9", "9:16", "4:3", "3:4", "1:2", "2:1", "3:2", "2:3"];
    if (!prompt) {
      return api.sendMessage("❌ | Prompt koi? Example: mj anime boy flying | 4:3", event.threadID, event.messageID);
    }
    if (!validRatios.includes(ratio)) {
      return api.sendMessage("❌ | Invalid ratio. Valid:\n" + validRatios.join(", "), event.threadID, event.messageID);
    }

    try {
      const wait = await api.sendMessage("🌀 MJ is creating magic for you...", event.threadID);
      const response = await axios.get(`https://api.zetsu.xyz/api/midjourney?prompt=${encodeURIComponent(prompt)}&ratio=${ratio}`);
      const images = response.data.images || [];

      if (images.length === 0) return api.sendMessage("❌ | Image generate korte parlam na...", event.threadID, event.messageID);

      // Store in memory with thread ID
      mjImageCache[event.threadID] = images;
      mjPromptHistory[event.threadID] = { prompt, images };

      const streams = await Promise.all(
        images.map(url => axios.get(url, { responseType: "stream" }).then(res => res.data))
      );

      api.unsendMessage(wait.messageID);
      api.sendMessage({
        body: "✅ | MJ Generated 🖼️\n🖼️ Image 1\n🖼️ Image 2\n🖼️ Image 3\n🖼️ Image 4\n\nReply with 1 / 2 / 3 / 4 to get a specific image or use 'U1', 'V1' to upscale/variation.",
        attachment: streams
      }, event.threadID, (err, info) => {
        // Save messageID to identify reply later if needed
        mjImageCache[event.threadID + "_msg"] = info.messageID;
      });

    } catch (error) {
      console.error(error);
      api.sendMessage("❌ | Error: " + error.message, event.threadID, event.messageID);
    }
  },

  onReply: async ({ api, event }) => {
    const input = event.body.trim();
    const threadID = event.threadID;
    const images = mjImageCache[threadID];

    if (!images || images.length < 4) return;

    if (input.toLowerCase().startsWith("u") || input.toLowerCase().startsWith("v")) {
      // Handle U1 (Upscale) or V1 (Variation)
      const num = parseInt(input[1]);
      if (![1,2,3,4].includes(num)) return;

      const action = input[0].toUpperCase(); // U for Upscale, V for Variation
      try {
        const modifiedImageUrl = `https://api.zetsu.xyz/api/midjourney?action=${action}&image=${images[num - 1]}`;
        const response = await axios.get(modifiedImageUrl);
        const modifiedImage = response.data.images[0]; // Assuming response returns the modified image
        const stream = await axios.get(modifiedImage, { responseType: "stream" }).then(res => res.data);
        
        return api.sendMessage({
          body: "✅ | Image " + num + " has been " + (action === 'U' ? 'upscaled' : 'varied') + ".",
          attachment: stream
        }, threadID, event.messageID);
      } catch (err) {
        return api.sendMessage("❌ | Couldn't process the upscale/variation.", threadID, event.messageID);
      }
    } else {
      // Normal Image Selection
      const num = parseInt(input);
      if (![1, 2, 3, 4].includes(num)) return;

      try {
        const selectedUrl = images[num - 1];
        const stream = await axios.get(selectedUrl, { responseType: "stream" }).then(res => res.data);
        return api.sendMessage({
          body: "✅ | Here's image number " + num + "\n🔗 Download: " + selectedUrl,
          attachment: stream
        }, threadID, event.messageID);
      } catch (err) {
        return api.sendMessage("❌ | Couldn't fetch the selected image.", threadID, event.messageID);
      }
    }
  },

  // Show prompt history with images
  showHistory: ({ api, event }) => {
    const history = mjPromptHistory[event.threadID];
    if (!history) return api.sendMessage("❌ | No history available.", event.threadID, event.messageID);
    
    const { prompt, images } = history;
    const imageLinks = images.map((img, idx) => "Image " + (idx + 1) + ": " + img).join("\n");
    api.sendMessage("Prompt: " + prompt + "\nImages:\n" + imageLinks, event.threadID, event.messageID);
  }
};
