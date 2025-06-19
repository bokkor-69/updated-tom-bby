const axios = require("axios");

module.exports.config = {
  name: "covid",
  version: "1.3.0",
  role: 0,
  author: "Nyx",
  description: "যেকোনো দেশের COVID-19 আপডেট",
  category: "info",
  usages: "[দেশের নাম]",
  cooldowns: 5
};

module.exports.onStart = async ({ api, event, args }) => {
  const country = args.join(" ") || "bd";
  try {
    const res = await axios.get(`https://rest-nyx-apis-production.up.railway.app/api/covidUpdate?country=${encodeURIComponent(country)}`);
    const data = res.data;

    const imgRes = await axios.get(data.flag, { responseType: "stream" });

    const text = `
${data.country} - COVID-19 পরিস্থিতি
──────────────────────────
আপডেটঃ ${data.updated}
মহাদেশঃ ${data.continent}
জনসংখ্যাঃ ${data.population.toLocaleString()}
──────────────────────────
মোট আক্রান্তঃ ${data.cases.toLocaleString()}
আজ আক্রান্তঃ ${data.todayCases}
মোট মৃত্যুঃ ${data.deaths.toLocaleString()}
আজ মৃত্যুঃ ${data.todayDeaths}
সুস্থঃ ${data.recovered}
অ্যাকটিভ কেসঃ ${data.active.toLocaleString()}
ক্রিটিক্যালঃ ${data.critical}
──────────────────────────
মোট টেস্টঃ ${data.tests.toLocaleString()}
প্রতি মিলিয়নে কেসঃ ${data.casesPerMillion}
প্রতি মিলিয়নে মৃত্যুঃ ${data.deathsPerMillion}
প্রতি মিলিয়নে টেস্টঃ ${data.testsPerMillion}
    `;

    api.sendMessage({
      body: text.trim(),
      attachment: imgRes.data
    }, event.threadID, event.messageID);

  } catch (error) {
    api.sendMessage(`❌ "${country}" নামে কোনো দেশের তথ্য খুঁজে পাওয়া যায়নি বা সার্ভারে সমস্যা।`, event.threadID, event.messageID);
  }
};