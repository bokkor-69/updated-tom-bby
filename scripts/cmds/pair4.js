const { loadImage, createCanvas } = require("canvas");
const axios = require("axios");
const fs = require("fs-extra");

const FIXED_BACKGROUND_URL = "https://raw.githubusercontent.com/alkama844/res/refs/heads/main/match/testpro1.jpeg";
const avatarRelativeSize = 0.35;
const avatarRelativeY = 0.4;
const avatarRelativeXGap = 0.04;

const cooldowns = new Map();
const COOLDOWN_SECONDS = 30;

module.exports = {
  config: {
    name: "pair4",
    aurthor: "xyz",
    role: 0,
    shortDescription: "Finds a potential match and generates a custom image with a fixed background.",
    longDescription: "This command attempts to pair you with an opposite-gender user (or a specific user) and calculates a compatibility percentage, generating an image on a single, fixed background. Has a cooldown to prevent spam.",
    category: "love",
    guide: "{pn} or {pn} @user"
  },

  onStart: async function ({ api, event, args, usersData, threadsData }) {
    const senderID = event.senderID;
    const threadID = event.threadID;
    const messageID = event.messageID;
    const botID = api.getCurrentUserID();

    const now = Date.now();
    if (cooldowns.has(senderID)) {
      const expirationTime = cooldowns.get(senderID) + COOLDOWN_SECONDS * 1000;
      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return api.sendMessage(
          `Please wait ${timeLeft.toFixed(1)} seconds before using the \`match1\` command again.`,
          threadID,
          messageID
        );
      }
    }

    const pathImg = __dirname + "/tmp/match1_background.png";
    const pathAvt1 = __dirname + "/tmp/match1_Avtmot.png";
    const pathAvt2 = __dirname + "/tmp/match1_Avthai.png";

    await fs.ensureDir(__dirname + "/tmp");

    let senderInfo = await usersData.get(senderID);
    const senderName = senderInfo ? senderInfo.name : "User";
    
    let senderGender = null;
    if (senderInfo && (senderInfo.gender === 'MALE' || senderInfo.gender === 'FEMALE')) {
        senderGender = senderInfo.gender;
    } else {
        try {
            const threadInfo = await api.getThreadInfo(threadID);
            const userInfoInThread = threadInfo.userInfo.find(u => u.id === senderID);
            if (userInfoInThread && (userInfoInThread.gender === 'MALE' || userInfoInThread.gender === 'FEMALE')) {
                senderGender = userInfoInThread.gender;
            }
        } catch (error) {}
    }

    let partnerID;
    let partnerName;

    if (event.mentions && Object.keys(event.mentions).length > 0) {
      partnerID = Object.keys(event.mentions)[0];

      if (partnerID === senderID) {
        return api.sendMessage("You can't match with yourself, silly! 😉", threadID, messageID);
      }
      if (partnerID === botID) {
        return api.sendMessage("I'm flattered, but I can't be your partner! I'm a bot! 🤖", threadID, messageID);
      }

      let mentionedPartnerInfo = await usersData.get(partnerID);
      partnerName = mentionedPartnerInfo ? mentionedPartnerInfo.name : "That user";

    } else {
      const threadInfo = await api.getThreadInfo(threadID);
      const allUsersInThread = threadInfo.userInfo;
      let oppositeGenderPartners = [];

      if (!senderGender) {
        return api.sendMessage(
            "🫣 🦥 I couldn't determine your gender from Facebook. Please ensure your gender is set to 'Male' or 'Female' on your profile to use random opposite-gender matching!",
            threadID,
            messageID
        );
      }

      for (let user of allUsersInThread) {
        if (user.id === senderID || user.id === botID) {
          continue;
        }

        let userGender = user.gender; 
        if (!userGender && usersData.get(user.id)) {
            userGender = usersData.get(user.id).gender;
        }
        
        if (senderGender === "FEMALE" && userGender === "MALE") {
          oppositeGenderPartners.push(user.id);
        } else if (senderGender === "MALE" && userGender === "FEMALE") {
          oppositeGenderPartners.push(user.id);
        }
      }

      if (oppositeGenderPartners.length === 0) {
        return api.sendMessage(
          "🫣 🦥 I couldn't find an opposite-gender partner for you in this group. Try again later!",
          threadID,
          messageID
        );
      }

      partnerID = oppositeGenderPartners[Math.floor(Math.random() * oppositeGenderPartners.length)];
      let randomPartnerInfo = await usersData.get(partnerID);
      partnerName = randomPartnerInfo ? randomPartnerInfo.name : "A Mysterious Partner";
    }

    const rawCompatibilityScore = Math.floor(Math.random() * 11) * 10;
    const compatibilityScore = rawCompatibilityScore.toString();

    const intervalMessages = {
        "0": "Zero percent! The universe has decided you two are on entirely different wavelengths. Maybe try a parallel dimension?",
        "10": "10%! A tiny spark of connection, like two strangers making brief eye contact in a crowded room. Intriguing!",
        "20": "20%! There's a faint hum of compatibility. You might agree on the color of the sky, sometimes.",
        "30": "30%! A noticeable flicker! You could probably share a pizza without arguing about toppings... mostly.",
        "40": "40%! You're getting warmer! Enough common ground to build a small, wobbly bridge. Mind the gaps!",
        "50": "50%! Perfectly balanced! Like two sides of a coin, equally compatible but maybe never quite meeting in the middle.",
        "60": "60%! A solid connection! You might finish each other's sentences, or at least understand what they're trying to say.",
        "70": "70%! High compatibility! You're flowing together like a well-choreographed dance. Keep those steps in sync!",
        "80": "80%! Excellent synergy! You're practically a dynamic duo. Prepare for adventures and mutual understanding!",
        "90": "90%! Nearly flawless! Your connection is almost cosmic. The stars truly align when you two are around!",
        "100": "100%! ♾️ Infinity Love! 😙 Your compatibility is off the charts, boundless, and truly legendary. A match made across all dimensions!"
    };
    
    const compatibilityPhrase = intervalMessages[compatibilityScore] || "An unexpected compatibility result!";
    const selectedBackground = FIXED_BACKGROUND_URL;

    try {
      const [getSenderAvt, getPartnerAvt, getBackground] = await Promise.all([
        axios.get(`https://graph.facebook.com/${senderID}/picture?width=720&height=770&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: "arraybuffer" }),
        axios.get(`https://graph.facebook.com/${partnerID}/picture?width=720&height=770&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: "arraybuffer" }),
        axios.get(selectedBackground, { responseType: "arraybuffer" })
      ]);

      fs.writeFileSync(pathAvt1, Buffer.from(getSenderAvt.data)); 
      fs.writeFileSync(pathAvt2, Buffer.from(getPartnerAvt.data));
      fs.writeFileSync(pathImg, getBackground.data);

      const baseImage = await loadImage(pathImg);
      const baseAvt1 = await loadImage(pathAvt1);
      const baseAvt2 = await loadImage(pathAvt2);

      const canvas = createCanvas(baseImage.width, baseImage.height);
      const ctx = canvas.getContext("2d");

      ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);

      const actualAvatarSize = baseImage.height * avatarRelativeSize;
      const actualAvatarY = (baseImage.height - actualAvatarSize) * avatarRelativeY;
      const actualHorizontalGap = baseImage.width * avatarRelativeXGap;
      const avatar1X = actualHorizontalGap;
      const avatar2X = baseImage.width - actualAvatarSize - actualHorizontalGap;

      ctx.drawImage(baseAvt1, avatar1X, actualAvatarY, actualAvatarSize, actualAvatarSize); 
      ctx.drawImage(baseAvt2, avatar2X, actualAvatarY, actualAvatarSize, actualAvatarSize);

      const imageBuffer = canvas.toBuffer();
      fs.writeFileSync(pathImg, imageBuffer);

      const messageBody = `🎉 **${senderName}** and **${partnerName}** have been matched!\n\n**Compatibility: ${compatibilityScore}%**\n${compatibilityPhrase}`;
      cooldowns.set(senderID, now);

      return api.sendMessage(
        {
          body: messageBody,
          mentions: [
            { tag: senderName, id: senderID },
            { tag: partnerName, id: partnerID },
          ],
          attachment: fs.createReadStream(pathImg),
        },
        threadID,
        () => fs.unlinkSync(pathImg),
        messageID
      );

    } catch (error) {
      return api.sendMessage(
        "Oops! Something went wrong while finding a match or generating the image. Please try again or contact the bot admin! 🚧",
        threadID,
        messageID
      );
    } finally {
      fs.remove(pathAvt1).catch(err => {});
      fs.remove(pathAvt2).catch(err => {});
    }
  },
};