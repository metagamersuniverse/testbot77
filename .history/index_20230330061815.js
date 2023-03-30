const TelegramBot = require('telegram-bot-api');
const Web3 = require('web3');
import abi from './abi.js';
const contractAddress = '0x7F6228DdA3F9ea6B4beAa24181bf95B2F4a29dB8';

const providerUrl = 'https://arbitrum-mainnet.infura.io/v3/3f689e592e6c45b7bf752c5a97a54ff9';
const provider = new Web3.providers.HttpProvider(providerUrl);
const web3 = new Web3(provider);

const contract = new web3.eth.Contract(abi, contractAddress);

const bot = new TelegramBot('6248093145:AAFi5t1Fkbq78LbgkYRxV_8eMYlskaix1as', { polling: true });
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;

  if (messageText === '/status') {
    const status = await contract.methods._lotteryRound().call();
    bot.sendMessage(chatId, `Current status: ${status}`);
  } else if (messageText === '/start') {
    bot.sendMessage(chatId, 'Welcome to the lottery bot!');
  }
});