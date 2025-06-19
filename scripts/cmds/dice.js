module.exports = {
  config: {
    name: "dice",
    version: "1.0",
    author: "Bokkor",
    description: "Roll the dice and see who wins!",
    category: "game",
    cooldown: 5
  },
  onStart: async function ({ message }) {
    const userRoll = Math.floor(Math.random() * 6) + 1;
    const botRoll = Math.floor(Math.random() * 6) + 1;

    let result = "";
    if (userRoll > botRoll) result = "✅ You won!";
    else if (userRoll < botRoll) result = "❌ You lost!";
    else result = "😐 It's a draw! Try again.";

    message.reply(`🎲 You rolled: ${userRoll}\n🤖 Bot rolled: ${botRoll}\n\n${result}`);
  }
};
