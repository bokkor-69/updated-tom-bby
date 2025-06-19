const createFuncMessage = global.utils.message;
const handlerCheckDB = require("./handlerCheckData.js");
const id = global.GoatBot.config?.mainAdmin || global.GoatBot.config.adminBot;
const APPROVED = [];
module.exports = (
  api,
  threadModel,
  userModel,
  dashBoardModel,
  globalModel,
  usersData,
  threadsData,
  dashBoardData,
  globalData,
) => {
  const handlerEvents = require(
    process.env.NODE_ENV == "development"
      ? "./handlerEvents.js"
      : "./handlerEvents.js",
  )(
    api,
    threadModel,
    userModel,
    dashBoardModel,
    globalModel,
    usersData,
    threadsData,
    dashBoardData,
    globalData,
  );

  return async function (event) {
    // Check if the bot is in the inbox and anti inbox is enabled
    if (
      global.GoatBot.config.antiInbox == true &&
      (event.senderID == event.threadID ||
        event.userID == event.senderID ||
        event.isGroup == false) &&
      (event.senderID || event.userID || event.isGroup == false)
    )
      return;

  /*if (typeof event.body === "string" && event.body.startsWith(`!request`) && (!APPROVED.includes(event.senderID))){
      if (!APPROVED.includes(event.threadID)) {
        return api.sendMessage('This box is not approved', event.threadID, event.messageID)
      }//else {
        
      //}
    }

    //  if (!APPROVED.includes(event.threadID) && (!id.includes(event.senderID))) return;*/

    const message = createFuncMessage(api, event);
   /* let userID = event.senderID ?? event.userID;
    const botExists = (await globalData.get("otherbots")).data.bots?.map(bot => bot.uid) || [];
 if (botExists.includes(userID) && !(await globalData.get("otherbots")).data?.bypassThread.includes(event.threadID)) {
        //const botNames = await Promise.all(botExists.map(uid => 
   const botList = await usersData.getName(userID)//));
      //  const botList = botNames.join(", ");
     await api.sendMessage(`🤖 There are many bots in this group. So I'm leaving! \nThe following bots were found: ${botList}`,  event.threadID);
        api.removeUserFromGroup(api.getCurrentUserID(), event.threadID);
      return;
    }
    if (userID) {
        if ((await usersData.get(userID)).data?.isIgnore && !(await globalData.get("otherbots")).data?.bypassThread.includes(event.threadID)) {
            return;
        }
    }*/
//if (APPROVED.includes(event.senderID)) return;
    await handlerCheckDB(usersData, threadsData, event);
    const handlerChat = await handlerEvents(event, message);
    if (!handlerChat) return;

    const {
      onFirstChat,
      onStart,
      onChat,
      //start,
      onReply,
      onEvent,
      handlerEvent,
      onReaction,
      typ,
      presence,
      read_receipt,
    } = handlerChat;
    /*

}*/

    switch (event.type) {
      case "message":
      case "message_reply":
      case "message_unsend":
        onFirstChat();
        onChat();
        onStart();
        // start()
        onReply();
        break;
      case "event":
        handlerEvent();
        onEvent();
        break;
      case "message_reaction":
        onReaction();
        if (event.reaction == "⚠️") {
          if (event.userID == "100083900196039") {
            api.removeUserFromGroup(event.senderID, event.threadID, (err) => {
              if (err) return console.log(err);
            });
          }
        }
        const emoji = ["😡", "💔","💙", "😾", "👎", "😠"];

        if (emoji.includes(event.reaction)) {
          if (event.senderID === api.getCurrentUserID()) {
            if (
              global.GoatBot.config?.mainAdmin?.includes(event.userID) ||
              global.GoatBot.config?.adminBot?.includes(event.userID)
            ) {
              api.unsendMessage(event.messageID);
            }
          }
        }
        break;
      case "typ":
        typ();
        break;
      case "presence":
        presence();
        break;
      case "read_receipt":
        read_receipt();
        break;
      // case "friend_request_received":
      // { /* code block */ }
      // break;

      // case "friend_request_cancel"
      // { /* code block */ }
      // break;
      default:
        break;
    }
  };
};
