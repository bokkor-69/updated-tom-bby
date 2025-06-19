const axios = require("axios");

module.exports = {
  config: {
    name: "cyble",
    version: "1.2",
    author: "Nyx",
    category: "GEN",
    usePrefix: true,
    role: 0,
    shortDescription: "Generate AI images with style options",
    guide: {
      en:
        "{pn} [prompt] | [style]\n" +
        "Example: {pn} dragon knight | fantasy\n" +
        "Use {pn} -s to view available styles."
    }
  },

  onStart: async ({ args, message }) => {
    const input = args.join(" ").trim();

    // যদি ব্যবহারকারী '-s' টাইপ করে, তাহলে স্টাইলের তালিকা দেখাও
    if (input.toLowerCase() === "-s") {
      const styles = [
        "neon",
        "fantasy",
        "dark",
        "cyberpunk",
        "realistic",
        "steampunk",
        "vaporwave",
        "minimal",
        "anime",
        "sci-fi",
        "surreal",
        "abstract",
        "noir",
        "pixel art",
        "watercolor",
        "oil painting",
        "sketch",
        "cartoon",
        "photorealistic",
        "low poly"
      ];
      return message.reply(`🎨 Available Styles:\n${styles.map(s => `• ${s}`).join("\n")}`);
    }

    if (!input) {
      return message.reply("❌ Please provide a prompt.");
    }

    const parts = input.split("|").map(p => p.trim());
    const prompt = parts[0];
    const style = parts[1] || "realistic";

    const validStyles = [
      "neon",
      "fantasy",
      "dark",
      "cyberpunk",
      "realistic",
      "steampunk",
      "vaporwave",
      "minimal",
      "anime",
      "sci-fi",
      "surreal",
      "abstract",
      "noir",
      "pixel art",
      "watercolor",
      "oil painting",
      "sketch",
      "cartoon",
      "photorealistic",
      "low poly"
    ];

    const selectedStyle = validStyles.includes(style.toLowerCase()) ? style : "realistic";

    try {
      const loadingMsg = await message.reply(`⏳ Generating image with style: ${selectedStyle}...`);

      const url = `https://www.noobz-api.rf.gd/api/flux-cablyai?prompt=${encodeURIComponent(prompt)}&style=${encodeURIComponent(selectedStyle)}`;
      const imgRes = await axios.get(url, { responseType: "stream" });

      await message.reply({
        body: `🖼️ Prompt: "${prompt}"\n💡 Style: ${selectedStyle}`,
        attachment: imgRes.data,
      });

      message.unsend(loadingMsg.messageID);
    } catch (error) {
      console.error(error);
      message.reply("❌ Failed to generate image.\nError: " + error.message);
    }
  }
};
