const axios = require("axios");

module.exports = {
  config: {
    name: "qz2",
    aliases: ["quiz2"],
    version: "1.1",
    author: "Bokkor",
    countDown: 0,
    role: 0,
    category: "game",
    guide: "{p}qz2\n{p}qz2 bn\n{p}qz2 en",
  },

  onStart: async function ({ api, event, usersData, args }) {
    const input = args.join('').toLowerCase() || "bn";
    const language = input === "en" || input === "english" ? "en" : "bn";
    let timeout = 300;

    try {
      const res = await axios.get(`https://quiz-api-yrgf.onrender.com/api/quiz?language=${language}`);
      const data = res.data;

      const { question, options, correct_answer } = data;
      const { a, b, c, d } = options;

      const namePlayer = await usersData.getName(event.senderID);
      const quizMsg = {
        body: `╭──✦ ${question}\n├‣ 𝗔) ${a}\n├‣ 𝗕) ${b}\n├‣ 𝗖) ${c}\n├‣ 𝗗) ${d}\n╰──────────────────‣\n𝚁𝚎𝚙𝚕𝚢 𝚝𝚘 𝚝𝚑𝚒𝚜 𝚖𝚎𝚜𝚜𝚊𝚐𝚎 𝚠𝚒𝚝𝚑 𝚢𝚘𝚞𝚛 𝚊𝚗𝚜𝚠𝚎𝚛.`,
      };

      api.sendMessage(quizMsg, event.threadID, (err, info) => {
        global.GoatBot.onReply.set(info.messageID, {
          type: "reply",
          commandName: this.config.name,
          author: event.senderID,
          messageID: info.messageID,
          dataGame: data,
          correctAnswer: correct_answer,
          nameUser: namePlayer,
          attempts: 0,
        });

        setTimeout(() => {
          api.unsendMessage(info.messageID);
        }, timeout * 1000);
      }, event.messageID);

    } catch (err) {
      console.error("❌ Error:", err);
      api.sendMessage("Something went wrong while fetching the quiz.", event.threadID, event.messageID);
    }
  },

  onReply: async ({ event, api, Reply, usersData }) => {
    const { correctAnswer, nameUser, author } = Reply;
    if (event.senderID !== author)
      return api.sendMessage("❌ You're not the original player of this quiz.", event.threadID, event.messageID);

    const maxAttempts = 2;
    const userReply = event.body.trim().toLowerCase();

    switch (Reply.type) {
      case "reply": {
        if (Reply.attempts >= maxAttempts) {
          await api.unsendMessage(Reply.messageID);
          return api.sendMessage(
            `❌ | ${nameUser}, you've reached the maximum number of attempts.\n✅ | Correct answer: ${correctAnswer.toUpperCase()}`,
            event.threadID, event.messageID
          );
        }

        if (userReply === correctAnswer.toLowerCase()) {
          await api.unsendMessage(Reply.messageID);
          let rewardCoins = 1000;
          let rewardExp = 121;

          let userData = await usersData.get(author);
          await usersData.set(author, {
            money: userData.money + rewardCoins,
            exp: userData.exp + rewardExp,
            data: userData.data,
          });

          return api.sendMessage(
            `✅ | Correct answer baby.\nYou have earned ${rewardCoins} coins and ${rewardExp} exp.`,
            event.threadID, event.messageID
          );
        } else {
          Reply.attempts += 1;
          global.GoatBot.onReply.set(Reply.messageID, Reply);
          return api.sendMessage(
            `❌ | Wrong Answer. You have ${maxAttempts - Reply.attempts} attempts left.\n🔁 | Try Again!`,
            event.threadID, event.messageID
          );
        }
      }
    }
  }
};
