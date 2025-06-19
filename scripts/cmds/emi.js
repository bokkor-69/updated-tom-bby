const axios = require('axios');  // axios লাইব্রেরি ইমপোর্ট

module.exports = {
  config: {
    name: "emi",
    aliases: ["em", "d3"],
    version: "1.0",
    author: "Bokkor",
    countDown: 10,
    role: 0,
    description: "Generate image using Dalle-3 unofficial API",
    category: "gen",
    guide: { en: "{pn} your prompt here" }
  },

  onStart: async function ({ api, event, args }) {
    const prompt = args.join(" ").trim();
    
    // Check if '-i' is passed to provide prompt ideas
    if (prompt === "-i") {
      const promptIdeas = [
        "A majestic lion standing on a hill with a golden mane",
        "A futuristic city with tall skyscrapers and neon lights",
        "A beautiful sunset over a calm beach with gentle waves",
        "A serene mountain landscape covered in snow",
        "A vintage car parked under a tree in an old town",
        "A mystical forest with glowing plants and trees",
        "A bustling market street full of colorful stalls",
        "A cosmic view of a galaxy with stars and nebulae",
        "A space explorer in a spaceship flying through asteroid fields",
        "A forest full of cherry blossoms in spring",
        "A sunset over a quiet river with colorful trees",
        "A wild horse galloping through a golden field",
        "A majestic eagle soaring above the mountains",
        "A giant waterfall surrounded by lush greenery",
        "A quaint village nestled in the valley of a mountain range",
        "A deep-sea diver swimming with sharks and colorful fish",
        "A medieval knight standing proudly in a grand castle",
        "A close-up of a dewdrop on a delicate flower petal",
        "A snow-covered forest with a wooden cabin in the distance",
        "A serene Japanese garden with a pond full of koi fish",
        "A city skyline illuminated at night with bright lights",
        "A beautiful autumn forest with red and yellow leaves",
        "A person sitting on a mountain peak looking at the sunset",
        "A vibrant coral reef teeming with sea life",
        "A futuristic robot walking through a neon-lit street",
        "A full moon shining brightly over a dark, calm ocean",
        "A beautiful girl in a flowing dress dancing in the wind",
        "A small boat floating on a tranquil lake at sunrise",
        "A dragon perched on a high mountain with glowing eyes",
        "A white tiger walking through a snowy forest",
        "A spaceship landing on an alien planet with green skies",
        "A flower field stretching to the horizon under a bright sky",
        "A close-up of a dragonfly resting on a branch",
        "A surfer catching a huge wave at dawn",
        "A castle surrounded by fog and mystery",
        "A tropical island with turquoise waters and palm trees",
        "A field of sunflowers under a bright blue sky",
        "A samurai warrior walking through a bamboo forest",
        "A hot air balloon floating above a valley at sunrise",
        "A cozy coffee shop by the street on a rainy day",
        "A futuristic city with flying cars and towering buildings",
        "A bustling street market in an Asian city",
        "A glowing jellyfish drifting in the ocean",
        "A mermaid sitting on a rock by the sea",
        "A wild fox running through a snowy forest",
        "A full moon casting a soft light over a desert",
        "A modern skyscraper with glass windows and clean lines",
        "A cozy cabin with a fireplace surrounded by snow",
        "A rainbow arching across a bright blue sky over a green valley",
        "A giant tree with roots spreading across a forest floor",
        "A couple holding hands while walking through a park in autumn",
        "A tranquil lake surrounded by mountains and fog",
        "A golden sunset behind a silhouette of a person on a cliff",
        "A city street in the rain, with reflections of streetlights"
      ];

      const randomIdea = promptIdeas[Math.floor(Math.random() * promptIdeas.length)];

      api.sendMessage(`💡| Here's a random prompt idea for you: \n\n"${randomIdea}"\n\nUse this with the 'emi' command to generate an image!`, event.threadID, event.messageID);
      return;
    }

    // If no prompt is provided
    if (!prompt) {
      return api.sendMessage("✏️| Prompt koi baby? 😿\nExample: emi A beautiful sunset over a calm beach", event.threadID, event.messageID);
    }

    const wait = await api.sendMessage("⏳| Wait bby...😘", event.threadID);

    try {
      const response = await axios.get(`https://www.noobz-api.rf.gd/api/dalle-3?prompt=${encodeURIComponent(prompt)}`);
      const imageUrl = response.data;

      // Check if the image URL is valid
      if (!imageUrl.startsWith("http")) {
        api.unsendMessage(wait.messageID);
        return api.sendMessage("❌| Sorry baby! Kono chobi generate hoy nai. Try changing the prompt. 🥲", event.threadID, event.messageID);
      }

      const imgData = await axios.get(imageUrl, { responseType: "stream" });

      api.unsendMessage(wait.messageID);
      return api.sendMessage({
        body: `✅| 𝑯𝒆𝒓𝒆'𝒔 𝒚𝒐𝒖𝒓 𝒈𝒆𝒏𝒆𝒓𝒂𝒕𝒆𝒅 𝑷𝒉𝒐𝒕𝒐 𝒃𝒂𝒃𝒚 😘\n🎨 Prompt: "${prompt}"`,
        attachment: imgData.data
      }, event.threadID, event.messageID);

    } catch (err) {
      console.error(err);
      api.unsendMessage(wait.messageID);
      return api.sendMessage(`😖| Error hoye gese baby!\n🧨 ${err.message}`, event.threadID, event.messageID);
    }
  }
};
