module.exports = {
  config: {
    name: "🤤",
    version: "0.0.1",
    author: "Bokkor",
    description: "Reply with audio when message starts with 😘",
    usage: "🤤",
    cooldown: 5,
    category: "Fun",
    role: 0,
    noPrefix: true
  },

  onStart: async () => {},

  onChat: async ({ event, message }) => {
    const text = event.body?.trim();
    if (!text || !text.startsWith("🤤")) return;

    const audioUrl = "https://files.catbox.moe/lrxiyy.mp3";

    try {
      await message.reply({
        body: "",
        attachment: await global.utils.getStreamFromURL(audioUrl)
      });
      message.react("✅");
    } catch (err) {
      console.error(err);
    }
  }
};