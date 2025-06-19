const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports = {
	config: {
		name: "tiktok",
		version: "0.0.4",
		role: 0,
		countDown: 0,
		author: "ArYAN",
		shortDescription: "tiktok search videos",
		hasPrefix: false,
		category: "VIDEO",
		aliases: ["tik"],
		usage: "[Tiktok <search>]",
		cooldown: 5,
	},

	onStart: async function({ api, event, args }) {
		try {
			api.setMessageReaction("⏳", event.messageID, () => {}, true);

			const searchQuery = args.join(" ");
			if (!searchQuery) {
				api.sendMessage("Usage: tiktok <search text>", event.threadID);
				return;
			}

			const res = await axios.get(`https://www.x-noobs-apis.42web.io/tiksearch?search=${encodeURIComponent(searchQuery)}`);
			const videos = res.data.data.videos;

			if (!videos || videos.length === 0) {
				api.sendMessage("No videos found! 🥲", event.threadID);
				return;
			}

			const video = videos[0];
			const videoUrl = video.play;
			const durationSec = video.duration;
			const minutes = Math.floor(durationSec / 60);
			const seconds = durationSec % 60;

			let title = video.title || "No title";
			title = title.replace(/#\S+/g, ""); // Removing any hashtags from the title

			const likes = video.digg_count || 0;
			const shares = video.share_count || 0;

			const message = 
`𝘏𝘦𝘳𝘦 𝘠𝘰𝘶𝘳 𝘝𝘪𝘥𝘦𝘰 𝘉𝘉𝘺 😘`;

			api.setMessageReaction("✅", event.messageID, () => {}, true);

			const filePath = path.join(__dirname, `/cache/tiktok_video.mp4`);
			const writer = fs.createWriteStream(filePath);

			const videoResponse = await axios({
				method: 'get',
				url: videoUrl,
				responseType: 'stream'
			});

			videoResponse.data.pipe(writer);

			writer.on('finish', () => {
				api.sendMessage(
					{ body: `𝑻𝑰𝑲𝑻𝑶𝑲 𝑽𝑰𝑫𝑬𝑶\n\n${message}`, attachment: fs.createReadStream(filePath) },
					event.threadID,
					() => fs.unlinkSync(filePath)
				);
			});
		} catch (error) {
			console.error("Error fetching TikTok video:", error.message || error);
			api.sendMessage("❌ Something went wrong while fetching the video. Please try again!", event.threadID);
		}
	}
};
