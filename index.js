const TelegramBot = require('telegram-bot-api');
const Web3 = require('web3');

const abi = require('./contract-abi.json');
const contractAddress = '0x61A02472F539C316c73D3Da32155A85A26435973';

const providerUrl = 'https://arbitrum-mainnet.infura.io/v3/3f689e592e6c45b7bf752c5a97a54ff9';
const provider = new Web3.providers.HttpProvider(providerUrl);
const web3 = new Web3(provider);

const contract = new web3.eth.Contract(abi, contractAddress);

const bot = new TelegramBot('YOUR_TELEGRAM_BOT_TOKEN', { polling: true });
bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const messageText = msg.text;
  
    if (messageText === '/status') {
      const status = await contract.methods._lotteryRound().call();
      bot.sendMessage(chatId, `Current round: ${status}`);
    }
  });
  