module.exports = {
  config: {
    name: "murgi",
    aliases: ["war"],
    version: "1.0",
    author:"nihan",
    role: 0,
    category: "owner",
    description: "nothing",
    guide: {
      vi: "Not Available",
      en: "{pn} [tag/reply]"
    } 
  },

  onStart: async function ({ api, event, usersData, args }) {
    const fuck = args.join(" ");

    const permission = global.GoatBot.config.DEV;
    if (!permission.includes(event.senderID)) {
      api.sendMessage(fuck, event.threadID, event.messageID);
      return;
    }
    let userId;
    let name;
    userId = Object.keys(event.mentions)[0] || event.messageReply.senderID || fuck;
    const user = await api.getUserInfo(userId);
      name = user[userId].name;
     // name.mentions[userId];
    if(!userId) return api.sendMessage("গুরু খানকিরপুলারে একটা মেনশন দেন-!!🫂", event.threadID);

    var arraytag = []; 
        arraytag.push({id: userId, tag: name});
    var a = function (a) { api.sendMessage(a, event.threadID); }
a({body: " মাদারচোদ........ বোকাচোদা, খানকির ছেলে, " + " " + name, mentions: arraytag});
setTimeout(() => {a({body: " গুদ মারানি, পোড মারানি, রেন্ডির ছেলে  " + " " + name, mentions: arraytag})}, 2000);
setTimeout(() => {a({body: " বিচির বাল গুদের ছাল......... " + " " + name, mentions: arraytag})}, 3000);
setTimeout(() => {a({body: "  বাইনচোদ , তোর বনকের চুদুম মাগির পুত " + " " + name, mentions: arraytag})}, 4000);
setTimeout(() => {a({body: "  খোয়া চোদা ,বাজারের মাগির বাচ্চা তুই  " + " " + name, mentions: arraytag })}, 5000);
setTimeout(() => {a({body: "  কুত্তাচোদা  ্‌,কুত্তা চোদায় জন্ম তোর," + " " + name, mentions: arraytag })}, 6000); 
setTimeout(() => {a({body: "  বেশ্যা মাগী ,পতিতালয়ে জন্ম তোর ," + " " + name, mentions: arraytag })}, 7000);
setTimeout(() => {a({body: "  হাতি চোদা  খাঙ্কির বাচ্চা , " + " " + name, mentions: arraytag })}, 8000);
setTimeout(() => {a({body: " ডাইনোসর চুদা মাল  " + " " + name, mentions: arraytag })}, 9000);
setTimeout(() => {a({body: " চোদা " + " " + name, mentions: arraytag })}, 10000);
setTimeout(() => {a({body: " , শয়তান চোদা ,্তোর জন্মের সময় সয়তানে চুদছিল তোর মাকে " + " " + name, mentions: arraytag })}, 11000);
setTimeout(() => {a({body: "  পেন্টি চোর ,  কনডম চোর," + " " + name, mentions: arraytag })}, 12000);
setTimeout(() => {a({body: " উৎখানকির ডিম,হেডা ভরা কারেন্ট  " + " " + name, mentions: arraytag })}, 13000);
setTimeout(() => {a({body: "  ভাইরাস চোদা বিলুপ্ত প্রানী ডাইনোসর, তোর বাপ " + " " + name, mentions: arraytag })}, 14000);
setTimeout(() => {a({body: " গুদির ছেলে ,  ট্রফিক্যাল চোদা " + " " + name, mentions: arraytag })}, 15000);
setTimeout(() => {a({body: ", চালক চোদা ,, টেপন মাগীর , রেন্ডি মাগীর গুদ............. " + " " + name, mentions: arraytag })}, 16000);
setTimeout(() => {a({body: "ডিজিটাল খানকি চোদন ৪২০ , পাগলা চোদা , " + " " + name, mentions: arraytag })}, 17000);
setTimeout(() => {a({body: " গুনিয়ার গার পাকা বারা চোদা ভরা চোদা , গুদ চোর..." + " " + name, mentions: arraytag })}, 18000);
setTimeout(() => {a({body: "  .এই মাংগের বেটা তোর বউরে চুদি উঠতে চুদি বইতে চুদি দারাই চুদি বসে চুদি রাস্তায় চুদি রাস্তার ধারে চুদি চুদি আর চুদি খানকির পোলা 🙂 " + " " + name, mentions: arraytag })}, 19000);
setTimeout(() => {a({body: "ডেলি রাইতে তর মারে চুদি আমি খালে,, " + " " + name, mentions: arraytag })}, 20000);
setTimeout(() => {a({body: "্তোর  bow re চুদি আমি😴 " + " " + name, mentions: arraytag })}, 21000);
setTimeout(() => {a({body: " ডাইনে চুদি 🖕 -বামে চুদি 🖕 -উপ্রে চুদি 🖕 -নিচে চুদি 🖕 -সাম্নে চুদি 🖕 -পিছে চুদি 🖕 -" + " " + name, mentions: arraytag })}, 22000);
setTimeout(() => {a({body: "  হালাইয়া চুদি 🖕 -উডাইয়া চুদি🖕 - গুরাইয়া চুদি 🖕 -খালে চুদি 🖕 -বিলে চুদি 🖕 -জাইতে চুদি 🖕 -আইতে চুদি🖕 " + " " + name, mentions: arraytag })} , 23000);
setTimeout(() => {a({body: "-দিনে চুদি 🖕 -রাইতে চুদি 🖕 -খারাইয়া চুদি 🖕 -বইয়া চুদি🖕 " + " " + name, mentions: arraytag })}, 24000);
setTimeout(() => {a({body: "  -ঘরে চুদি 🖕 -বাইরে চুদি🖕 -সকালে চুদি🖕 -বিকালে চুদি 🖕  🖕 " + " " + name, mentions: arraytag })}, 25000);
setTimeout(() => {a({body: " বাড়িতে চুদি🖕 -আকাসে চুদি 🖕 -বাতাসে চুদি " + " " + name, mentions: arraytag })}, 26000);
setTimeout(() => {a({body: "  আইনা তর মারে উপ্তা কইরা দিমু কঠিন এক চোদনকলা গাছে কলা নাই, তর মারে চুদলে কোন মজা নাই 😭😭 " + " " + name, mentions: arraytag})} , 27000);
setTimeout(() => {a({body: " কচুর লতি দেখতে সাদা, তর বইনেরে চুদতে অনেক মজা 😆 " + " " + name, mentions: arraytag })}, 28000);
setTimeout(() => {a({body: "  কাঠাল গাছের গোড়া আর আম গাছের ছাল,...🙂 " + " " + name, mentions: arraytag })}, 29000);
setTimeout(() => {a({body: " শালি😳 গাধা😳কুত্তা😒 মাগি😰  " + " " + name, mentions: arraytag })}, 30000);
setTimeout(() => {a({body: "  বকচোদ উল্লুক 😱 ছাগল🤕 পাঁঠা😎শুয়োর😀 ছুঁচো😁 পেঁচা 😂 " + " " + name, mentions: arraytag })}, 31000);
setTimeout(() => {a({body: "  মূর্খ😧বোকা😲 হাঁদারাম 😕মরচনানে 😳 " + " " + name, mentions: arraytag })}, 32000);
setTimeout(() => {a({body: " মূর্খ😧বোকা😲 হাঁদারাম 😕মরচনানে 😳 পচা😃পাজি🤣 " + " " + name, mentions: arraytag })}, 33000);
setTimeout(() => {a({body: "  কানা😖 খোড়া😵 কালা🤓চোর🤡 ডাকাইত🌞কুলি🤢মুটে🌚 মুচি🤔 " + " " + name, mentions: arraytag })}, 34000);
setTimeout(() => {a({body: "  মেথর😢 শালী😠 হতীন😭 জিত্তা মাগি😩হালার পোত😥" + " " + name, mentions: arraytag })}, 35000);
setTimeout(() => {a({body: "  কানা😖 খোড়া😵 কালা🤓চোর🤡 ডাকাইত🌞কুলি🤢মুটে🌚 মুচি🤔 " + " " + name, mentions: arraytag })}, 36000);
setTimeout(() => {a({body: " মেথর😢 শালী😠 হতীন😭 জিত্তা মাগি😩হালার পোত😥 হেল😰 বাস্টার্ড😖 ফ্রড😩" + " " + name, mentions: arraytag })}, 37000);
setTimeout(() => {a({body: "  েল😰 বাস্টার্ড😖 ফ্রড😩ড্যাম😧  কামিনে😤তুই একটা বেশ্যার জাত’" + " " + name, mentions: arraytag })}, 38000);
setTimeout(() => {a({body: "😐আস্ত একটা গাঁধা😌হারামজাদা 😌মাদারচোতটা🌛হারামখোর😥 শুয়ারের বাচ্চা🌛 " + " " + name, mentions: arraytag })}, 39000);
setTimeout(() => {a({body: " ঐ খানকির পুলা😳হালার পো😳কুত্তা😒 মাগি😰 ভাতার😨" + " " + name, mentions: arraytag })}, 40000);
setTimeout(() => {a({body: " িনসে’ হুদায়🤔 চোঁদনা😬বাড়া😠  ছুঁচো😁 পেঁচা 😂মহিষ 😭 ভাম😐" + " " + name, mentions: arraytag })}, 41000);
setTimeout(() => {a({body: " বান্দর🤔ফাল্তু😳 রোগা😕 মূর্খ😧বোকা😲   " + " " + name, mentions: arraytag })}, 42000);
setTimeout(() => {a({body: "  কলেরা 🤗যক্ষ্মা 😐বসন্ত😛মৃগী😠জিনেধরা😩 কানা😖 খোড়া😵 ি🤢মুটে🌚 মুচি🤔 " + " " + name, mentions: arraytag })}, 43000);
setTimeout(() => {a({body: "  মেথর😢 শালী😠 হতীন😭 জিত্তা মাগি😩হালার পোত😥 😱 হেল😰" + " " + name, mentions: arraytag })}, 44000);
setTimeout(() => {a({body: " বাস্টার্ড😖 ফ্রড😩 ড্যাম😧 হারামির বাচ্চা😞 শয়তান😜’😐আস্ত একটা গাঁধা😌" + " " + name, mentions: arraytag })}, 45000);
setTimeout(() => {a({body: " হারামজাদা 😌মাদারচোতটা🌛হারামখোর😥 শুয়ারের বাচ্চা🌛কুত্তার বাচ্চা😱 নটিরপুরি🤓ছাওয়াল😭 " + " " + name, mentions: arraytag })}, 46000);
setTimeout(() => {a({body: "  ঐ খানকির পুলা😳হালার পো🤓নাঙ🤓চুতমারানি🙆‍♂️শালি😳 গাধা😳কুত্তা😒 মাগি😰 ভাতার😨 " + " " + name, mentions: arraytag })}, 47000);
setTimeout(() => {a({body: " চোঁদনা😬বাড়া😠 বকচোদ উল্লুক 😱 ছাগল🤕" + " " + name, mentions: arraytag })}, 48000);
setTimeout(() => {a({body: " পেঁচা 😂মহিষ 😭 ভাম😐 বান্দর🤔ফাল্তু😳 রোগা😕 মূর্খ😧বোকা😲 পাজি🤣পাগল😭 " + " " + name, mentions: arraytag })}, 49000);
setTimeout(() => {a({body: "  কলেরা 🤗যক্ষ্মা 😐বসন্ত😛মৃগী😠জিনেধরা😩 কানা😖 খোড়া😵  " + " " + name, mentions: arraytag })}, 50000);
setTimeout(() => {a({body: " কালা🤓চোর🤡 ডাকাইত🌞কুলি🤢মুটে🌚 মুচি🤔 মেথর😢 শালী😠  12 -ভাতারি  " + " " + name, mentions: arraytag })}, 51000);
setTimeout(() => {a({body: "  ☹️মাদার-ফাকার😱 হেল😰 বাস্টার্ড😖 ফ্রড😩 ড্যাম😧 হারামির বাচ্চা😞 " + " " + name, mentions: arraytag })}, 52000);
setTimeout(() => {a({body: " য়তান😜 কামিনে😤তুই একটা বেশ্যার জাত’😐আস্ত একটা গাঁধা " + " " + name, mentions: arraytag })}, 53000);
setTimeout(() => {a({body: "  শুয়ারের বাচ্চা🌛 ‍♂️ " + " " + name, mentions: arraytag })}, 54000);
setTimeout(() => {a({body: "  তর মারে চুইদ্দা করমু আমি খাল 🖕হাতি চোদে দাড়াইয়া,বানর চোদে ডালে, " + " " + name, mentions: arraytag })}, 55000);
setTimeout(() => {a({body: " বৃষ্টি পরে টাপুর টুপুর তর মারে চুইদ্দা দিমু আমি সোনার নুপুর " + " " + name, mentions: arraytag })}, 56000);
setTimeout(() => {a({body: " কুত্তার বাচ্চা😱 " + " " + name, mentions: arraytag })}, 57000);
setTimeout(() => {a({body: " নটিরপুরি🤓ছাওয়াল😭  " + " " + name, mentions: arraytag })}, 58000);
setTimeout(() => {a({body: " 😌হারামজাদা 😌মাদারচোতটা🌛হারামখোর😥 " + " " + name, mentions: arraytag })}, 59000);
setTimeout(() => {a({body: " হতীন😭 জিত্তা মাগি😩হালার পোত😥 " + " " + name, mentions: arraytag })}, 60000);
setTimeout(() => {a({body: " হাঁদারাম 😕মরচনানে পচা😃 " + " " + name, mentions: arraytag })}, 61000);
setTimeout(() => {a({body: " মিনসে’ হুদায় চোঁদনা😬বাড়া😠 " + " " + name, mentions: arraytag })}, 62000);
setTimeout(() => {a({body: "  কামিনে😤তুই একটা বেশ্যার জাত " + " " + name, mentions: arraytag })}, 63000);
setTimeout(() => {a({body: " কালা🤓চোর🤡 ডাকাইত🌞কুলি " + " " + name, mentions: arraytag})}, 64000);
setTimeout(() => {a({body: " 12 -ভাতারি ☹️মাদার-ফাকার " + " " + name, mentions: arraytag })}, 65000);
setTimeout(() => {a({body: " বকচোদ উল্লুক 😱 ছাগল🤕 পাঁঠা😎শুয়োর😀 " + " " + name, mentions: arraytag })}, 66000);
setTimeout(() => {a({body: " কুত্তার বাচ্চা😱 নটিরপুরি🤓ছাওয়াল😭 " + " " + name, mentions: arraytag })}, 67000);
setTimeout(() => {a({body: "  12 -ভাতারি ☹️মাদার-ফাকার😱 " + " " + name, mentions: arraytag })}, 68000);
setTimeout(() => {a({body: " হারামির বাচ্চা😳শয়তান😜 " + " " + name, mentions: arraytag })}, 69000);
setTimeout(() => {a({body: " পচা😃পাজি🤣পাগল😭 কলেরা 🤗যক্ষ্মা 😐বসন্ত😛মৃগী😠জিনেধরা😩 " + " " + name, mentions: arraytag })}, 70000);
setTimeout(() => {a({body: " 🤓নাঙ🤓চুতমারানি🙆‍♂️শালি😳 গাধা " + " " + name, mentions: arraytag })}, 71000);
setTimeout(() => {a({body: "  হেল😰 বাস্টার্ড😖 ফ্রড😩 " + " " + name, mentions: arraytag })}, 72000);
setTimeout(() => {a({body: " মহিষ 😭 ভাম😐 বান্দর🤔ফাল্তু😳 রোগা😕 " + " " + name, mentions: arraytag })}, 73000);
setTimeout(() => {a({body: " . খা মাগীর গুদ চেটে ফেল দুধ ....... " + " " + name, mentions: arraytag })}, 74000);
setTimeout(() => {a({body: "  চোদোন ৬৪, হোমো চোদা, পাডা........ " + " " + name, mentions: arraytag })}, 75000);
setTimeout(() => {a({body: " তোর মারে -সিতে চুদি 🖕 -গরমে চুদি 🖕 -গাড়িতে চুদি " + " " + name, mentions: arraytag })}, 76000);
setTimeout(() => {a({body: "   এবারে এই ঈদের রাতে তর মারে উপ্তা কইরা কঠিন এক চোদন দিমু আমগো বাড়ীর ছাদে " + " " + name, mentions: arraytag })}, 77000);
setTimeout(() => {a({body: " ভাতার😨 মিনসে’ হুদায়🤔 চোঁদনা😬বাড়া😠 " + " " + name, mentions: arraytag })}, 78000);
setTimeout(() => {a({body: " হাঁদারাম 😕মরচনানে 😳 পচা😃পাজি🤣পাগল😭 " + " " + name, mentions: arraytag })}, 79000);
setTimeout(() => {a({body: "  পাঁঠা😎শুয়োর😀 ছুঁচো😁   " + " " + name, mentions: arraytag })}, 80000);
setTimeout(() => {a({body: " ঐ খানকির পুলা😳হালার পো🤓নাঙ🤓চুতমারানি🙆 " + " " + name, mentions: arraytag })}, 81000);
setTimeout(() => {a({body: " গাঞ্জাখোর,নেশাখোর " + " " + name, mentions: arraytag })}, 82000);
setTimeout(() => {a({body: " 🖕নিয়ে যামু যুন্দর বন  নিয়া আমু হাতির ধন " + " " + name, mentions: arraytag })}, 83000);
setTimeout(() => {a({body: " নাউজুবিল্লাহ  বইলা করলাম  শুরু  আমি নাকি চুদার গুরু গুরু মহা  গুরু তোর মারে চুইদ্দা " + " " + name, mentions: arraytag })}, 84000);
setTimeout(() => {a({body: " ❌Online  করলাম  শুরু কিরে মুরগি  চুতানি মাগির পোলা বুতানি মাগির পোলা লইটা চইটা মাগির পো🤡 " + " " + name, mentions: arraytag })}, 85000);
setTimeout(() => {a({body: " আরে অই চুতমারানি খানকি মাগির পোলা তর মায়ের ভোদায় ডুকামু চাম্পাকলা " + " " + name, mentions: arraytag })}, 86000);
setTimeout(() => {a({body: " হিন্দু চুদে বুদ্ধ চুদে চুদে হুনুমান তর মার ভোদা চুইদ্দা করুম খাল " + " " + name, mentions: arraytag })}, 87000);
setTimeout(() => {a({body: " চুতমারানি মাগির পোলা নাই দেশে হাল চাল তর বইনের ভিত্রে কেনো এত বড় বড় বাল " + " " + name, mentions: arraytag })}, 88000);
setTimeout(() => {a({body: " অই চুদানি মাগির পোলা গিয়েছিলাম ছোট্ট বেলা সেই জেলা নোয়াখালী সেখানে তর কচি বইনের ভোদায় ভইরা দিছিলাম বালি। " + " " + name, mentions: arraytag })}, 89000);
setTimeout(() => {a({body: " অই খানকি মাগির পোলা তর বেশ্যার মায়রে আমি চুদি " + " " + name, mentions: arraytag })}, 90000);
setTimeout(() => {a({body: " এতুল পাতা তেতুল পাতা তেতুল বড় টক রে তর মায়ের ভোদা চুদা আমার অনেক শখ রে " + " " + name, mentions: arraytag })}, 91000);
setTimeout(() => {a({body: " তোর মা  দিবো আমার চুদা খাইয়া কাইন্দা।" + " " + name, mentions: arraytag })}, 92000);
setTimeout(() => {a({body: " তোর বোন   দিবো আমার চুদা খাইয়া কাইন্দা। " + " " + name, mentions: arraytag })}, 93000);
setTimeout(() => {a({body: " তোর মারে চুইদা করবো লন্ড ভন্ড " + " " + name, mentions: arraytag })}, 94000);
setTimeout(() => {a({body: " আবালের নাই লিমিট,তোর মার ভুদায় ভরুম সিমিট।" + " " + name, mentions: arraytag })}, 95000);
setTimeout(() => {a({body: " তোর মারে চুদমু কাপড় খুইলা। " + " " + name, mentions: arraytag })}, 96000);
setTimeout(() => {a({body: " খালে নাকি হইবো মুলা, তোর মারে চুদমু কাপড় খুইলা। " + " " + name, mentions: arraytag })}, 97000);
setTimeout(() => {a({body: " তোর মার ভুদা অনেক ফাটা। " + " " + name, mentions: arraytag })}, 98000);
setTimeout(() => {a({body: " খালে আছে নাকি মাছ তর মায়রে চুদমো আমি অলটাইম ১২ মাস " + " " + name, mentions: arraytag })}, 99000);
setTimeout(() => {a({body: "  কাউয়া দেখতে হয় নাকি কালা  তর মায়রে চুদ্দে লাগেনা বালা " + " " + name, mentions: arraytag })}, 100000);
setTimeout(() => {a({body: " ফেনডালে আছে নাকি বাশ তর মায়রে চুদমো তর আব্বুযর কান্দে ফালাইয়া ঠাস ঠাস+++++😂 " + " " + name, mentions: arraytag })}, 101000);
setTimeout(() => {a({body: " চুতমারানি মাগির পোলা তর মায়রে চুদমো আর কত কাল_😂 " + " " + name, mentions: arraytag })}, 102000);
setTimeout(() => {a({body: "  আমার  লাগে না ভালো  তোর বান্দি মাগির মাইরে আমি  চুদি💦 " + " " + name, mentions: arraytag })}, 103000);
setTimeout(() => {a({body: " দিন রাত ২৪ ঘন্টা তোর মায়েরে চুদে তোরে জন্ম দিছিলাম " + " " + name, mentions: arraytag })}, 104000);
setTimeout(() => {a({body: " তুই তো আমার কন্ডম ফাটার কারণেই জন্ম নিছস " + " " + name, mentions: arraytag})}, 105000);
setTimeout(() => {a({body: " তোর পুটকিতে দেখ  সুপার গ্লু লাগাই দিমু মাগির পুত " + " " + name, mentions: arraytag })}, 106000);
setTimeout(() => {a({body: " ্তোর মারে জিগাইস আমি কি জিনিস আমার চোদা কি জিনিস " + " " + name, mentions: arraytag })}, 107000);
setTimeout(() => {a({body: " ্তোর মা এহনো আআর জন্য ভোদা ফাক করে বইসা থাকে " + " " + name, mentions: arraytag })}, 108000);
setTimeout(() => {a({body: " তোর বোনেরের আনিস একসাথে চুদুম " + " " + name, mentions: arraytag })}, 109000);
setTimeout(() => {a({body: " তোর মারে পতিতালয় থেকে এনে চুদছিলাম " + " " + name, mentions: arraytag })}, 110000);
setTimeout(() => {a({body: " তোর মার হেডা অনেক সফট " + " " + name, mentions: arraytag})}, 111000);
setTimeout(() => {a({body: " তোর মার হেডা আর পুটকি আমি ফাকা করে ফেলছি  " + " " + name, mentions: arraytag })}, 112000);
setTimeout(() => {a({body: " কুত্তার বাচ্ছা তর কচি বোন এর পম পম😍.. " + " " + name, mentions: arraytag })}, 113000);
setTimeout(() => {a({body: " খাঙ্কিরপোলা পোলা কথা শুন তর আম্মু রে চুদি গামছা পেচিয়ে " + " " + name, mentions: arraytag })}, 114000);
setTimeout(() => {a({body: "  বস্তিরন্দালাল এর বাচ্ছা বস্তির পোলা " + " " + name, mentions: arraytag })}, 115000);
setTimeout(() => {a({body: " হিজলা মাগির পোলা  ✋ " + " " + name, mentions: arraytag })}, 116000);
setTimeout(() => {a({body: " DNA টেস্ট করিয়ে দেখ আমার চুদায় তোর জন্ম মাদাররচোদ😍..  " + " " + name, mentions: arraytag })}, 117000);
setTimeout(() => {a({body: " খাংকিরবাচ্চা~" + " " + name, mentions: arraytag })}, 118000);
setTimeout(() => {a({body: " ~ আমার ফাটা কন্ডমের ফসল। জা ভাগ🤖 " + " " + name, mentions: arraytag })}, 119000);
setTimeout(() => {a({body: " ~ চুদা কি আরো খাবি মাগির পোল  " + " " + name, mentions: arraytag })}, 120000);
setTimeout(() => {a({body: " 🤖 হাই মাদারচোদ তর তর ব্যাশা জাতের আম্মু টা রে আদর করে করে চুদি " + " " + name, mentions: arraytag})}, 121000);
setTimeout(() => {a({body: "তর বোন ভোদা ছিল্লা লবণ লাগায় দিমু।  " + " " + name, mentions: arraytag })}, 122000);
setTimeout(() => {a({body: " হিজলা মাগির পোলা হাতির ল্যাওড়া দিয়া তর মায়েরে চুদুম।  ✋ " + " " + name, mentions: arraytag })}, 123000);
setTimeout(() => {a({body: "  বাতিজা শুন তর আম্মু রে চুদলে রাগ করবি না তো " + " " + name, mentions: arraytag })}, 124000);
setTimeout(() => {a({body: "  আচ্ছা জা রাগ করিস না তর আম্মুর কালা ভুদায় আর চুদলাম না তো বোন এর জামা টা খুলে দে  ✋ " + " " + name, mentions: arraytag })}, 125000);
setTimeout(() => {a({body: " হিজলা মাগির পোলা বালি দিয়া চুদমু তরে খাঙ্কি মাগী!তর মাকে।  ✋ " + " " + name, mentions: arraytag })}, 126000);
setTimeout(() => {a({body: " তর আম্মুর উপ্তা কইরা চুদা দিমু।।  " + " " + name, mentions: arraytag })}, 127000);
setTimeout(() => {a({body: "তর আম্মুর হোগা দিয়া ট্রেন ভইরা দিমু।।   " + " " + name, mentions: arraytag })}, 128000);
setTimeout(() => {a({body: "অনলাইনে গালি বাজ হয়ে গেছত মাগির পোলা এমন চুদা দিমু লাইফ টাইম মনে রাখভি তানিম তর বাপ মাগির ছেলে 😘  " + " " + name, mentions: arraytag })}, 129000);
setTimeout(() => {a({body: " কান্দে ফালাইয়া তর মায়েরে চুদি💉। " + " " + name, mentions: arraytag })}, 130000);
setTimeout(() => {a({body: " কুত্তার পুকটি চাটামু💉। " + " " + name, mentions: arraytag })}, 131000);
setTimeout(() => {a({body: " উফফফ খাদ্দামা মাগির পোলা তর আম্মুর কালা ভুদায় আমার মাল আউট তর কচি বোন রে উপ্তা করে এবার চুদবো  💉।  " + " " + name, mentions: arraytag })}, 132000);
setTimeout(() => {a({body: " বান্দি মাগির পোলা তর আম্মু রে চুদি তর দুলা ভাই এর কান্দে ফেলে  🤝  " + " " + name, mentions: arraytag })}, 133000);
setTimeout(() => {a({body: "তোর মুখে হাইগ্যা দিমু। ভুস্কি মাগির পোলা 🤣   " + " " + name, mentions: arraytag })}, 134000);
setTimeout(() => {a({body: " তোর মুখে হাইগ্যা দিমু। 🤣 " + " " + name, mentions: arraytag })}, 135000);
setTimeout(() => {a({body: " বান্দির পোলা তর কচি বোনের ভুদা ফাক কর থুতু দিয়ে ভুদায় দন ডুকামু 🤟  " + " " + name, mentions: arraytag })}, 136000);
setTimeout(() => {a({body: "টুকাই মাগির পোলা মোবাইল ভাইব্রেশন কইরা তুর কচি বোন এর পুকটিতে ভরবো।🤟   " + " " + name, mentions: arraytag })}, 137000);
setTimeout(() => {a({body: " টুকাই মাগির পোলা তর মার ভোদায় পাব্লিক টয়লেট।🤟  " + " " + name, mentions: arraytag })}, 138000);
setTimeout(() => {a({body: " বস্তির ছেলে তর মায়ের ভুদাতে পোকা।  " + " " + name, mentions: arraytag })}, 139000);  
setTimeout(() => {a({body: "   তর আম্মু রে আচার এর লোভ দেখি চুদি মাগির পোলা🤬 " + " " + name, mentions: arraytag })}, 140000);
setTimeout(() => {a({body: "বস্তির ছেলে তোর বইনরে মুসলমানি দিমু।  " + " " + name, mentions: arraytag })}, 141000);
setTimeout(() => {a({body: "তোর বাপে তোর নানা। 🤬   " + " " + name, mentions: arraytag })}, 142000);
setTimeout(() => {a({body: " জং ধরা লোহা দিয়া পাকিস্তানের মানচিত্র বানাই্য়া তোদের পিছন দিয়া ঢুকামু।🤬  " + " " + name, mentions: arraytag })}, 143000);
setTimeout(() => {a({body: " থেকেও তর মাইরে চু***দি 🤬   " + " " + name, mentions: arraytag })}, 144000);
setTimeout(() => {a({body: " খান্কি মাগির পোলা তর মায়ের ভোদা শিরিষ কাগজ দিয়া ঘইষা দিমু। " + " " + name, mentions: arraytag })}, 145000);
setTimeout(() => {a({body: " খান্কি মাগির পোলা " + " " + name, mentions: arraytag })}, 146000);
setTimeout(() => {a({body: "  কুত্তার এর জারজ পোলা মাগির পোলা  💔!  " + " " + name, mentions: arraytag })}, 147000);
setTimeout(() => {a({body: " তর মায়ের ভোদা বোম্বাই মরিচ দিয়া চুদামু।💔! " + " " + name, mentions: arraytag })}, 148000);
setTimeout(() => {a({body: " খাংকির পোলা তর কচি ভুদায় ভুদায় কামর দিমু  💔!  " + " " + name, mentions: arraytag })}, 149000);
setTimeout(() => {a({body: " মাদারচোদ তর আম্মু পম পম খাংকির পো 🐰  " + " " + name, mentions: arraytag })}, 150000);
setTimeout(() => {a({body: " খাঙ্কিরপোলা পোলা তর বোনের  হোগায় ইনপুট, তর মায়ের ভোদায় আউটপুট।🐰  " + " " + name, mentions: arraytag })}, 152000);
setTimeout(() => {a({body: " খাংকির পোলা তর কচি বোন রে চুদি 😍..  " + " " + name, mentions: arraytag })}, 152000);
setTimeout(() => {a({body: " কুত্তার বাচ্ছা তর বৌন ভোদায় মাগুর মাছ চাষ করুম।😍.. " + " " + name, mentions: arraytag })}, 153000);
setTimeout(() => {a({body: " শুয়োরের বাচ্চা " + " " + name, mentions: arraytag })}, 154000);
setTimeout(() => {a({body: " খাংকির পোলা তর মারে চুদি 🥰।  " + " " + name, mentions: arraytag })}, 155000);
setTimeout(() => {a({body: " মাগির ছেলে,  " + " " + name, mentions: arraytag })}, 156000);
setTimeout(() => {a({body: " শয়তান চুদা মাগি " + " " + name, mentions: arraytag })}, 157000);
setTimeout(() => {a({body: " অসভ্য চুদা " + " " + name, mentions: arraytag })}, 158000);
setTimeout(() => {a({body: " ফাজিল চুদা  " + " " + name, mentions: arraytag })}, 159000);
setTimeout(() => {a({body: " নোংরা পোলাপান " + " " + name, mentions: arraytag })}, 160000);
setTimeout(() => {a({body: "  ইতর অভদ্র," + " " + name, mentions: arraytag })}, 161000);
setTimeout(() => {a({body: " বেয়াদপ বেঈমান,  " + " " + name, mentions: arraytag })}, 162000);
setTimeout(() => {a({body: " মুহিত মুফিকার আপেল, " + " " + name, mentions: arraytag })}, 163000);
setTimeout(() => {a({body: " কুওা ঘাঘু চাংগা " + " " + name, mentions: arraytag })}, 164000);
setTimeout(() => {a({body: " মাংগী কিপটা ফকির " + " " + name, mentions: arraytag })}, 165000);
setTimeout(() => {a({body: " দুষ্ট বুদাই মিছকা শয়তান আকাশের লালা  শালা পুটকি চুদি " + " " + name, mentions: arraytag })}, 166000);
setTimeout(() => {a({body: " মদন হাবলা  বদমাইশ লম্পট,  " + " " + name, mentions: arraytag })}, 167000);
setTimeout(() => {a({body: " পাগলার বাচ্চা,  " + " " + name, mentions: arraytag })}, 168000);
setTimeout(() => {a({body: " ঠিক টিকির ডিম  মুরগির বাচ্চা  মুরগির পুৎ " + " " + name, mentions: arraytag })}, 169000);
setTimeout(() => {a({body: " হালার পুৎ হালা  শালার বাচ্চা, " + " " + name, mentions: arraytag })}, 170000);
setTimeout(() => {a({body: " ননসেন্স ইডিয়ট স্টুপিড  বাসটার্ড, " + " " + name, mentions: arraytag })}, 171000);
setTimeout(() => {a({body: " ফাকার শুয়োর ......শুয়োরেরবাচ্চা, " + " " + name, mentions: arraytag })}, 172000);
setTimeout(() => {a({body: "হারামজাদ হারামি,  " + " " + name, mentions: arraytag })}, 173000);
setTimeout(() => {a({body: " কালপেট লাটু লাটাই, " + " " + name, mentions: arraytag })}, 174000);
setTimeout(() => {a({body: " মোগা,হাঁদা,হাঁদারাম, হাওয়া,হাওয়ার পো, " + " " + name, mentions: arraytag })}, 175000);
setTimeout(() => {a({body: " পাগলাবাই,পামুস,  " + " " + name, mentions: arraytag })}, 176000);
setTimeout(() => {a({body: " তুমুস হামুস মামুস  চুদমারানি " + " " + name, mentions: arraytag })}, 177000);
setTimeout(() => {a({body: "চোদনা চোদনখোর চোদন খাইয়ে,  " + " " + name, mentions: arraytag })}, 178000);
setTimeout(() => {a({body: "হারামখোর  মাগি  জাতির পুৎ,  " + " " + name, mentions: arraytag })}, 179000);
setTimeout(() => {a({body: "  তোর মায়রে বাল, " + " " + name, mentions: arraytag })}, 180000);
setTimeout(() => {a({body: " বালের বাচ্চা পোদমারানি, " + " " + name, mentions: arraytag })}, 181000);
setTimeout(() => {a({body: " পোদখোর জাওরা জাওরার পো, " + " " + name, mentions: arraytag })}, 182000);
setTimeout(() => {a({body: "খানকি খানকি মাগি,   " + " " + name, mentions: arraytag })}, 183000);
setTimeout(() => {a({body: "বেশ্যার বাচ্চা বেশ্যা,  " + " " + name, mentions: arraytag })}, 184000);
setTimeout(() => {a({body: " নটি মটর পো,  " + " " + name, mentions: arraytag })}, 185000);
setTimeout(() => {a({body: "মান্দার পো,   " + " " + name, mentions: arraytag })}, 186000);
setTimeout(() => {a({body: " হুগার পো বান্দি বান্দি পো,  " + " " + name, mentions: arraytag })}, 187000);
setTimeout(() => {a({body: "চুদি চুদিরভাই,   " + " " + name, mentions: arraytag })}, 188000);
setTimeout(() => {a({body: " মাদারচোদ  ফাদারচোদ, " + " " + name, mentions: arraytag })}, 189000);
setTimeout(() => {a({body: "চুদানিরপো  " + " " + name, mentions: arraytag })}, 190000);
    }
  };
