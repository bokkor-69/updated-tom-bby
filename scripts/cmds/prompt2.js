const axios = require('axios');

const config = {
  name: 'prompt',
  category: 'MEDIA',
  author: 'Nyx'
};

const onStart = async function({ api, event, args }) {
  try {
    if (!event.messageReply || !event.messageReply.attachments || event.messageReply.attachments.length === 0) {
      return api.sendMessage(
        '❌ Please reply to a message with an image attachment.',
        event.threadID,
        event.messageID
      );
    }
    
    const imageUrl = event.messageReply.attachments[0].url;
    const tinyUrlResponse = await axios.get(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(imageUrl)}`);
    const U = tinyUrlResponse.data;
    
    const uploadResponse = await axios.get(`https://remakeai-production.up.railway.app/upload?url=${encodeURIComponent(U)}`);
    const url = uploadResponse.data?.url;

    const style = args.join(' ');
    if (!style) {
      return api.sendMessage(
        '❌ Please provide a style after the command. Example: prompt midjourney',
        event.threadID,
        event.messageID
      );
    }
    
    const promptResponse = await axios.get(`${global.GoatBot.config.nyx}api/prompt?imageUrl=${encodeURIComponent(url)}&style=${encodeURIComponent(style)}`);
    const formattedData =promptResponse.data.data;
    
    api.sendMessage(
      formattedData,
      event.threadID,
      event.messageID
    );
    
  } catch (error) {
api.sendMessage(
      '❌ An error occurred while processing your request.',
      event.threadID,
      event.messageID
    );
  }
};

module.exports = {
  config,
  onStart
};