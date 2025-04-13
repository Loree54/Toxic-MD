const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0t5aVVzM1JLa3BBSEthVm9qRlIyTHpubENaWDZOYURxQmFFV1U4Q0JYMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ1cwcHhhQ0F0NXRPOFhWWklYNGZsQlpWa2hDNmtxMm1BRlAxeGQxSWF3TT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJlUDZ3OGVLeGE4L3B0WXpFaUord0VBcmp6dXMrVTBXejdQcnF0ZmptSkVrPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJYWVVSUTY2TWdUNVpKU1NleWVFYUtLN2NhYzVnWHRkZmt0azA5NGdwY1VFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNBMk9vTzdvbWRLeWNFR1FWZnNnVVZMT2hEYnozRVJIS3NySExvWWRaMXM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjA3dlRIMTNHd2NOUElwUkYzOEVPdzJlc01GTEgvRWVxM0o5b0U2RGE3QkE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUIrcFY2US9iaHd2TkxRMEFhMUF1b2QyRTJTTk5pWmVUY0JwNkt0Z2VIST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS042Q3dablhOcE5Rb3hIcFVQSXRxSzN5TVp6NTdRZjFGVmNyS1lMcUQwZz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImpXbTdmR3NmZ2VMR1QwNTJGTU9ucDJBbnZhRXE5L0xIZzIrZWZsVWlaMVgwUytOck5yYzYwWDk2NCtHVllsZXZ1aVhtdjJGQ2RFUUFKSkltT0lTSGd3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NTYsImFkdlNlY3JldEtleSI6InE5N1poN3dWVFc0MlhwRzYrQXJ5aDc4L3hWcFpBVlBYL3ErOHAwcDRaa1U9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6ImE2R01wMGNnUjFLc2xDN254ZWFTTnciLCJwaG9uZUlkIjoiY2ZlZTQyYzctNjJjNi00YjdhLWI5MmYtN2I5ZjM4MDNhYzAwIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9JRkc5VVI1VkI0eGdzbUkyRE5IVXh1c3I3TT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0Qk8weW9oazQvSkRjZnJZekpWRldvei85MGc9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiODdCNEsySlEiLCJtZSI6eyJpZCI6IjI1NDcxMDY2NTExNjoyOUBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJMb3JlZSJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDT204czJNUXdxWHd2d1lZQlNBQUtBQT0iLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoicWNVdTBNbGJRWWdjdGx6VEI4NXk3ZGM4eVNDRExITnhCVUFDYllnZW9oMD0iLCJhY2NvdW50U2lnbmF0dXJlIjoia2wzaDRpZVpVWW5UL3FDTG5xdXlJM3FUTjZ4T21sVnM4Y2pPZ0JDdGpPNHAxdlo4RVNuSDRjSDdoSXFnUmIxVkZNeEd0VW9oUVo4Y0Z1TFlSRnpOQlE9PSIsImRldmljZVNpZ25hdHVyZSI6IkVVMUlTaGxQQnEyWVJvOUI5cHpzMkpldENrU2UydWhNN0R0bUpDRzNxY1VNc2VyTEhLRnJlR0dJYlJWNUwvSG9DWXk0TjdUbThnUlZ2RjczVFZIaGlnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU0NzEwNjY1MTE2OjI5QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmFuRkx0REpXMEdJSExaYzB3Zk9jdTNYUE1rZ2d5eHpjUVZBQW0ySUhxSWQifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDQ1NzMxMzZ9',
    PREFIXE: process.env.PREFIX || "@",
    OWNER_NAME: process.env.OWNER_NAME || "xh_clinton",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "254710665116",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "no",
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "no",       
    AUTO_LIKE_STATUS: process.env.AUTO_LIKE_STATUS || "no",                     
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'Toxic-MD',
    URL : process.env.BOT_MENU_LINKS || 'https://i.ibb.co/mChCjFPL/ad76194e124ff34e.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
