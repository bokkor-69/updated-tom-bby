const https = require("https");

module.exports = {
  config: {
    name: "info",
    version: 2.0,
    author: "Bokkor",
    usePrefix: false,
    longDescription: "info about bot and owner",
    category: "tools",
    guide: {
      en: "{p}{n}",
    },
  },

  onStart: async function ({ api, event, args, message, usersData }) {
    const imgURL = "https://i.ibb.co/9kY6VLg0/image.jpg";

    // Custom stream function using only https
    const getStreamFromURL = (url) => {
      return new Promise((resolve, reject) => {
        https.get(url, (res) => {
          if (res.statusCode !== 200) return reject(new Error("Failed to get image"));
          resolve(res);
        }).on("error", reject);
      });
    };

    const attachment = await getStreamFromURL(imgURL);

    const id = event.senderID;
    const userData = await usersData.get(id);
    const name = userData.name;
    const ment = [{ id: id, tag: name }];

    message.reply({
      body: `🍒𝐎𝐰𝐧𝐞𝐫 𝐢𝐧𝐟𝐨𝐫𝐦𝐚𝐭𝐢𝐨𝐧🌸\n\n\ - 🙋‍♂️𝘕𝘢𝘮𝘦: 𝘉𝘰𝘬𝘬𝘰𝘳\n\n - 🌸𝘈𝘨𝘦 : 17+\n\n - 🌸 𝘊𝘭𝘢𝘴𝘴: ssc 2025\n\n - 🌸 𝘍𝘳𝘰𝘮: 𝘒𝘩𝘶𝘭𝘯𝘢 , 𝘔𝘦𝘩𝘦𝘳𝘱𝘶𝘳\n\n - 🌸 𝘙𝘦𝘭𝘢𝘵𝘪𝘰𝘯𝘚𝘩𝘪𝘱: 𝘔𝘢𝘳𝘳𝘪𝘦𝘥\n\n - 🌸 𝘗𝘳𝘰𝘧𝘪𝘭𝘦: https://www.facebook.com/ewr.bokkor\n\n - 🌸 𝐇𝐨𝐛𝐛𝐢𝐞𝐬: ✨𝗥𝗲𝗹𝗶𝗴𝗶𝗼𝘂𝘀 𝗱𝗶𝘀𝗰𝘂𝘀𝘀𝗶𝗼𝗻𝘀✨ 𝗪𝗮𝘁𝗰𝗵𝗶𝗻𝗴 𝗽𝗶𝗰𝘁𝘂𝗿𝗲𝘀✨ 𝗥𝗲𝗮𝗱𝗶𝗻𝗴 𝗯𝗼𝗼𝗸𝘀✨ 𝗚𝗼𝗶𝗻𝗴 𝗳𝗼𝗿 𝗹𝗮𝘁𝗲 𝗻𝗶𝗴𝗵𝘁 𝘄𝗮𝗹𝗸𝘀✨ 𝗛𝗮𝗻𝗴𝗶𝗻𝗴 𝗼𝘂𝘁 𝘄𝗶𝘁𝗵 𝘁𝗵𝗲 𝗽𝗲𝗿𝘀𝗼𝗻 𝘆𝗼𝘂 𝗹𝗼𝘃𝗲✨ 𝗠𝗮𝗸𝗶𝗻𝗴 𝗵𝗶𝗺 𝗵𝗮𝗽𝗽𝘆.\n\n - 🌸 𝐃𝐞𝐬𝐢𝐫𝐞:  𝗧𝗼 𝗺𝗮𝗸𝗲 𝗮 𝗛𝗮𝗹𝗮𝗹 𝗠𝘂𝘀𝗹𝗶𝗺 𝘃𝗲𝗶𝗹𝗲𝗱 𝗴𝗶𝗿𝗹 𝗮𝘀 𝗮 𝗹𝗶𝗳𝗲 𝗽𝗮𝗿𝘁𝗻𝗲𝗿.❤🙂♣️\n\n\nভালো থাকুক পৃথিবীর সকল মা-বাবা💗☺♣️`,
      mentions: ment,
      attachment: attachment
    });
  }
};
