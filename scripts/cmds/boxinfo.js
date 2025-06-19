const fs = require("fs-extra");
const request = require("request");

module.exports = {
  config: {
    name: "boxinfo",
    aliases: ['boxinfo'],
    version: "1.0",
    author: "Null",
    countDown: 5,
    role: 0,
    shortDescription: "See Box info",
    longDescription: "",
    category: "box chat",
    guide: {
      en: "{p} [groupinfo|boxinfo]",
    }
  },

  onStart: async function ({ api, event }) {
    let threadInfo = await api.getThreadInfo(event.threadID);
    let memLength = threadInfo.participantIDs.length;
    let gendernam = [], gendernu = [], nope = [];

    for (let z in threadInfo.userInfo) {
      let gender = threadInfo.userInfo[z].gender;
      let name = threadInfo.userInfo[z].name;
      if (gender === "MALE") gendernam.push(name);
      else if (gender === "FEMALE") gendernu.push(name);
      else nope.push(name);
    }

    let nam = gendernam.length;
    let nu = gendernu.length;
    let adminList = '';
    let adminIDs = threadInfo.adminIDs;
    let adminCount = adminIDs.length;
    let msgCount = threadInfo.messageCount;
    let icon = threadInfo.emoji || "😶";
    let threadName = threadInfo.threadName || "Unnamed Group";
    let id = threadInfo.threadID;
    let approvalMode = threadInfo.approvalMode ? '✅ 𝙊𝙣' : '❌ 𝙊𝙛𝙛';

    for (let i = 0; i < adminIDs.length; i++) {
      const info = await api.getUserInfo(adminIDs[i].id);
      const name = info[adminIDs[i].id].name;
      adminList += `   ➤ ${name}\n`;
    }

    let callback = () => {
      api.sendMessage(
        {
          body:
`╔═══════════🎀 𝑮𝒓𝒐𝒖𝒑 𝑰𝒏𝒇𝒐 🎀═══════════╗

🧸 𝑮𝒓𝒐𝒖𝒑 𝑵𝒂𝒎𝒆: ${threadName}
🆔 𝑮𝒓𝒐𝒖𝒑 𝑰𝑫: ${id}
💠 𝑬𝒎𝒐𝒋𝒊: ${icon}
🔐 𝑨𝒑𝒑𝒓𝒐𝒗𝒂𝒍 𝑴𝒐𝒅𝒆: ${approvalMode}

👥 𝑻𝒐𝒕𝒂𝒍 𝑴𝒆𝒎𝒃𝒆𝒓𝒔: ${memLength}
♂️ 𝑴𝒂𝒍𝒆: ${nam}
♀️ 𝑭𝒆𝒎𝒂𝒍𝒆: ${nu}

🛡️ 𝑨𝒅𝒎𝒊𝒏𝒔 (${adminCount}):
${adminList.trim()}

💬 𝑻𝒐𝒕𝒂𝒍 𝑴𝒆𝒔𝒔𝒂𝒈𝒆𝒔: ${msgCount}

╚════════════════════════════╝`,
          attachment: fs.existsSync(__dirname + '/cache/1.png') ? fs.createReadStream(__dirname + '/cache/1.png') : null
        },
        event.threadID,
        () => {
          if (fs.existsSync(__dirname + '/cache/1.png')) fs.unlinkSync(__dirname + '/cache/1.png');
        },
        event.messageID
      );
    };

    let imageSrc = threadInfo.imageSrc;

    if (!imageSrc) {
      return callback();
    } else {
      return request(encodeURI(imageSrc))
        .pipe(fs.createWriteStream(__dirname + '/cache/1.png'))
        .on('close', () => callback());
    }
  }
};
