const TelegramBot = require('telegram-bot-api');
const Web3 = require('web3');
const abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"buyLiqFee","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"buyLotoFee","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"buyMktFee","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"buyTotalFees","type":"uint256"}],"name":"BuyFeesUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"randomNumber","type":"uint256"},{"indexed":false,"internalType":"address","name":"wallet","type":"address"},{"indexed":false,"internalType":"uint256","name":"prizeAmount","type":"uint256"},{"indexed":false,"internalType":"bool","name":"chainlinkGenerated","type":"bool"}],"name":"LotteryWinner","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"extraAmount","type":"uint256"}],"name":"LottoPlusReleased","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"requestId","type":"uint256"},{"indexed":false,"internalType":"uint256[]","name":"randomWords","type":"uint256[]"},{"indexed":false,"internalType":"uint256","name":"payment","type":"uint256"}],"name":"RequestFulfilled","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"requestId","type":"uint256"},{"indexed":false,"internalType":"uint32","name":"numWords","type":"uint32"}],"name":"RequestSent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"sellLiqFee","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"sellLotoFee","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"sellMktFee","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"sellTotalFees","type":"uint256"}],"name":"SellFeesUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"pair","type":"address"},{"indexed":true,"internalType":"bool","name":"value","type":"bool"}],"name":"SetAutomatedMarketMakerPair","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"newAddress","type":"address"},{"indexed":true,"internalType":"address","name":"oldAddress","type":"address"}],"name":"UpdateUniswapV2Router","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"_addedHolderList","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_buy_totalFees","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"_holderIndexes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_liqFeeAddress","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"_listOfHolders","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_lotteryContract","outputs":[{"internalType":"contract Tripple7","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_lotteryExecuteAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_lotteryRound","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_lottoPlusExecuteAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_minAmountToParticipate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_mktFeeAddress","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_sell_totalFees","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_swapState","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"automatedMarketMakerPairs","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"bool","name":"state","type":"bool"}],"name":"excludeFromFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"bool","name":"state","type":"bool"}],"name":"excludeFromLottery","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_requestId","type":"uint256"}],"name":"getRequestStatus","outputs":[{"internalType":"uint256","name":"paid","type":"uint256"},{"internalType":"bool","name":"fulfilled","type":"bool"},{"internalType":"uint256[]","name":"randomWords","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"isExcludedFromFee","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"isExcludedFromLottery","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastRequestId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lotteryParticipantsAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"lotoNumber","type":"uint256"}],"name":"lotteryWinnerInfo","outputs":[{"components":[{"internalType":"uint256","name":"randomNumber","type":"uint256"},{"internalType":"address","name":"wallet","type":"address"},{"internalType":"uint256","name":"prizeAmount","type":"uint256"},{"internalType":"bool","name":"chainlink","type":"bool"}],"internalType":"struct TrippleSeven._winnerInfoStruct","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pickingWinnerStateFix","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_requestId","type":"uint256"},{"internalType":"uint256[]","name":"_randomWords","type":"uint256[]"}],"name":"rawFulfillRandomWords","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"recoverLink","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"requestIds","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"s_requests","outputs":[{"internalType":"uint256","name":"paid","type":"uint256"},{"internalType":"bool","name":"fulfilled","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"pair","type":"address"},{"internalType":"bool","name":"value","type":"bool"}],"name":"setAutomatedMarketMakerPair","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"buyLiqFee","type":"uint256"},{"internalType":"uint256","name":"buyLotoFee","type":"uint256"},{"internalType":"uint256","name":"buyMktFee","type":"uint256"}],"name":"setBuyFees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newAddress","type":"address"}],"name":"setLiqFeeAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newAddress","type":"address"}],"name":"setMktFeeAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"sellLiqFee","type":"uint256"},{"internalType":"uint256","name":"sellLotoFee","type":"uint256"},{"internalType":"uint256","name":"sellMktFee","type":"uint256"}],"name":"setSellFees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"setSwapTokensAtAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"uniswapV2Pair","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"uniswapV2Router","outputs":[{"internalType":"contract IUniswapV2Router02","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address payable","name":"addr","type":"address"}],"name":"updateLotteryContractAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"updateLotteryExecuteAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"updateLotteryMinTokensAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"updateMinLinkBalanceToUseChainlink","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newAddress","type":"address"}],"name":"updateUniswapV2Router","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}];
const contractAddress = '0x7F6228DdA3F9ea6B4beAa24181bf95B2F4a29dB8';

const providerUrl = 'https://arbitrum-mainnet.infura.io/v3/3f689e592e6c45b7bf752c5a97a54ff9';
const provider = new Web3.providers.HttpProvider(providerUrl);
const web3 = new Web3(provider);

const contract = new web3.eth.Contract(abi, contractAddress);

const bot = new TelegramBot('YOUR_TELEGRAM_BOT_TOKEN', { polling: true });
bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const messageText = msg.text;
  
    if (messageText === '/status') {
      const status = await contract.methods._lotteryContract().call();
      bot.sendMessage(chatId, `Current contract: ${status}`);
    }
  });
  
