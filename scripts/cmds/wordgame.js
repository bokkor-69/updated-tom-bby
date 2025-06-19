const axios = require("axios");

const baseApiUrl = async () => {
  const base = await axios.get("https://raw.githubusercontent.com/mahmudx7/exe/main/baseApiUrl.json");
  return base.data.mahmud;
};

function shuffleWord(word) {
  const shuffled = word.split('').sort(() => 0.5 - Math.random()).join('');
  return shuffled === word ? shuffleWord(word) : shuffled;
}

function formatText(text) {
  return text.toLowerCase().trim();
}

module.exports = {
  config: {
    name: "wordguess",
    aliases: ["wordgame", "wdgame"],
    version: "1.0",
    author: "MahMUD",
    role: 0,
    reward: 100,
    category: "game",
    guide: {
      en: "{pn} Start the word guessing game"
    }
  },

  onStart: async function ({ message, event, commandName }) {
    try {
      const apiUrl = await baseApiUrl(); // dynamic API
      const response = await axios.get(`${apiUrl}/api/word/random`);
      const randomWord = response.data.word;
      const shuffledWord = shuffleWord(randomWord);

      message.reply(`𝐆𝐮𝐞𝐬𝐬 𝐭𝐡𝐞 𝐰𝐨𝐫𝐝: "${shuffledWord}" 🤔`, (err, info) => {
        if (!err) {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: randomWord
          });
        }
      });
    } catch (err) {
      console.error(err);
      message.reply("❌ Failed to fetch a word from the API.");
    }
  },

  onReply: async function ({ message, Reply, event, usersData }) {
    const { author, answer, messageID } = Reply;

    if (event.senderID !== author) {
      return message.reply("❌ Not your turn baka 🐸🦎");
    }

    if (formatText(event.body) === formatText(answer)) {
      const reward = 100;
      await usersData.addMoney(event.senderID, reward);
      message.unsend(messageID);
      message.reply(`✅ | Correct baby.\nYou won ${reward}$`);
    } else {
      message.unsend(messageID);
      message.reply(`❌ | Wrong Answer baby\nThe Correct answer was: ${answer}`);
    }
  }
};
