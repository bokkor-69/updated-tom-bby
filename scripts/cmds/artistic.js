const presets = {
  "default": "Default",
  "none": "None",
  "3d-model": "3D Model",
  "abstract": "Abstract",
  "advertising": "Advertising",
  "alien": "Alien",
  "analog-film": "Analog Film",
  "anime": "Anime",
  "architectural": "Architectural",
  "artnouveau": "Art Nouveau",
  "baroque": "Baroque",
  "black-white-film-portrait": "Black and White Film Portrait",
  "cinematic": "Cinematic",
  "collage": "Collage",
  "comic-book": "Comic Book",
  "craft-clay": "Craft Clay",
  "cubist": "Cubist",
  "dark-portrait-realism": "Dark Portrait",
  "dark-realism": "Dark Realism",
  "digital-art": "Digital Art",
  "disco": "Disco",
  "dreamscape": "Dreamscape",
  "dystopian": "Dystopian",
  "enhance": "Enhance",
  "fairy-tale": "Fairy Tale",
  "fantasy-art": "Fantasy Art",
  "fighting-game": "Fighting Game",
  "filmnoir": "Film Noir",
  "flat-papercut": "Flat Papercut",
  "food-photography": "Food Photography",
  "gothic": "Gothic",
  "graffiti": "Graffiti",
  "grunge": "Grunge",
  "gta": "GTA",
  "hdr": "HDR",
  "horror": "Horror",
  "hyperrealism": "Hyperrealism",
  "impressionist": "Impressionist",
  "industrialfashion": "Industrial fashion",
  "isometric-style": "Isometric Style",
  "light-portrait-realism": "Light Portrait",
  "light-realism": "Light Realism",
  "line-art": "Line Art",
  "long-exposure": "Long Exposure",
  "minecraft": "Minecraft",
  "minimalist": "Minimalist",
  "monochrome": "Monochrome",
  "nautical": "Nautical",
  "neon-noir": "Neon Noir",
  "neon-punk": "Neon Punk",
  "origami": "Origami",
  "paper-mache": "Paper Mache",
  "papercut-collage": "Papercut Collage",
  "papercut-shadow-box": "Papercut Shadow Box",
  "photographic": "Photographic",
  "pixel-art": "Pixel Art",
  "pointillism": "Pointillism",
  "pokémon": "Pokémon",
  "pop-art": "Pop Art",
  "psychedelic": "Psychedelic",
  "real-estate": "Real Estate",
  "renaissance": "Renaissance",
  "retro-arcade": "Retro Arcade",
  "retro-game": "Retro Game",
  "romanticism": "Romanticism",
  "rpg-fantasy-game": "RPG Fantasy Game",
  "silhouette": "Silhouette",
  "space": "Space",
  "stacked-papercut": "Stacked Papercut",
  "stained-glass": "Stained Glass",
  "steampunk": "Steampunk",
  "strategy-game": "Strategy Game",
  "street-fighter": "Street Fighter",
  "super-mario": "Super Mario",
  "surrealist": "Surrealist",
  "techwear-fashion": "Techwear Fashion",
  "texture": "Texture",
  "thick-layered-papercut": "Thick Layered Papercut",
  "tilt-shift": "Tilt-Shift",
  "tribal": "Tribal",
  "typography": "Typography",
  "vintagetravel": "Vintage-style travel",
  "watercolor": "Watercolor"
};

const ratios = {
  "1:1": "1:1",
  "3:4": "3:4",
  "4:3": "4:3",
  "16:9": "16:9",
  "21:9": "21:9",
  "3:2": "3:2",
  "2:3": "2:3",
  "5:4": "5:4",
  "4:5": "4:5",
  "9:16": "9:16",
  "9:21": "9:21"
};

module.exports = {
  config: {
    name: 'artistic',
    category: "GEN",
    author: 'Nyx',
    version: '0.0.3',
    description: 'Text to image'
  },
onStart: async ({ api, event, args }) => {
  const axios = require('axios');
  const { threadID, messageID, body } = event;
  const msg = body.trim();
  const argsFromBody = msg.slice("artistic ".length).trim();

  if (argsFromBody === "style") {
    const styles = Object.entries(presets)
      .map(([k, v]) => `"${k}": "${v}"`)
      .join("\n");
    api.sendMessage(`Available styles:\n${styles}`, threadID, messageID);
    return;
  }

  if (argsFromBody === "ratio") {
    const sizes = Object.entries(ratios)
      .map(([k, v]) => `"${k}": ${v}`)
      .join("\n");
    api.sendMessage(`Available ratios:\n${sizes}`, threadID, messageID);
    return;
  }

  const match = argsFromBody.match(/^(.+?)\s+--\s*(\S+)\s+--\s*(\S+)$/);
  if (!match) {
    api.sendMessage("Usage: artistic <prompt> --<style> --<ratio>", threadID, messageID);
    return;
  }

  const prompt = match[1].trim();
  const presetKey = match[2];
  const ratioKey = match[3];

  if (!presets[presetKey] || !ratios[ratioKey]) {
    api.sendMessage("Invalid style or ratio. Use `artistic style` or `artistic ratio` to see options.", threadID, messageID);
    return;
  }

  const negativePrompt = "ugly, blurry, low quality";
  const seed = Math.floor(Math.random() * 99999);

  try {
    api.setMessageReaction("⌚", messageID, () => {}, true);

    const url = `${global.GoatBot.config.nyx}api/artistic?prompt=${encodeURIComponent(prompt)}&negativePrompt=${encodeURIComponent(negativePrompt)}&preset=${presetKey}&orientation=${ratioKey}&seed=${seed}`;
    const imageResponse = await axios.get(url, { responseType: "stream" });

    api.setMessageReaction("✅", messageID, () => {}, true);

    return api.sendMessage(
      {
        body: `Here is your image for:\nPrompt: ${prompt}\nStyle: ${presets[presetKey]}\nRatio: ${ratios[ratioKey]}`,
        attachment: imageResponse.data
      },
      threadID,
      messageID
    );
  } catch (e) {
    api.setMessageReaction("❌", messageID, () => {}, true);
  }
}
};