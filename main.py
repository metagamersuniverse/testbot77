import telegram
import requests
from telegram.ext import ContextTypes, CommandHandler, filters as Filters, MessageHandler, CallbackQueryHandler
from web3 import Web3
from abi import abi

contract_address = '0x7F6228DdA3F9ea6B4beAa24181bf95B2F4a29dB8'
provider_url = 'https://arbitrum-mainnet.infura.io/v3/3f689e592e6c45b7bf752c5a97a54ff9'
provider = Web3.HTTPProvider(provider_url)
web3 = Web3(provider)
contract = web3.eth.contract(address=contract_address, abi=abi)

bot = telegram.Bot(token='6248093145:AAFCHjEdvFYy3Hxz0gGO139ORlkbJBpznZQ')

def handle_message(update, context):
    chat_id = update.message.chat_id
    message_text = update.message.text

    if message_text == '/status':
        status = contract.functions._lotteryRound().call()
        bot.send_message(chat_id=chat_id, text=f"Current status: {status}")
    elif message_text == '/start':
        bot.send_message(chat_id=chat_id, text="Welcome to the lottery bot!")


USER_HANDLER = MessageHandler(
    Filters.ALL, handle_message, block=False
)
bot.add_handler(USER_HANDLER, 5)
bot.run_polling()
