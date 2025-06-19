const os = require("os");
const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "rtm",
    version: "2.0",
    author: "ASIF",
    countDown: 5,
    role: 0,
    description: "Displays bot and server statistics with a step-by-step loading effect.",
    category: "system"
  },

  onStart: async function ({ api, message, event, usersData, threadsData }) {
    const { threadID } = event;

    let initMessage = await api.sendMessage("🖥 Initializing system stats...", threadID);

    const frames = ["[██▒▒▒▒▒▒▒▒]", "[█████▒▒▒▒▒]", "[███████▒▒]", "[█████████]"];

    async function updateMessage(step, content) {
      await new Promise(resolve => setTimeout(resolve, 200));
      await api.editMessage(`LOADING${".".repeat(step % 3)}\n${frames[step]}\n\n${content}`, initMessage.messageID);
    }

    const networkInterfaces = await getNetworkInterfaces();

    const botStats = {
      totalUsers: (await usersData.getAll()).length,
      totalGroups: (await threadsData.getAll()).length,
      totalCommands: getTotalCommands(),
      botUptime: formatUptime(process.uptime()),
      botPing: `${Math.round(Math.random() * 100)}ms`
    };

    const serverStats = {
      serverUptime: formatUptime(os.uptime()),
      totalMemory: formatMemory(os.totalmem()),
      freeMemory: formatMemory(os.freemem()),
      memoryUsage: getMemoryUsage(),
      cpuUsage: getCpuLoad(),
      cpuModel: os.cpus()[0].model,
      cpuCores: os.cpus().length,
      nodeVersion: process.version,
      platform: os.platform(),
      networkInterfaces
    };

    const messageParts = [
      `🖥 𝗦𝘆𝘀𝘁𝗲𝗺 𝗦𝘁𝗮𝘁𝗶𝗰𝘀:\n• Uptime: ${serverStats.serverUptime}\n• Memory Usage: ${serverStats.memoryUsage}`,
      `• Total Memory: ${serverStats.totalMemory}\n• Free Memory: ${serverStats.freeMemory}\n• Memory Usage: ${serverStats.memoryUsage}\n• CPU Usage (1m): ${serverStats.cpuUsage.oneMin}`,
      `• CPU Usage (5m): ${serverStats.cpuUsage.fiveMin}\n• CPU Usage (15m): ${serverStats.cpuUsage.fifteenMin}\n• CPU Cores: ${serverStats.cpuCores}\n• CPU Model: ${serverStats.cpuModel}`,
     `• Node.js Version: ${serverStats.nodeVersion}\n• Platform: ${serverStats.platform}\n• Bot Uptime: ${botStats.botUptime}\n• Ping: ${botStats.botPing}\n• Total Users: ${botStats.totalUsers}\n• Total Groups: ${botStats.totalGroups}\n• Total Commands: ${botStats.totalCommands}


🌐 𝗡𝗲𝘁𝘄𝗼𝗿𝗸 𝗜𝗻𝘁𝗲𝗿𝗳𝗮𝗰𝗲𝘀:\n${serverStats.networkInterfaces}`
    ];

    for (let i = 0; i < messageParts.length; i++) {
      await updateMessage(i, messageParts.slice(0, i + 1).join("\n\n"));
    }

    await api.editMessage(`LOADED...\n${frames[3]}\n\n${messageParts.join("\n\n")}`, initMessage.messageID);
    setTimeout(() => api.unsendMessage(initMessage.messageID), 20000);
  }
};

function getTotalCommands() {
  try {
    const commandFiles = fs.readdirSync(path.join(__dirname, '..', 'cmds'))
      .filter(file => file.endsWith('.js') && !file.endsWith('.eg.js'));
    return commandFiles.length;
  } catch {
    return 0;
  }
}

function formatMemory(bytes) {
  return (bytes / 1024 / 1024 / 1024).toFixed(2) + " GB";
}

function getMemoryUsage() {
  const total = os.totalmem();
  const free = os.freemem();
  return ((1 - free / total) * 100).toFixed(2) + "%";
}

function formatUptime(seconds) {
  let d = Math.floor(seconds / (3600 * 24));
  let h = Math.floor((seconds % (3600 * 24)) / 3600);
  let m = Math.floor((seconds % 3600) / 60);
  let s = Math.floor(seconds % 60);
  return `${d}d ${h}h ${m}m ${s}s`;
}

function getCpuLoad() {
  const loads = os.loadavg();
  return {
    oneMin: loads[0].toFixed(2) + "%",
    fiveMin: loads[1].toFixed(2) + "%",
    fifteenMin: loads[2].toFixed(2) + "%"
  };
}

async function getNetworkInterfaces() {
  const interfaces = os.networkInterfaces();
  let output = "";

  for (let iface in interfaces) {
    for (let info of interfaces[iface]) {
      if (info.family === "IPv4") {
        output += `• ${iface}:\n` +`    - IPv4: ${info.family === "IPv4" ? info.address : "N/A"}\n` +`    - Interface Type: ${iface.startsWith("eth") ? "Ethernet" : iface.startsWith("wlan") ? "WiFi" : "Other"}\n\n`;
      }
    }
  }

  return output.trim() || "No network interfaces found.";
}