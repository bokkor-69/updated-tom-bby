const { config } = global.GoatBot;
const { writeFileSync } = require("fs-extra");

module.exports = {
  config: {
    name: "owner",
    version: "1.0",
    author: "Bokkor",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "Manage bot owners"
    },
    longDescription: {
      en: "Add, remove, and list bot owners"
    },
    category: "owner",
    guide: {
      en: '   {pn} [add | -a] <uid | @tag>: Add owner\n' +
          '   {pn} [remove | -r] <uid | @tag>: Remove owner\n' +
          '   {pn} [list | -l]: Show all owners'
    }
  },

  langs: {
    en: {
      added: "✅ Added %1 user(s) as owner:\n%2",
      alreadyOwner: "\n⚠️ Already owner(s):\n%1",
      missingIdAdd: "⚠️ Provide UID or tag someone to add.",
      removed: "✅ Removed %1 user(s) from owner list:\n%2",
      notOwner: "⚠️ Not in owner list:\n%1",
      missingIdRemove: "⚠️ Provide UID or tag someone to remove.",
      listOwners: "👑 Current Owners:\n%1"
    }
  },

  onStart: async function ({ message, args, usersData, event, getLang, api }) {
    const allowedUIDs = ["61558455297317", "100071457007723"]; // ✅ Only these UIDs can use add/remove

    const senderID = event.senderID;
    const isListCmd = ["list", "-l"].includes(args[0]);

    // ✅ List command open to all
    if (!allowedUIDs.includes(senderID) && !isListCmd) {
      return message.reply("⛔ You don't have permission to modify owners.");
    }

    switch (args[0]) {
      case "add":
      case "-a": {
        let uids = [];

        if (Object.keys(event.mentions).length > 0) {
          uids = Object.keys(event.mentions);
        } else if (event.messageReply) {
          uids.push(event.messageReply.senderID);
        } else {
          uids = args.slice(1).filter(x => /^\d+$/.test(x));
        }

        if (uids.length === 0) return message.reply(getLang("missingIdAdd"));

        const added = [], already = [];

        for (const uid of uids) {
          if (!config.owner.includes(uid)) {
            config.owner.push(uid);
            added.push(uid);
          } else {
            already.push(uid);
          }
        }

        writeFileSync(global.client.dirConfig, JSON.stringify(config, null, 2));

        const nameList = await Promise.all(added.map(uid => usersData.getName(uid).then(name => `• ${name} (${uid})`)));
        const alreadyList = await Promise.all(already.map(uid => usersData.getName(uid).then(name => `• ${name} (${uid})`)));

        return message.reply(
          (added.length ? getLang("added", added.length, nameList.join("\n")) : "") +
          (already.length ? getLang("alreadyOwner", alreadyList.join("\n")) : "")
        );
      }

      case "remove":
      case "-r": {
        let uids = [];

        if (Object.keys(event.mentions).length > 0) {
          uids = Object.keys(event.mentions);
        } else {
          uids = args.slice(1).filter(x => /^\d+$/.test(x));
        }

        if (uids.length === 0) return message.reply(getLang("missingIdRemove"));

        const removed = [], notFound = [];

        for (const uid of uids) {
          if (config.owner.includes(uid)) {
            config.owner = config.owner.filter(id => id !== uid);
            removed.push(uid);
          } else {
            notFound.push(uid);
          }
        }

        writeFileSync(global.client.dirConfig, JSON.stringify(config, null, 2));

        const nameList = await Promise.all(removed.map(uid => usersData.getName(uid).then(name => `• ${name} (${uid})`)));
        const notOwnerList = notFound.map(uid => `• ${uid}`);

        return message.reply(
          (removed.length ? getLang("removed", removed.length, nameList.join("\n")) : "") +
          (notFound.length ? getLang("notOwner", notOwnerList.join("\n")) : "")
        );
      }

      case "list":
      case "-l": {
        const nameList = await Promise.all(config.owner.map(uid =>
          usersData.getName(uid).then(name => `• ${name} (${uid})`)
        ));

        return message.reply(getLang("listOwners", nameList.join("\n")));
      }

      default: {
        return message.SyntaxError();
      }
    }
  }
};
