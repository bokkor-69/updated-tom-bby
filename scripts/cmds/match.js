const emojis = ["✨", "🐣", "🖤", "🐥", "👀", "🐰", "", "😫"];
function getRandomPairs() {
  const items = [...emojis, ...emojis];
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}

module.exports = {
  config: {
    name: "match",
    version: "1.0",
    author: "Bokkor",
    description: "A fun memory matching game",
    category: "game",
    cooldown: 10
  },
  onStart: async function ({ message, event }) {
    const grid = getRandomPairs();
    let display = "";
    grid.forEach((item, index) => {
      display += `[${index + 1}] `;
      if ((index + 1) % 4 === 0) display += "\n";
    });

    message.reply(`🧠 Match the pairs by their positions:\n${display}\n\nType two numbers like: 3 7`, (err, info) => {
      global.GoatBot.onReply.set(info.messageID, {
        commandName: "match",
        messageID: info.messageID,
        author: event.senderID,
        grid
      });
    });
  },
  onReply: async function ({ Reply, event, message }) {
    const { author, messageID, grid } = Reply;
    if (event.senderID !== author) return message.reply("This match is not for you!");

    const [first, second] = event.body.split(" ").map(n => parseInt(n) - 1);
    if (isNaN(first) || isNaN(second) || first === second || !grid[first] || !grid[second])
      return message.reply("Invalid input. Please choose two different valid numbers.");

    message.unsend(messageID);
    const isMatch = grid[first] === grid[second];
    const replyMsg = isMatch
      ? `✅ Match found: ${grid[first]} & ${grid[second]}`
      : `❌ No match. You picked: ${grid[first]} & ${grid[second]}`;
    message.reply(replyMsg);
  }
};
